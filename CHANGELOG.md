# Changelog

Versions follow semver while 0.x: **minor** = new components or token changes that may shift appearance, **patch** = fixes. Apps pin with `^0.x.0`.

## 0.2.0 — first public release
- Tokens: paper/ink/accent palette with dark mode, `accent-text`, `border-strong`, `focus`, `on-accent`/`on-danger`; radii, shadows, motion tokens.
- `ds-*` CSS components and a React package: buttons, forms, cards, badges, tabs, modal, confirm dialog, sheet, menu, popover, tooltip, toast, stamp, skeleton.
- Navigation: `SiteHeader` (graphic logo + divider), `NavLinks`, `NavDrawer`, `Breadcrumbs`, `StepIndicator`, `UserMenu`, `WorkspaceSwitcher`, `LangToggle`, `SiteFooter`; layouts `PageShell`, `CenteredPage`, `SidebarLayout`, `PageTitle`.
- `LinkProvider` so apps can supply `next/link`; `containerClassName` and `homeLabel` on `SiteHeader`.
- zh/en `labels`, focus-trap/dismiss hooks, browser test suite, static style guide, `DESIGN.md` + `DESIGN_SYSTEM.md`.
- `accent-text` retuned to `#a84a0a` / `#ffb783` so it passes AA on `accent-soft`.
