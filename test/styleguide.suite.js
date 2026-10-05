// Runs in a parent page with the style guide in #f (same-origin file access). Checks the guide's own behaviour and structure.
const wait = ms => new Promise(r => setTimeout(r, ms))
const R = []
const ok = (n, c) => R.push((c ? 'PASS ' : 'FAIL ') + n)
const f = document.getElementById('f')
f.onload = async () => {
  try {
    const d = f.contentDocument, w = f.contentWindow
    const key = (k, sh) => d.activeElement.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true, shiftKey: !!sh }))
    const wsBtn = d.querySelector('[data-menu] [aria-haspopup]'); wsBtn.focus(); wsBtn.click(); await wait(100)
    const pop = wsBtn.parentElement.querySelector('.ds-popover')
    ok('menu opens', !pop.hidden && wsBtn.getAttribute('aria-expanded') === 'true')
    ok('first item focused', d.activeElement === pop.querySelector('[role^=menuitem]'))
    key('ArrowDown'); ok('arrow down moves', d.activeElement === pop.querySelectorAll('[role^=menuitem]')[1])
    key('End'); ok('end -> last', d.activeElement === [...pop.querySelectorAll('[role^=menuitem]')].pop())
    key('Escape'); await wait(50); ok('esc closes + refocuses trigger', pop.hidden && d.activeElement === wsBtn)

    const sb = d.querySelector('[data-open-sheet=bsheet]'); sb.focus(); sb.click(); await wait(100)
    const sh = d.getElementById('bsheet')
    ok('sheet opens', sh.dataset.open === 'true' && !sh.hasAttribute('inert')); ok('focus inside sheet', sh.contains(d.activeElement))
    const foc = [...sh.querySelectorAll('button,a[href]')]; foc[foc.length - 1].focus(); key('Tab'); ok('tab loops in sheet', d.activeElement === foc[0])
    key('Escape'); await wait(50); ok('esc closes sheet and restores focus', sh.dataset.open === 'false' && sh.hasAttribute('inert') && d.activeElement === sb)

    const cb = d.querySelector('button[data-confirm].ds-btn-danger'); cb.focus(); cb.click(); await wait(100)
    const m = d.querySelector('.ds-modal'); ok('confirm opens with focus inside', !!m && m.contains(d.activeElement))
    const mf = [...m.querySelectorAll('button')]; mf[mf.length - 1].focus(); key('Tab'); ok('modal tab loops', d.activeElement === mf[0])
    key('Escape'); await wait(50); ok('esc closes modal and restores focus', !d.querySelector('.ds-modal') && d.activeElement === cb)

    d.getElementById('step-next').click(); ok('step indicator advances', d.querySelectorAll('.ds-step[data-state=done]').length === 2)
    d.querySelectorAll('[data-lang]')[1].click(); ok('language toggle', d.querySelectorAll('[data-lang]')[1].getAttribute('aria-pressed') === 'true')
    wsBtn.click(); await wait(50); d.body.dispatchEvent(new w.MouseEvent('mousedown', { bubbles: true })); ok('outside click closes menu', pop.hidden)

    // structure: every token in the swatch list resolves to a value in both themes
    for (const theme of ['light', 'dark']) {
      d.documentElement.setAttribute('data-theme', theme)
      const cs = w.getComputedStyle(d.documentElement)
      const names = ['paper', 'paper-deep', 'surface', 'ink', 'ink-soft', 'ink-faint', 'border-soft', 'border-strong', 'accent', 'accent-hover', 'accent-soft', 'accent-text', 'focus', 'on-accent', 'on-danger', 'danger', 'warn', 'success', 'scrim']
      const missing = names.filter(n => !cs.getPropertyValue('--color-' + n).trim())
      ok(theme + ' theme defines all colour tokens' + (missing.length ? ' (missing: ' + missing.join(',') + ')' : ''), missing.length === 0)
    }
    ok('no horizontal overflow at 1100px', d.documentElement.scrollWidth <= d.documentElement.clientWidth)
  } catch (e) { R.push('FAIL error: ' + e.message) }
  document.getElementById('o').textContent = R.join('\n'); document.title = 'done'
}
