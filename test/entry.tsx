// Test fixture: mounts the real components so the browser suite can drive them.
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Menu, Sheet, ConfirmDialog, Tooltip, Popover, UserMenu, WorkspaceSwitcher } from '../src/index'

function App() {
  const [sheet, setSheet] = useState(false)
  const [conf, setConf] = useState(false)
  const [ws, setWs] = useState('1')
  return (
    <div>
      <Menu label="more" trigger={<button id="mbtn">more</button>}
        items={[{ label: 'Rename', onSelect() {} }, { label: 'Disabled', disabled: true }, { type: 'separator' }, { label: 'Delete', danger: true, onSelect: () => setConf(true) }]} />
      <button id="sbtn" onClick={() => setSheet(true)}>sheet</button>
      <Sheet open={sheet} onClose={() => setSheet(false)} title="S" side="bottom"><button id="s1">one</button><button id="s2">two</button></Sheet>
      <ConfirmDialog open={conf} onCancel={() => setConf(false)} onConfirm={() => setConf(false)} title="Delete?" confirmLabel="Delete poster" danger>sure</ConfirmDialog>
      <WorkspaceSwitcher workspaces={[{ id: '1', name: 'A' }, { id: '2', name: 'B' }]} activeId={ws} onSwitch={setWs} />
      <UserMenu name="Ming" onSignOut={() => { document.title = 'signedout' }} />
      <Popover label="p" trigger={<button id="pbtn">pop</button>}>hello</Popover>
      <Tooltip label="tip"><button id="tbtn">t</button></Tooltip>
      <span id="ws">{ws}</span>
    </div>
  )
}
createRoot(document.getElementById('root')!).render(<App />)

// LinkProvider: NavLinks must render through the app's link component.
import { NavLinks, LinkProvider } from '../src/index'
const Custom = (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a data-custom-link="1" {...p} />
const host = document.createElement('div'); host.id = 'linkhost'; document.body.appendChild(host)
createRoot(host).render(<LinkProvider value={Custom}><NavLinks items={[{ label: 'x', href: '/x', current: true }]} /></LinkProvider>)
