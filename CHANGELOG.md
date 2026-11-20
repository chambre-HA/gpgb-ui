# Changelog

Versions follow semver while 0.x: **minor** = new components or token changes that may shift appearance, **patch** = fixes. Apps pin with `^0.x.0`.

## 0.6.0
- **App guides:** an "App guides (how-to page + deck)" section in `DESIGN_SYSTEM.md` (summary in `DESIGN.md`): screenshot size and data, numbered markers in the screenshot's CSS px shared by the page and the deck, one step = one marker, layouts (screen + steps, two screens, anatomy, flow, desktop, tips, note band), cover, voice, and how to build and check the deck. Learnt from gpgb-dingke's 主持人指南.
- **`decks/guide-kit.cjs`** (`@vibeuncle/gpgb-ui/decks/guide-kit.cjs`): a pptxgenjs kit for those decks, with the tokens, cover and content layouts, logo, and `phone`, `shotCard`, `dot`, `stepsWithMarkers`, `note`, `flow`, `legend`, `iconList`, `tips`, `heroShots`, `useShots` (reads the page's webp screenshots). Node only; the caller brings pptxgenjs, react, react-dom, sharp and react-icons. No CSS or component changes.

## 0.5.0
- **`<WaitPanel>` / `ds-wait`** for waits over ~3s (AI writing, recording, rendering): an ensō ring that fills with real or estimated progress, a breathing circle (4s in, 4s out, 吸 / 呼), named stages, elapsed time against the usual duration, a gentle line per breath, optional cancel. `estimateProgress()` exported. New labels `breatheIn`, `breatheOut`, `breatheHint`, `waitUsually`, `waitLonger`.
- Motion: the breath (`ds-breathe`) is the one slow loop allowed; reduced motion holds it still.
- **Decks:** a "Decks (slides)" section in `DESIGN_SYSTEM.md` (and a summary in `DESIGN.md`): canvas, margins, colours, cover, logo placement, type scale, layouts, density and motion for 16:9 decks.
- **Assets:** `assets/logo/daoshang-horizontal-mark-light.png`, the mark in white for dark surfaces where a CSS filter isn't available (decks, exports). Docs and assets only; no token or component changes.

## 0.4.0
- **Standard sizes:** header row is a fixed 72px (`ds-header-row`, built into `SiteHeader`) so the logo and page sit at the same height in every app; exact control heights, sm 32 / md 40 / lg 48px for buttons and inputs (`ds-input-lg` added), tabs 40px; page head classes `ds-page-head`, `ds-title` (36/48px), `ds-title-sm`, `ds-lede`; `ds-search` and `<SearchInput>`; `<PageTitle small>`. `ds-page-title` removed (use `ds-page-head`).
- The browser test suite now measures these sizes in the style guide.
- Appearance: buttons that were 46px (lg) are now 48px; inputs 39px are 40px; small inputs 34px are 32px; headers that depended on their content are now 72px.

## 0.3.0
- **Page width standard:** the 72rem (1152px) frame of draw.gpgb.app, now with responsive gutters (16px, 24px from 640px) so desktop content is 1104px. `ds-container-wide` (80rem), `ds-measure` (42rem reading column inside the frame), `ds-split` / `<SplitLayout>` (content + 22rem side panel), `ds-grid-cards` (auto-fill card grid). `<PageShell wide>`.
- Docs: Tailwind's `rounded-sm/md/lg/xl` and `shadow-sm/md/lg` follow the system scale (they are defined in `@theme`), and the page-width rules.

## 0.2.1
- Release pipeline only: publishes through npm trusted publishing (no token). No code or appearance changes.

## 0.2.0 — first public release
- Tokens: paper/ink/accent palette with dark mode, `accent-text`, `border-strong`, `focus`, `on-accent`/`on-danger`; radii, shadows, motion tokens.
- `ds-*` CSS components and a React package: buttons, forms, cards, badges, tabs, modal, confirm dialog, sheet, menu, popover, tooltip, toast, stamp, skeleton.
- Navigation: `SiteHeader` (graphic logo + divider), `NavLinks`, `NavDrawer`, `Breadcrumbs`, `StepIndicator`, `UserMenu`, `WorkspaceSwitcher`, `LangToggle`, `SiteFooter`; layouts `PageShell`, `CenteredPage`, `SidebarLayout`, `PageTitle`.
- `LinkProvider` so apps can supply `next/link`; `containerClassName` and `homeLabel` on `SiteHeader`.
- zh/en `labels`, focus-trap/dismiss hooks, browser test suite, static style guide, `DESIGN.md` + `DESIGN_SYSTEM.md`.
- `accent-text` retuned to `#a84a0a` / `#ffb783` so it passes AA on `accent-soft`.
