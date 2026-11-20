/**
 * Guide-deck kit: builds a 大道大商 how-to deck for an app (16:9 PowerPoint, pptxgenjs) out of phone
 * screenshots with numbered orange markers, numbered step lists, flow cards, tip cards and a note band.
 * Rules and when to use each layout: DESIGN_SYSTEM.md → "App guides". Reference deck:
 * gpgb-dingke/docs/host-guide/build.js (云堂定课 · 主持人指南).
 *
 * The caller brings the libraries (none are dependencies of this package):
 *   npm i pptxgenjs react react-dom sharp react-icons
 *
 *   const pptxgen = require('pptxgenjs')
 *   const { guideDeck } = require('@vibeuncle/gpgb-ui/decks/guide-kit.cjs')
 *   const g = guideDeck(pptxgen, { title: '云堂定课 · 主持人指南', img: __dirname + '/img/' })
 *   g.cover({ kicker, title, body, art: s => { ... } })
 *   const s = g.slide('进堂', '进入云堂', 'lede')
 *   const at = g.phone(s, '01-join.png', g.PHONE_RIGHT)
 *   g.stepsWithMarkers(s, at, [['设置形象', '说明', [97, 250]], ...])
 *   await g.write(__dirname + '/guide.pptx')
 *
 * Coordinates: inches on a 13.333 × 7.5 slide. Marker points are CSS px in the screenshot's viewport
 * (390 × 844 for a phone), the same numbers the in-app guide page uses, so both stay in step.
 */
'use strict'

/** Light and dark token values from styles/tokens.css (hex without #, as pptx wants). */
const T = {
  paper: 'FAF6EE', paperDeep: 'F1EADB', surface: 'FFFFFF', ink: '221F1A', inkSoft: '6B6458', inkFaint: '766E59',
  border: 'E8E0D1', accent: 'FF7F20', accentText: 'A84A0A', accentSoft: 'FFEBDB', danger: 'C62828',
  paperDark: '1C1A16', inkDark: 'F1ECE1', inkSoftDark: 'B5AC9C', borderDark: '3A352C', accentDark: 'FF994D',
}

const W = 13.333, H = 7.5, M = 0.7

function guideDeck(pptxgen, opts = {}) {
  const {
    title = '', author = '大道大商', img = '',
    logoDark = require.resolve('../assets/logo/daoshang-horizontal-mark-dark.png'),
    logoLight = require.resolve('../assets/logo/daoshang-horizontal-mark-light.png'),
    shot = { w: 390, h: 844, pxW: 780, pxH: 1688 },
    applyTheme, // optional: the pptx skill's apply_theme.js, writes THEME's colours into the deck
  } = opts
  const THEME = {
    name: 'GreatPath 大道大商', headFontFace: 'Noto Serif SC', bodyFontFace: 'Noto Sans SC',
    colors: {
      dk1: T.ink, lt1: T.surface, dk2: T.inkSoft, lt2: T.paper,
      accent1: T.accent, accent2: T.accentText, accent3: T.paperDeep, accent4: T.accentSoft, accent5: T.border, accent6: T.danger,
      hlink: T.accentText, folHlink: T.inkSoft,
    },
  }
  const pres = new pptxgen()
  pres.layout = 'LAYOUT_WIDE'
  pres.title = title
  pres.author = author
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace }
  const C = pres.SchemeColor
  let imgDir = img
  const path = f => (f.startsWith('/') ? f : imgDir + f)
  // pptxgenjs mutates option objects, so every shadow is a fresh one
  const lift = (o = 0.06, blur = 8, off = 2) => ({ type: 'outer', color: '000000', opacity: o, blur, offset: off, angle: 90 })

  pres.defineSlideMaster({
    title: 'COVER',
    background: { color: T.paperDark },
    objects: [
      { image: { path: logoLight, x: M, y: 0.6, w: 1.6, h: 0.4 } },
      { placeholder: { options: { name: 'kicker', type: 'body', x: M, y: 2.2, w: 6, h: 0.45, fontSize: 16, color: T.accentDark, bold: true, charSpacing: 4, margin: 0 }, text: '' } },
      { placeholder: { options: { name: 'title', type: 'title', x: M, y: 2.75, w: 6.2, h: 1.4, fontSize: 54, color: T.inkDark, fontFace: THEME.headFontFace, margin: 0, valign: 'top', align: 'left' }, text: '' } },
      { placeholder: { options: { name: 'body', type: 'body', x: M, y: 4.3, w: 5.6, h: 1.2, fontSize: 18, color: T.inkSoftDark, margin: 0, valign: 'top', paraSpaceAfter: 6, align: 'left' }, text: '' } },
    ],
  })
  pres.defineSlideMaster({
    title: 'CONTENT',
    background: { color: T.paper },
    objects: [
      { image: { path: logoDark, x: M, y: 6.98, w: 0.96, h: 0.24 } },
      { text: { text: title, options: { x: 1.8, y: 6.95, w: 4, h: 0.3, fontSize: 10, color: C.text2, margin: 0, valign: 'middle' } } },
      { placeholder: { options: { name: 'title', type: 'title', x: M, y: 0.55, w: 7.6, h: 0.8, fontSize: 36, color: C.text1, fontFace: THEME.headFontFace, margin: 0, valign: 'top', align: 'left' }, text: '' } },
      { placeholder: { options: { name: 'lead', type: 'body', x: M, y: 1.4, w: 8.3, h: 0.5, fontSize: 16, color: C.text2, margin: 0, valign: 'top' }, text: '' } },
    ],
    slideNumber: { x: 12.1, y: 6.95, w: 0.55, h: 0.3, fontSize: 10, color: T.inkSoft, align: 'right' },
  })

  let current = null
  const g = {
    pres, C, T, THEME, W, H, M,
    /** Where a phone shot goes beside a step list: right-hand side, top to bottom of the content area. */
    PHONE_RIGHT: { x: 9.35, y: 0.55, h: 6.25 },

    /** A Lucide icon as a PNG data URI (react-icons/lu names, e.g. 'LuMic'). */
    async icon(name, color = T.accentText, px = 256) {
      const React = require('react')
      const { renderToStaticMarkup } = require('react-dom/server')
      const sharp = require('sharp')
      const lu = require('react-icons/lu')
      if (!lu[name]) throw new Error('no icon ' + name)
      const svg = renderToStaticMarkup(React.createElement(lu[name], { color: '#' + color, size: px }))
      return 'image/png;base64,' + (await sharp(Buffer.from(svg)).png().toBuffer()).toString('base64')
    },

    /**
     * Use the app's own guide screenshots (e.g. public/guide/*.webp, the ones the in-app guide page
     * shows) so the deck and the page never drift apart. PowerPoint can't read webp, so each is
     * written to outDir as a PNG with the same base name; then refer to them as 'join.png' etc.
     */
    async useShots(dir, outDir) {
      const fs = require('fs'), sharp = require('sharp')
      fs.mkdirSync(outDir, { recursive: true })
      for (const f of fs.readdirSync(dir)) {
        if (!/\.(webp|png|jpe?g)$/i.test(f)) continue
        await sharp(dir + '/' + f).png().toFile(outDir + '/' + f.replace(/\.\w+$/, '.png'))
      }
      imgDir = outDir.replace(/\/?$/, '/')
    },

    /** Start a section (PowerPoint sections; the next slides go in it). */
    section(t) { pres.addSection({ title: t }); current = t },

    /** The dark cover. `art(slide)` draws the screenshots on the right (see `heroShots`). */
    cover({ kicker = '', title: t, body = '', art } = {}) {
      if (!current) g.section('封面')
      const s = pres.addSlide({ masterName: 'COVER', sectionTitle: current })
      if (kicker) s.addText(kicker, { placeholder: 'kicker' })
      s.addText(t || title, { placeholder: 'title' })
      if (body) s.addText(body, { placeholder: 'body' })
      if (art) art(s)
      return s
    },

    /** Cover art: a desktop shot with a phone shot overlapping its lower right. */
    heroShots(s, { desktop, phone: ph, desktopAlt = '电脑画面', phoneAlt = '手机画面' }) {
      if (desktop) s.addImage({ path: path(desktop), x: 6.3, y: 1.0, w: 6.4, h: 4.0, altText: desktopAlt, objectName: 'desktop shot', shadow: lift(0.5, 20, 6) })
      if (ph) {
        const sx = 10.6, sy = 2.9, sh = 4.0, sw = sh * shot.pxW / shot.pxH
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: sx - 0.06, y: sy - 0.06, w: sw + 0.12, h: sh + 0.12, rectRadius: 0.22, fill: { color: '000000' }, line: { color: T.borderDark, width: 1 }, shadow: lift(0.5, 20, 6), objectName: 'phone frame' })
        s.addImage({ path: path(ph), x: sx, y: sy, w: sw, h: sh, altText: phoneAlt, objectName: 'phone shot' })
      }
    },

    /** A content slide in the current section (or `section`, which starts it). */
    slide(section, t, lead) {
      if (section && section !== current) g.section(section)
      const s = pres.addSlide({ masterName: 'CONTENT', sectionTitle: current })
      s.addText(t, { placeholder: 'title' })
      if (lead) s.addText(lead, { placeholder: 'lead' })
      return s
    },

    /**
     * A phone screenshot in an ink frame. Returns at(cssX, cssY) → [x, y] inches, to place markers in
     * the screenshot's own CSS-pixel space.
     */
    phone(s, file, { x, y, h }, alt = '截图') {
      const w = h * shot.pxW / shot.pxH
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x - 0.06, y: y - 0.06, w: w + 0.12, h: h + 0.12, rectRadius: 0.32, fill: { color: T.ink }, line: { color: T.ink, width: 0 }, shadow: lift(0.18, 14, 4), objectName: alt + ' frame' })
      s.addImage({ path: path(file), x, y, w, h, altText: alt, objectName: alt })
      const at = (cx, cy) => [x + cx / shot.w * w, y + cy / shot.h * h]
      at.w = w
      return at
    },

    /** Any other screenshot (a cropped strip, a desktop shot) in a surface card; `size` is its pixel size. */
    shotCard(s, file, { x, y, w }, size, alt = '截图') {
      const h = w * size[1] / size[0]
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x - 0.05, y: y - 0.05, w: w + 0.1, h: h + 0.1, rectRadius: 0.2, fill: { color: T.surface }, line: { color: T.border, width: 1 }, shadow: lift(0.12, 12, 3), objectName: alt + ' frame' })
      s.addImage({ path: path(file), x, y, w, h, altText: alt, objectName: alt })
      return (px, py) => [x + px / size[0] * w, y + py / size[1] * h]
    },

    /** A numbered orange marker centred on [x, y] inches (white ring so it reads on any screenshot). */
    dot(s, [cx, cy], n, d = 0.36) {
      s.addShape(pres.shapes.OVAL, { x: cx - d / 2, y: cy - d / 2, w: d, h: d, fill: { color: T.accent }, line: { color: T.surface, width: 2 }, shadow: lift(0.25, 4, 1), objectName: 'marker ' + n })
      s.addText(String(n), { x: cx - d / 2, y: cy - d / 2, w: d, h: d, fontSize: d > 0.32 ? 13 : 11, bold: true, color: C.background1, align: 'center', valign: 'middle', margin: 0, isTextBox: true })
    },

    /** Numbered steps (title + one line) down the left. items: [[title, detail], ...]. */
    steps(s, items, { x = M, y = 2.15, w = 7.4, gap = 0.8, titleSize = 18, bodySize = 14, start = 1 } = {}) {
      items.forEach(([t, b], i) => {
        const yy = y + i * gap, n = i + start
        s.addShape(pres.shapes.OVAL, { x, y: yy + 0.02, w: 0.4, h: 0.4, fill: { color: T.accent }, line: { color: T.accent, width: 0 }, objectName: 'step ' + n })
        s.addText(String(n), { x, y: yy + 0.02, w: 0.4, h: 0.4, fontSize: 14, bold: true, color: C.background1, align: 'center', valign: 'middle', margin: 0, isTextBox: true })
        s.addText([
          { text: t, options: { bold: true, fontSize: titleSize, color: C.text1, breakLine: true } },
          { text: b, options: { fontSize: bodySize, color: C.text2 } },
        ], { x: x + 0.6, y: yy - 0.04, w: w - 0.6, h: gap - 0.05, margin: 0, valign: 'top', paraSpaceAfter: 2, isTextBox: true })
      })
    },

    /**
     * Steps on the left, and a marker with the same number on the screenshot for each step that has a
     * point. items: [[title, detail, [cssX, cssY] | inchPoint | null], ...]; `at` from phone() maps CSS px.
     */
    stepsWithMarkers(s, at, items, stepOpts) {
      g.steps(s, items.map(([t, b]) => [t, b]), stepOpts)
      const start = (stepOpts && stepOpts.start) || 1
      items.forEach(([, , p], i) => { if (p) g.dot(s, p.inches ? p.inches : at(...p), i + start) })
    },

    /**
     * The accent-soft band for a tip or caveat, with an optional icon (accent-text). `disc` instead puts a
     * white icon on a big accent disc: for the one band that is the slide's point (h >= 1).
     */
    note(s, text, { x = M, y = 6.0, w = 7.4, h = 0.6, icon, disc } = {}) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: disc ? 0.14 : 0.12, fill: { color: T.accentSoft }, line: { color: T.accentSoft, width: 0 }, objectName: 'note' })
      let tx = x + 0.25
      if (disc) {
        const d = 0.75, dy = y + (h - d) / 2
        s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: dy, w: d, h: d, fill: { color: T.accent }, line: { color: T.accent, width: 0 } })
        s.addImage({ data: disc, x: x + 0.25 + (d - 0.37) / 2, y: dy + (d - 0.37) / 2, w: 0.37, h: 0.37 })
        tx = x + 1.25
      } else if (icon) {
        s.addImage({ data: icon, x: x + 0.2, y: y + (h - 0.3) / 2, w: 0.3, h: 0.3 })
        tx = x + 0.62
      }
      s.addText(text, { x: tx, y, w: w - (tx - x) - 0.2, h, fontSize: disc ? 15 : 14, color: C.accent2, valign: 'middle', margin: 0, isTextBox: true })
    },

    /**
     * A row of up to four cards joined by arrows: an overview (icon + big faint number) or a flow
     * (numbered disc). items: [{ title, body, icon? }]. Pass `arrow` (an icon data URI) to join them.
     */
    flow(s, items, { y = 2.4, h = 3.0, numbered = false, arrow } = {}) {
      const n = items.length, gap = 0.3, cw = (W - 2 * M - gap * (n - 1)) / n
      items.forEach(({ title: t, body, icon }, i) => {
        const x = M + i * (cw + gap)
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h, rectRadius: 0.16, fill: { color: T.surface }, line: { color: T.border, width: 1 }, shadow: lift(), objectName: 'card ' + t })
        let ty
        if (numbered) {
          s.addShape(pres.shapes.OVAL, { x: x + 0.35, y: y + 0.35, w: 0.5, h: 0.5, fill: { color: T.accent }, line: { color: T.accent, width: 0 } })
          s.addText(String(i + 1), { x: x + 0.35, y: y + 0.35, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: C.background1, align: 'center', valign: 'middle', margin: 0, isTextBox: true })
          ty = y + 1.0
        } else {
          s.addShape(pres.shapes.OVAL, { x: x + 0.35, y: y + 0.4, w: 0.8, h: 0.8, fill: { color: T.accentSoft }, line: { color: T.accentSoft, width: 0 } })
          if (icon) s.addImage({ data: icon, x: x + 0.55, y: y + 0.6, w: 0.4, h: 0.4 })
          s.addText(String(i + 1), { x: x + cw - 0.95, y: y + 0.3, w: 0.65, h: 0.9, fontSize: 44, color: C.accent5, fontFace: THEME.headFontFace, align: 'right', margin: 0, isTextBox: true })
          ty = y + 1.45
        }
        s.addText(t, { x: x + 0.35, y: ty, w: cw - 0.7, h: 0.55, fontSize: numbered ? 22 : 24, bold: true, color: C.text1, fontFace: THEME.headFontFace, margin: 0, isTextBox: true })
        s.addText(body, { x: x + 0.35, y: ty + 0.55, w: cw - 0.7, h: y + h - ty - 0.75, fontSize: numbered ? 14 : 15, color: C.text2, margin: 0, valign: 'top', isTextBox: true })
        if (arrow && i < n - 1) s.addImage({ data: arrow, x: x + cw + 0.04, y: y + h / 2, w: 0.22, h: 0.22 })
      })
    },

    /** Numbered labels in a grid under a screenshot strip (the "anatomy" slide). items: [[title, detail]]. */
    legend(s, items, { y = 5.75, cols = 4, rowH = 0.62 } = {}) {
      const lw = (W - 2 * M) / cols
      items.forEach(([t, b], i) => {
        const x = M + (i % cols) * lw, yy = y + Math.floor(i / cols) * rowH
        s.addShape(pres.shapes.OVAL, { x, y: yy + 0.04, w: 0.3, h: 0.3, fill: { color: T.accent }, line: { color: T.accent, width: 0 } })
        s.addText(String(i + 1), { x, y: yy + 0.04, w: 0.3, h: 0.3, fontSize: 11, bold: true, color: C.background1, align: 'center', valign: 'middle', margin: 0, isTextBox: true })
        s.addText([{ text: t, options: { bold: true, color: C.text1 } }, { text: '  ' + b, options: { color: C.text2 } }], { x: x + 0.42, y: yy, w: lw - 0.5, h: 0.38, fontSize: 14, margin: 0, valign: 'middle', isTextBox: true })
      })
    },

    /** Icon + title + one line, stacked (beside a desktop shot). items: [{ icon, title, body }]. */
    iconList(s, items, { x = 8.85, y = 2.25, w = 3.8, gap = 1.5 } = {}) {
      items.forEach(({ icon, title: t, body }, i) => {
        const yy = y + i * gap
        s.addShape(pres.shapes.OVAL, { x, y: yy, w: 0.6, h: 0.6, fill: { color: T.accentSoft }, line: { color: T.accentSoft, width: 0 } })
        if (icon) s.addImage({ data: icon, x: x + 0.15, y: yy + 0.15, w: 0.3, h: 0.3 })
        s.addText([{ text: t, options: { bold: true, fontSize: 18, color: C.text1, breakLine: true } }, { text: body, options: { fontSize: 14, color: C.text2 } }], { x: x + 0.8, y: yy - 0.05, w: w - 0.8, h: gap - 0.3, margin: 0, valign: 'top', paraSpaceAfter: 3, isTextBox: true })
      })
    },

    /** Tip cards, three across, at most six. items: [{ icon, title, body }]. */
    tips(s, items, { y = 1.6, cols = 3, h = 2.3 } = {}) {
      const gx = 0.265, gy = 0.35, cw = (W - 2 * M - gx * (cols - 1)) / cols
      items.forEach(({ icon, title: t, body }, i) => {
        const x = M + (i % cols) * (cw + gx), yy = y + Math.floor(i / cols) * (h + gy)
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: yy, w: cw, h, rectRadius: 0.14, fill: { color: T.surface }, line: { color: T.border, width: 1 }, shadow: lift(), objectName: 'tip ' + t })
        s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: yy + 0.3, w: 0.6, h: 0.6, fill: { color: T.accentSoft }, line: { color: T.accentSoft, width: 0 } })
        if (icon) s.addImage({ data: icon, x: x + 0.45, y: yy + 0.45, w: 0.3, h: 0.3 })
        s.addText(t, { x: x + 1.1, y: yy + 0.3, w: cw - 1.35, h: 0.6, fontSize: 18, bold: true, color: C.text1, valign: 'middle', margin: 0, isTextBox: true })
        s.addText(body, { x: x + 0.3, y: yy + 1.05, w: cw - 0.6, h: h - 1.45, fontSize: 14, color: C.text2, valign: 'top', margin: 0, isTextBox: true })
      })
    },

    async write(file) {
      await pres.writeFile({ fileName: file })
      if (applyTheme) await applyTheme(file, THEME)
      return file
    },
  }
  return g
}

module.exports = { guideDeck, T }
