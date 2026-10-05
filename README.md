# @vibeuncle/gpgb-ui
Shared 大道大商 design system. Spec: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
- `styles/tokens.css` — Tailwind v4 `@theme` tokens + dark mode
- `styles/components.css` — `ds-*` component classes, motion, a11y base
- `src/` — React components: Button, Field/Input/Select/Switch, Card/Badge/Alert/EmptyState, Tabs, Modal, ConfirmDialog, Sheet, Menu, Popover, Tooltip, Toast, Stamp, SiteHeader, NavLinks/NavDrawer, Breadcrumbs, StepIndicator, UserMenu, WorkspaceSwitcher, LangToggle, PageShell/CenteredPage/SidebarLayout/PageTitle, SiteFooter; `copy.ts` (zh/en labels); `hooks.ts` (focus trap, dismiss, scroll lock)
- `assets/logo/` — the graphic logo
- `styleguide/` — static visual reference (open `index.html`)
No apps are migrated yet. `npm run typecheck` needs react/lucide-react/typescript installed.

## Install
```bash
npm install @vibeuncle/gpgb-ui        # peers: react, tailwindcss ^4, lucide-react
```
Then follow "Using it in an app" in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) (CSS import, `transpilePackages`, `LinkProvider`).

## Releasing
1. Change tokens/components; update the style guide and docs in the same commit; add a `CHANGELOG.md` entry.
2. `npm run check` (typecheck + browser tests; also runs in CI).
3. `npm version minor` (or `patch`), then `git push --follow-tags`.
4. The tag triggers `.github/workflows/release.yml`, which publishes to npm when the repo secret `NPM_TOKEN` is set. Or publish by hand: `npm publish`.
5. Apps pick it up via Renovate/Dependabot PRs (or `npm update @vibeuncle/gpgb-ui`).

Licence: proprietary (`UNLICENSED`): published for 大道大商 / VibeUncle apps, no reuse grant.
