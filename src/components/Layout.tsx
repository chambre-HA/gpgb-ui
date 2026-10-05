'use client'

import type { ReactNode } from 'react'
import { cn } from '../cn'
import { t } from '../copy'
import type { Lang } from '../copy'
import { useLink } from '../link'

/** Standard page: header, main, footer, all on the 72rem frame (`wide` = 80rem for editors and big tables). */
export function PageShell({ header, children, footer, wide }: { header?: ReactNode; children: ReactNode; footer?: ReactNode; wide?: boolean }) {
  return (
    <div className="ds-page">
      {header}
      <main id="main" className={cn('ds-container py-10', wide && 'ds-container-wide')}>{children}</main>
      {footer}
    </div>
  )
}

/** Single centred card on paper: sign-in, invite, confirmation, not-found. */
export function CenteredPage({ children }: { children: ReactNode }) {
  return <div className="ds-page-centered"><main id="main" className="ds-card">{children}</main></div>
}

/** Page title row: serif title + description on the left, actions on the right (primary action first on phones). */
export function PageTitle({ title, description, actions, breadcrumbs }: { title: string; description?: string; actions?: ReactNode; breadcrumbs?: ReactNode }) {
  return (
    <div className="mb-9">
      {breadcrumbs && <div className="mb-3">{breadcrumbs}</div>}
      <div className="ds-page-title !mb-0">
        <div className="min-w-0">
          <h1 className="font-display text-4xl font-medium sm:text-5xl">{title}</h1>
          {description && <p className="mt-3 max-w-[44em] text-[13px] leading-[1.85] text-ink-soft">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}

/** Content + side panel (share link, QR, info, actions). Panel is on the right from 1024px (sticky) and stacks below the content on smaller screens. */
export function SplitLayout({ aside, children }: { aside: ReactNode; children: ReactNode }) {
  return <div className="ds-split"><div className="min-w-0">{children}</div><aside>{aside}</aside></div>
}

/** Sidebar + content (editor, settings, admin). Sidebar is sticky from `lg`; on phones put its content in a Sheet instead. */
export function SidebarLayout({ aside, children, wide }: { aside: ReactNode; children: ReactNode; wide?: boolean }) {
  return <div className={cn('ds-shell', wide && 'ds-shell-wide')}><aside>{aside}</aside><div className="min-w-0">{children}</div></div>
}

export function SiteFooter({ logoSrc, logoAlt = '大道大商', links = [], note, lang }: {
  logoSrc?: string; logoAlt?: string; links?: Array<{ label: string; href: string }>; note?: string; lang?: Lang
}) {
  const Link = useLink()
  return (
    <footer className="ds-footer">
      <div className="ds-container flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logoSrc && <img src={logoSrc} alt={logoAlt} className="brand-logo h-5 w-auto opacity-80" />}
          <span>{note ?? `© ${new Date().getFullYear()} ${t(lang, 'copyright')}`}</span>
        </div>
        {links.length > 0 && <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1">{links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}</nav>}
      </div>
    </footer>
  )
}
