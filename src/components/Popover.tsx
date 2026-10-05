'use client'
import { cloneElement, useCallback, useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent, ReactElement, ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../cn'
import { useDismiss } from '../hooks'
import { useLink } from '../link'

type Align = 'start' | 'end'

/** Anchored panel for small forms or extra detail. Not for menus (use Menu) or hints (use Tooltip). `trigger` must be one button element. */
export function Popover({ trigger, children, align = 'start', label }: {
  trigger: ReactElement<Record<string, unknown>>; children: ReactNode; align?: Align; label: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()
  const close = useCallback(() => setOpen(false), [])
  useDismiss(open, ref, close)
  return (
    <div className="ds-popover-wrap" ref={ref}>
      {cloneElement(trigger, { 'aria-haspopup': 'dialog', 'aria-expanded': open, 'aria-controls': open ? id : undefined, onClick: () => setOpen(o => !o) })}
      {open && <div id={id} role="dialog" aria-label={label} className={cn('ds-popover ds-popover-body', align === 'end' ? 'ds-popover-end' : 'ds-popover-start')}>{children}</div>}
    </div>
  )
}

export type MenuEntry =
  | { type?: 'item'; label: string; onSelect?: () => void; href?: string; icon?: ReactNode; danger?: boolean; disabled?: boolean; checked?: boolean; hint?: string }
  | { type: 'separator' }
  | { type: 'label'; label: string }

/** Dropdown menu. Arrow keys / Home / End move, Esc closes and returns focus to the trigger, Enter or Space selects.
 *  `trigger` must be one button element. Items with `href` render as links. Opens below; align="end" for right-edge triggers. */
export function Menu({ trigger, items, align = 'start', label }: {
  trigger: ReactElement<Record<string, unknown>>; items: MenuEntry[]; align?: Align; label: string
}) {
  const Link = useLink()
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const id = useId()
  const close = useCallback((refocus = false) => {
    setOpen(false)
    if (refocus) wrap.current?.querySelector<HTMLElement>('[aria-haspopup]')?.focus()
  }, [])
  useDismiss(open, wrap, () => setOpen(false))

  const enabled = () => Array.from(list.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]:not([aria-disabled="true"])') ?? [])
  const focusAt = (i: number) => { const e = enabled(); if (e.length) e[(i + e.length) % e.length].focus() }
  // Focus moves in an effect right after the menu commits (not rAF), so it is deterministic.
  const pendingFocus = useRef<'first' | 'last' | null>(null)
  useEffect(() => {
    if (open && pendingFocus.current) { focusAt(pendingFocus.current === 'last' ? -1 : 0); pendingFocus.current = null }
  }, [open])
  const openAndFocus = (last = false) => {
    pendingFocus.current = last ? 'last' : 'first'
    if (open) { focusAt(last ? -1 : 0); pendingFocus.current = null } else setOpen(true)
  }

  const onTriggerKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); openAndFocus() }
    if (e.key === 'ArrowUp') { e.preventDefault(); openAndFocus(true) }
  }
  const onListKey = (e: KeyboardEvent) => {
    const e2 = enabled(); const i = e2.indexOf(document.activeElement as HTMLElement)
    if (e.key === 'ArrowDown') { e.preventDefault(); focusAt(i + 1) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusAt(i - 1) }
    else if (e.key === 'Home') { e.preventDefault(); focusAt(0) }
    else if (e.key === 'End') { e.preventDefault(); focusAt(-1) }
    else if (e.key === 'Escape') { e.preventDefault(); close(true) }
    else if (e.key === 'Tab') close()
  }

  return (
    <div className="ds-popover-wrap" ref={wrap}>
      {cloneElement(trigger, { 'aria-haspopup': 'menu', 'aria-expanded': open, 'aria-controls': open ? id : undefined, onClick: () => (open ? close() : openAndFocus()), onKeyDown: onTriggerKey })}
      {open && (
        <div id={id} ref={list} role="menu" aria-label={label} onKeyDown={onListKey}
          className={cn('ds-popover', align === 'end' ? 'ds-popover-end' : 'ds-popover-start')}>
          {items.map((it, i) => {
            if (it.type === 'separator') return <div key={i} role="separator" className="ds-menu-sep" />
            if (it.type === 'label') return <div key={i} className="ds-menu-label" aria-hidden>{it.label}</div>
            const cls = cn('ds-menu-item', it.danger && 'ds-menu-item-danger')
            const inner = <>
              {it.icon}<span>{it.label}</span>
              {it.checked ? <Check size={16} className="ml-auto" aria-hidden /> : it.hint ? <span className="ds-menu-hint">{it.hint}</span> : null}
            </>
            const role = it.checked !== undefined ? 'menuitemradio' : 'menuitem'
            return it.href
              ? <Link key={i} role={role} aria-checked={it.checked} aria-disabled={it.disabled || undefined} href={it.href} className={cls} tabIndex={-1} onClick={() => close()}>{inner}</Link>
              : <button key={i} type="button" role={role} aria-checked={it.checked} aria-disabled={it.disabled || undefined} className={cls} tabIndex={-1}
                  onClick={() => { if (it.disabled) return; it.onSelect?.(); close(true) }}>{inner}</button>
          })}
        </div>
      )}
    </div>
  )
}
