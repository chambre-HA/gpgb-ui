// Browser tests: bundles the real React components with esbuild, drives them in headless Chrome, and checks the style guide.
// Needs Chrome (set CHROME=/path if not at the default macOS location). Exits non-zero on any FAIL.
import { build } from 'esbuild'
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const tmp = path.join(root, 'test/.tmp')
mkdirSync(tmp, { recursive: true })
const CHROME = process.env.CHROME || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].find(existsSync)
if (!CHROME) { console.error('Chrome not found. Set CHROME=/path/to/chrome'); process.exit(2) }

function runPage(htmlPath) {
  const sandbox = process.env.CI ? ['--no-sandbox'] : []
  const dom = execFileSync(CHROME, ['--headless=new', '--disable-gpu', ...sandbox, '--allow-file-access-from-files', '--virtual-time-budget=15000', '--dump-dom', pathToFileURL(htmlPath).href], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 })
  const m = dom.match(/<pre id="o">([\s\S]*?)<\/pre>/)
  return (m ? m[1] : '').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').trim()
}

// 1. React components
await build({ entryPoints: [path.join(root, 'test/entry.tsx')], bundle: true, outfile: path.join(tmp, 'bundle.js'), jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'error' })
writeFileSync(path.join(tmp, 'react.html'), `<body><div id="root"></div><pre id="o"></pre><script src="bundle.js"></script><script>${readFileSync(path.join(root, 'test/react.suite.js'), 'utf8')}</script></body>`)

// 2. Style guide
writeFileSync(path.join(tmp, 'styleguide.html'), `<body><iframe id="f" src="${pathToFileURL(path.join(root, 'styleguide/index.html')).href}" style="width:1100px;height:900px"></iframe><pre id="o"></pre><script>${readFileSync(path.join(root, 'test/styleguide.suite.js'), 'utf8')}</script></body>`)

let failed = 0
for (const [name, file] of [['React components', 'react.html'], ['Style guide', 'styleguide.html']]) {
  const out = runPage(path.join(tmp, file))
  const lines = out ? out.split('\n') : ['FAIL no results (page did not finish)']
  const bad = lines.filter(l => !l.startsWith('PASS'))
  failed += bad.length
  console.log(`\n${name}: ${lines.length - bad.length}/${lines.length} passed`)
  for (const l of bad) console.log('  ' + l)
}
console.log(failed ? `\n${failed} failing` : '\nAll passing')
process.exit(failed ? 1 : 0)
