'use client'
import { ChevronDown, LogIn, LogOut, Settings } from 'lucide-react'
import { t } from '../copy'
import { useLink } from '../link'
import type { Lang } from '../copy'
import { Menu } from './Popover'
import type { MenuEntry } from './Popover'
import { Badge } from './Surface'

export function Avatar({ name, src }: { name: string; src?: string }) {
  return <span className="ds-avatar" aria-hidden>{src ? <img src={src} alt="" /> : name.trim().slice(0, 1).toUpperCase()}</span>
}

/** Signed-in user control. Signed out, render a "登录" Button instead. `extra` items go above Sign out. */
export function UserMenu({ name, email, avatarSrc, onSettings, settingsHref, onSignOut, extra = [], lang }: {
  name: string; email?: string; avatarSrc?: string; onSettings?: () => void; settingsHref?: string; onSignOut: () => void; extra?: MenuEntry[]; lang?: Lang
}) {
  const items: MenuEntry[] = [
    { type: 'label', label: email ? `${name} · ${email}` : name },
    ...(onSettings || settingsHref ? [{ label: t(lang, 'settings'), icon: <Settings size={16} aria-hidden />, onSelect: onSettings, href: settingsHref } as MenuEntry] : []),
    ...extra,
    { type: 'separator' },
    { label: t(lang, 'signOut'), icon: <LogOut size={16} aria-hidden />, onSelect: onSignOut },
  ]
  return (
    <Menu align="end" label={t(lang, 'account')} items={items}
      trigger={<button type="button" className="ds-btn ds-btn-ghost ds-btn-sm" aria-label={`${t(lang, 'account')}: ${name}`}><Avatar name={name} src={avatarSrc} /><ChevronDown size={14} aria-hidden /></button>} />
  )
}

export function SignInButton({ onClick, href, lang }: { onClick?: () => void; href?: string; lang?: Lang }) {
  const Link = useLink()
  const cls = 'ds-btn ds-btn-outline ds-btn-sm'
  return href
    ? <Link className={cls} href={href}><LogIn size={16} aria-hidden />{t(lang, 'signIn')}</Link>
    : <button type="button" className={cls} onClick={onClick}><LogIn size={16} aria-hidden />{t(lang, 'signIn')}</button>
}

export interface WorkspaceOption { id: string; name: string; role?: string }

/** Shows the active workspace and switches between the ones you belong to. The app performs the switch (and any reload).
 *  Reserve its footprint while the list loads (render <Skeleton className="h-[34px] w-36" />) so the header doesn't reflow. */
export function WorkspaceSwitcher({ workspaces, activeId, onSwitch, footer, lang }: {
  workspaces: WorkspaceOption[]; activeId: string; onSwitch: (id: string) => void; footer?: MenuEntry[]; lang?: Lang
}) {
  const active = workspaces.find(w => w.id === activeId) ?? workspaces[0]
  const items: MenuEntry[] = [
    { type: 'label', label: t(lang, 'switchWorkspace') },
    ...workspaces.map(w => ({ label: w.name, checked: w.id === active?.id, hint: w.role === 'viewer' ? t(lang, 'viewer') : undefined, onSelect: () => w.id !== active?.id && onSwitch(w.id) }) as MenuEntry),
    ...(footer?.length ? [{ type: 'separator' } as MenuEntry, ...footer] : []),
  ]
  return (
    <Menu label={t(lang, 'workspace')} items={items}
      trigger={<button type="button" className="ds-btn ds-btn-outline ds-btn-sm" aria-label={`${t(lang, 'workspace')}: ${active?.name}`}>
        <span className="max-w-[10rem] truncate">{active?.name}</span>{active?.role === 'viewer' && <Badge tone="outline" small>{t(lang, 'viewer')}</Badge>}<ChevronDown size={14} aria-hidden /></button>} />
  )
}
