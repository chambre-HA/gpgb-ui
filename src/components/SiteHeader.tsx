'use client'
import type { ReactNode } from 'react'
import { useLink } from '../link'

/** Brand header: graphic logo, a hairline divider, then the app title, optional desktop nav, actions right. Copy `assets/logo/daoshang-horizontal-mark-dark.png`
 *  into the app's public/logo/ and pass '/logo/daoshang-horizontal-mark-dark.png'. The dark-slate mark flips to light via .brand-logo.
 *  Phones: pass `menuButton` (see MenuButton + NavDrawer) and hide `nav` below `md` (NavLinks className="hidden md:flex"). */
export function SiteHeader({ logoSrc, logoAlt = '大道大商', title, nav, actions, menuButton, href = '/', containerClassName = 'ds-container', homeLabel }: {
  logoSrc: string; logoAlt?: string; title?: string; nav?: ReactNode; actions?: ReactNode; menuButton?: ReactNode; href?: string
  /** Width/gutter of the header content. Default `ds-container` (72rem). Narrow apps pass e.g. 'mx-auto max-w-2xl px-5' to line up with their page column. */
  containerClassName?: string
  /** aria-label for the logo link when there is no title (e.g. "接龙 首页"). */
  homeLabel?: string
}) {
  const Link = useLink()
  return (
    <header className="ds-header">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 ds-btn ds-btn-primary">Skip to content</a>
      <div className={`${containerClassName} flex items-center justify-between gap-x-4 gap-y-2 py-4`}>
        <div className="flex min-w-0 items-center gap-3">
          {menuButton && <div className="md:hidden">{menuButton}</div>}
          <Link href={href} aria-label={homeLabel} className="flex min-w-0 items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} alt={logoAlt} className="brand-logo h-6 w-auto shrink-0" />
            {title && <><span className="ds-brand-divider" aria-hidden /><span className="font-display truncate text-lg text-ink">{title}</span></>}
          </Link>
        </div>
        {nav && <div className="hidden md:block">{nav}</div>}
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </header>
  )
}
