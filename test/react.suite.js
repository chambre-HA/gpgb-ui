// Runs in the page. Drives the real React components. Results go to #o as PASS/FAIL lines.
const wait = ms => new Promise(r => setTimeout(r, ms))
// Polls until cond() is true (up to ms). Focus moves happen in rAF, so fixed sleeps are flaky.
const until = async (cond, ms = 1500) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (cond()) return true; await wait(20) } return cond() }
const R = []
const ok = (n, c) => R.push((c ? 'PASS ' : 'FAIL ') + n)
const key = (k, sh) => document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true, shiftKey: !!sh }))
const $ = s => document.querySelector(s)
const $$ = s => [...document.querySelectorAll(s)]
;(async () => {
  try {
    await wait(200)
    const mb = $('#mbtn'); mb.focus(); mb.click(); await wait(100)
    const menu = $('[role=menu]')
    ok('menu opens', !!menu && mb.getAttribute('aria-expanded') === 'true')
    ok('aria-controls set', mb.getAttribute('aria-controls') === menu.id)
    ok('click-open focuses first item', await until(() => document.activeElement.textContent === 'Rename'))
    key('ArrowDown'); ok('arrow skips disabled -> Delete', await until(() => document.activeElement.textContent === 'Delete'))
    key('ArrowDown'); ok('arrow wraps -> Rename', await until(() => document.activeElement.textContent === 'Rename'))
    key('End'); ok('end -> Delete', await until(() => document.activeElement.textContent === 'Delete'))
    key('Home'); ok('home -> Rename', await until(() => document.activeElement.textContent === 'Rename'))
    key('Escape'); ok('esc closes menu + refocuses trigger', await until(() => !$('[role=menu]') && document.activeElement === mb))

    mb.click(); await wait(50); $$('[role=menuitem]')[2].click(); await wait(80)
    const dlg = $('.ds-modal')
    ok('menu item opens confirm', !!dlg && dlg.textContent.includes('Delete poster'))
    ok('focus inside dialog', await until(() => dlg.contains(document.activeElement)))
    const bs = [...dlg.querySelectorAll('button')]; bs[bs.length - 1].focus(); key('Tab'); ok('dialog tab loops forward', document.activeElement === bs[0])
    bs[0].focus(); key('Tab', true); ok('dialog shift-tab loops back', document.activeElement === bs[bs.length - 1])
    ok('scroll locked', document.body.style.overflow === 'hidden')
    key('Escape'); await wait(80); ok('esc closes dialog', !$('.ds-modal')); ok('scroll unlocked', document.body.style.overflow !== 'hidden')

    const sb = $('#sbtn'); sb.focus(); sb.click(); await wait(80)
    const sheet = $('.ds-sheet-root')
    ok('sheet open and not inert', sheet.dataset.open === 'true' && !sheet.inert)
    ok('focus moves into sheet', await until(() => sheet.contains(document.activeElement)))
    key('Escape')
    ok('esc closes sheet (inert)', await until(() => sheet.dataset.open === 'false' && sheet.inert))
    ok('focus restored to opener', await until(() => document.activeElement === sb))

    const ws = $$('[aria-haspopup=menu]').find(b => (b.getAttribute('aria-label') || '').startsWith('工作区'))
    ws.click(); await wait(50)
    const items = $$('[role=menuitemradio]')
    ok('workspace radios, active checked', items.length === 2 && items[0].getAttribute('aria-checked') === 'true')
    items[1].click(); await wait(80)
    ok('switch callback fires and menu closes', $('#ws').textContent === '2' && !$('[role=menu]'))

    const um = $$('[aria-haspopup=menu]').find(b => (b.getAttribute('aria-label') || '').includes('Ming')); um.click(); await wait(50)
    $$('[role=menuitem]').find(x => x.textContent.includes('退出')).click(); await wait(50)
    ok('user menu sign out fires', document.title === 'signedout')

    $('#pbtn').click(); await wait(50); ok('popover opens', !!$('.ds-popover-body'))
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })); await wait(50)
    ok('popover closes on outside click', !$('.ds-popover-body'))
    ok('tooltip wired via aria-describedby', $('#tbtn').getAttribute('aria-describedby') === $('[role=tooltip]').id)
  } catch (e) { R.push('FAIL error: ' + e.message) }
  document.getElementById('o').textContent = R.join('\n'); document.title = 'done'
})()
