'use client'
import { ChevronRight, Menu as MenuIcon, Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../cn'
import { t } from '../copy'
import type { Lang } from '../copy'
import { Sheet } from './Sheet'
import { useLink } from '../link'

export interface NavItem { label: string; href: string; icon?: ReactNode; current?: boolean }

/** Header navigation: pill links, current page = accent-soft wash with aria-current="page". Hide on phones; use NavDrawer there. */
export function NavLinks({ items, lang, className }: { items: NavItem[]; lang?: Lang; className?: string }) {
  const Link = useLink()
  return (
    <nav aria-label={t(lang, 'mainNav')} className={cn('flex items-center gap-1', className)}>
      {items.map(i => (
        <Link key={i.href} href={i.href} className="ds-nav-link" aria-current={i.current ? 'page' : undefined}>{i.icon}{i.label}</Link>
      ))}
    </nav>
  )
}

/** Phone navigation: hamburger button + left drawer. Place the button in the header, visible below `md`. */
export function NavDrawer({ items, open, onOpenChange, title, footer, lang }: {
  items: NavItem[]; open: boolean; onOpenChange: (v: boolean) => void; title?: string; footer?: ReactNode; lang?: Lang
}) {
  const Link = useLink()
  return (
    <Sheet open={open} onClose={() => onOpenChange(false)} side="left" title={title ?? t(lang, 'menu')} lang={lang}>
      <nav aria-label={t(lang, 'mainNav')} className="flex flex-col gap-1">
        {items.map(i => (
          <Link key={i.href} href={i.href} className="ds-drawer-link" aria-current={i.current ? 'page' : undefined} onClick={() => onOpenChange(false)}>{i.icon}{i.label}</Link>
        ))}
      </nav>
      {footer && <div className="mt-6 border-t border-border-soft pt-4">{footer}</div>}
    </Sheet>
  )
}

export function MenuButton({ onClick, expanded, lang }: { onClick: () => void; expanded?: boolean; lang?: Lang }) {
  return (
    <button type="button" className="ds-btn ds-btn-ghost ds-btn-icon" onClick={onClick} aria-label={t(lang, 'openMenu')} aria-expanded={expanded} aria-haspopup="dialog">
      <MenuIcon size={20} />
    </button>
  )
}

/** Where you are. The last item is the current page and is not a link. */
export function Breadcrumbs({ items, lang }: { items: Array<{ label: string; href?: string }>; lang?: Lang }) {
  const Link = useLink()
  return (
    <nav aria-label={t(lang, 'breadcrumb')}>
      <ol className="ds-crumbs">
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li key={i}>
              {last || !c.href ? <span aria-current={last ? 'page' : undefined}>{c.label}</span> : <Link href={c.href} className="ds-link">{c.label}</Link>}
              {!last && <ChevronRight size={14} aria-hidden className="text-ink-faint" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** Multi-step flow progress. On phones only the current step shows its label. `current` is zero-based. */
export function StepIndicator({ steps, current, lang }: { steps: string[]; current: number; lang?: Lang }) {
  return (
    <ol className="ds-steps" aria-label={t(lang, 'steps')}>
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'todo'
        return (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span className="ds-step-line" aria-hidden />}
            <span className="ds-step" data-state={state} aria-current={state === 'current' ? 'step' : undefined}>
              <span className="ds-step-dot">{state === 'done' ? <Check size={12} strokeWidth={3} aria-hidden /> : i + 1}</span>
              <span className="ds-step-label">{label}</span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

/** 中 / EN switch. Controlled; the app owns persistence (cookie, route, or state). */
export function LangToggle({ value, onChange, lang }: { value: Lang; onChange: (v: Lang) => void; lang?: Lang }) {
  return (
    <div className="ds-tabs" role="group" aria-label={t(lang ?? value, 'language')}>
      {(['zh', 'en'] as const).map(l => (
        <button key={l} type="button" className="ds-tab" aria-pressed={value === l} lang={l} onClick={() => onChange(l)}>{l === 'zh' ? '中' : 'EN'}</button>
      ))}
    </div>
  )
}
