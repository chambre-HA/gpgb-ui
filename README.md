# @vibeuncle/gpgb-ui
Shared 大道大商 design system. Spec: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
- `styles/tokens.css` — Tailwind v4 `@theme` tokens + dark mode
- `styles/components.css` — `ds-*` component classes, motion, a11y base
- `src/` — React components: Button, Field/Input/Select/Switch, Card/Badge/Alert/EmptyState, Tabs, Modal, ConfirmDialog, Sheet, Menu, Popover, Tooltip, Toast, Stamp, SiteHeader, NavLinks/NavDrawer, Breadcrumbs, StepIndicator, UserMenu, WorkspaceSwitcher, LangToggle, PageShell/CenteredPage/SidebarLayout/PageTitle, SiteFooter; `copy.ts` (zh/en labels); `hooks.ts` (focus trap, dismiss, scroll lock)
- `assets/logo/` — the graphic logo
- `styleguide/` — static visual reference (open `index.html`)
No apps are migrated yet. `npm run typecheck` needs react/lucide-react/typescript installed.
