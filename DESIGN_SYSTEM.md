# 大道大商 Design System (`@vibeuncle/gpgb-ui`)

Source of truth for the shared look of draw.gpgb.app, albums, jiqun-studio, jielong and future 大道大商 apps.
Reference app: **greatpath-draw**. Where apps disagreed, greatpath-draw won; gaps were filled from jiqun-studio
(feedback colours, shadows, radii, `ds-*` classes), gpgb-albums (easing) and jielong (`paper-deep`).

## Principles
1. **Warm paper + ink.** Pages are cream (`paper`), content sits on white `surface`, text is warm near-black `ink`.
2. **One orange.** `accent` (#ff7f20, the VI primary) is the only brand colour: primary action, focus, selection, links on hover. One primary button per view.
3. **Soft shapes.** Pills for actions and labels, rounded cards, hairline borders. Shadows are faint.
4. **Serif for voice, sans for work.** Noto Serif SC for titles and quotes; Noto Sans SC for everything else, including long reading text.
5. **Quiet motion.** Short ease-out entrances that answer an action; nothing loops except spinners/skeletons. Reduced-motion flattens all of it.
6. **Dark mode is automatic** (`prefers-color-scheme`); never branch on theme in components, use tokens.

## Colour tokens
| Token | Light | Dark | Use |
|---|---|---|---|
| `paper` | #faf6ee | #1c1a16 | Page background |
| `paper-deep` | #f1eadb | #2a2620 | Recessed panels, table hover |
| `surface` | #ffffff | #262320 | Cards, inputs, modals |
| `ink` | #221f1a | #f1ece1 | Body/headings |
| `ink-soft` | #6b6458 | #b5ac9c | Secondary text |
| `ink-faint` | #766e59 | #948c73 | Hints, placeholders (AA on paper) |
| `border-soft` | #e8e0d1 | #3a352c | Decorative dividers, card edges |
| `border-strong` | #8f8676 | #7d7463 | Form-control edges, switch track (3:1+) |
| `accent` / `-hover` / `-soft` | #ff7f20 / #d96c1b / #ffebdb | #ff994d / #ffac6e / #664921 | Brand fill, hover, tinted bg |
| `accent-text` | #a84a0a | #ffb783 | Orange used as text/icon (4.8:1+ on paper, surface, paper-deep and accent-soft; raw accent is 2.3:1 on paper) |
| `focus` | #d96c1b | #ff994d | Focus ring (3:1+) |
| `danger` | #c62828 | #f87171 | Errors, destructive |
| `warn` | #8a5a20 | #e0b06a | Warnings |
| `success` | #2e7d4f | #6fcf97 | Confirmations |
| `on-accent` | #ffffff | #221f1a | Text on accent fills. White in light (reference look), ink in dark |
| `on-danger` | #ffffff | #221f1a | Text on danger fills |
| `scrim` | #1c1a16 | same | Overlays (always dark) |

Use as Tailwind utilities: `bg-paper text-ink-soft border-border-soft`. No raw hex in app code. Don't use Tailwind's red/gray/orange.

## Typography
- Display: `font-display` (Noto Serif SC 500, tracking -0.025em, lh 1.2). Page title `text-4xl sm:text-5xl`; section `text-xl`.
- Body: Noto Sans SC 14px (`text-sm`), lh 1.6. Secondary copy `text-ink-soft`; hints `ds-hint` (12px).
- Reading text: `font-answer` (16px phone / 17px sm+, lh 1.85, strict CJK line-breaking). Editorial quotes: `font-editorial`.
- Eyebrow/caption: `ds-caption` (12px, uppercase, tracking .08em).
- Bilingual labels: Chinese first, English in `ds-hint` beneath or after a `·`. Don't mix scripts mid-label in different fonts. `lang="zh-CN"` on `<html>`.
- Load fonts via `fonts.css` (fontsource) or `next/font` exposing the same family names. Brand-VI commercial fonts are not bundled.

## Shape, elevation, spacing
- Radii: `pill` buttons/badges/toasts; `xl` 16 modals & hero cards; `lg` 12 cards; `md` 8 inputs/tabs; `sm` 6 tab items/skeletons. Images in cards: `lg` clipped.
- Shadows: `sm` cards at rest, `md` hover/raised, `lg` modals/toasts. Borders stay 1px `border-soft`.
- Spacing: 4px base; page gutter 24px (`ds-container`, max 72rem); card padding 16–24px; gap between form fields 16px; button gap 8px.
- Breakpoints: Tailwind defaults; design mobile-first, `sm` 640 is the phone/tablet switch.

## Components (all `ds-*` classes; React wrappers in `src/`)
| Component | Class / React | Notes |
|---|---|---|
| Button | `ds-btn ds-btn-{primary,outline,ghost,danger}` `-sm -lg -icon` / `<Button>` | Pill. Press = scale .97. Disabled .45 opacity. Loading = `aria-busy="true"`. Icon-only needs `aria-label`. Primary left→right order: cancel(outline), confirm(primary). |
| Input/Textarea/Select | `ds-input` `-sm` / `<Input>` … | 8px radius; focus = accent border + ring; error = `aria-invalid` (danger border) + `ds-error`. Wrap with `<Field>` for label/hint/error. |
| Switch | `ds-switch` / `<Switch>` | `role=switch`; 44px hit area. |
| Checkbox/radio | `ds-check` | Native control, orange `accent-color`. |
| Card | `ds-card` `-interactive` / `<Card>` | Clickable cards get `-interactive` (accent border + shadow-md on hover). |
| Badge/chip | `ds-badge-{accent,ink,tint,outline,danger}` `-sm` / `<Badge>` | Status = tint/outline; count/new = accent. |
| Tabs | `ds-tabs` `ds-tab` / `<Tabs>` | Segmented; selected = solid accent with on-accent text. Toggle groups: `aria-pressed`. |
| Modal | `ds-backdrop ds-modal` / `<Modal>` | Esc/backdrop close, scroll lock, `aria-labelledby`. Enter: backdrop-in + modal-in. |
| Toast | `ds-toast` `-error` / `<Toast>` | Top-centre pill, 3s. |
| Alert | `ds-alert` `-danger -warn` / `<Alert>` | Inline, persistent messages. |
| Empty state | `ds-empty` / `<EmptyState>` | Serif title, hint, one action. |
| Skeleton/Spinner | `ds-skeleton`, `ds-spinner` | Skeleton mirrors final layout; spinner only for <3s waits. |
| Table | `ds-table` | Hairline rows, hover `paper-deep`. |
| Header | `ds-header` / `<SiteHeader>` | Graphic logo `assets/logo/daoshang-horizontal-mark-dark.png` (h-6, `brand-logo` flips it light in dark mode; also `…-bare-dark.png` without the brush mark) + a 1px vertical hairline (`ds-brand-divider`, 20px tall, `border-strong` at 55%) + serif app title + right-aligned actions. The divider separates the brand mark from the app name because the mark is lettering; it shows only when there is an app title. Copy the file into the app's `public/logo/`. |
| Link | `ds-link` | Soft ink, accent + underline on hover. |

## Motion
Principle: calm, physical, short. Things settle into place like paper on a bulletin board; the single flourish is the **seal stamp**.
Tokens: `--duration-fast` 150ms (hover/press), `--duration-base` 200ms (modal, slide, lift), `--duration-slow` 350ms (list entry), `--duration-stamp` 560ms; `--ease-out` cubic-bezier(.16,1,.3,1) for entrances, `--ease-spring` for a gentle settle (switch thumb), `--ease-standard` for state changes, `--stagger-step` 45ms.

| Pattern | Class | Use |
|---|---|---|
| Entrances | `animate-backdrop-in`, `animate-modal-in`, `animate-entry-in`, `animate-slide-next/prev`, `toast-in` (built into `ds-toast`) | Overlays, panels, toasts, stepped flows |
| Stagger | `ds-stagger` on a list/grid parent | First load of lists, galleries, dashboards. 45ms steps, capped at 12 |
| Scroll reveal | `ds-reveal` | Long pages. CSS scroll timeline, no JS; unsupported browsers just show it |
| Seal stamp | `ds-stamp` / `<Stamp>` | Once per view on a meaningful success (published, saved, signed up) |
| Card lift | `ds-card-interactive` | Clickable cards: rise 2px + deeper shadow, settle on press |
| Link underline | `ds-link` | Underline draws in from the left on hover |
| Switch | `ds-switch` | Thumb settles with a small overshoot |
| Skeleton | `ds-skeleton` | Soft sweep while loading (not a blink) |
| Slideshow | `animate-fade-in` + `animate-drift` | Photo cross-fade and slow Ken Burns (from gpgb-albums) |

Rules: one flourish per view; everything else is quiet feedback that answers an action. Move at most 10px (the stamp excepted). Animate transform, opacity and shadow only, never layout. Stagger only on first load, never replay entrances on content people are reading. Nothing loops except spinner and skeleton. `prefers-reduced-motion` removes all animation and transition, scroll reveal included.

## Navigation
| Piece | React | Notes |
|---|---|---|
| Header | `<SiteHeader logoSrc title nav actions menuButton containerClassName homeLabel>` | Graphic logo left; `nav` shows from `md`; `menuButton` shows below `md`. Includes a skip link to `#main` (give your `<main>` that id). `containerClassName` sets the content width (default the 72rem `ds-container` frame; pass `ds-container ds-container-wide` on wide pages; don't narrow it). Put short always-visible links in `actions` instead of `nav`. |
| Nav links | `<NavLinks items>` / `ds-nav-link` | Pill links; current = accent-soft wash + `aria-current="page"`. |
| Phone nav | `<MenuButton>` + `<NavDrawer items open onOpenChange>` | Left drawer (`Sheet side="left"`). Closes on link click, Esc, scrim. |
| Account | `<UserMenu>` / `<SignInButton>` | Avatar + menu: settings, extras, sign out. Signed out: outline 登录 button. |
| Workspace | `<WorkspaceSwitcher workspaces activeId onSwitch>` | Menu of radios; viewer role shows a "仅查看" badge. Reserve its width with a skeleton while loading. The app performs the switch. |
| Language | `<LangToggle value onChange>` | 中 / EN, `aria-pressed`. The app owns persistence. |
| Breadcrumbs | `<Breadcrumbs items>` | Depth 3+ only. Last item = current page, not a link. |
| Steps | `<StepIndicator steps current>` | Done = ink check, current = accent, upcoming = outline. Phones show only the current label. |
| Footer | `<SiteFooter logoSrc links note>` | Small logo, copyright, links. |

## Menus, popovers, tooltips, sheets
Pick by job: **Menu** = list of actions; **Popover** = a little extra content or mini form; **Tooltip** = a name or shortcut for an icon button (never required info; hidden on touch); **ConfirmDialog** = before anything irreversible; **Sheet** = phone bottom sheet or nav drawer; **Modal** = a task that needs protected focus.
- Menu: opens below (`align="end"` for right-edge triggers), focuses the first item however it opens, Arrow/Home/End move (disabled items skipped), Esc closes and returns focus to the trigger, Enter/Space selects. Items with `href` render as links; `checked` makes a radio item; `danger` colours destructive items.
- Modal, ConfirmDialog and Sheet trap focus, close on Esc, lock scroll and restore focus to the opener. Footer order: outline cancel, then the primary or danger action, whose label names the action ("删除海报", not "确定").
- Positioning is simple (below the trigger, start or end aligned); there is no collision flipping yet. Keep triggers away from the bottom edge, or use a Sheet on phones.

## Standard sizes (identical in every app)
| Thing | Size | Class |
|---|---|---|
| Header | **72px** tall (+1px border), content centred, whatever is inside (language toggle, buttons, nothing); inner content at most 48px | `ds-header-row` (built into `SiteHeader`) |
| Logo | **24px** high (`h-6`), always the graphic mark | |
| Page title | **36px**, 48px from 640px, serif 500, tracking -0.025em. Detail pages with long titles: 30px / 36px | `ds-title`, `ds-title-sm` |
| Page head | title + lede on the left, actions right; **40px** below the header (48px from 640px) | `ds-page-head`, `ds-lede`, `<PageTitle>` |
| Buttons | **sm 32 / md 40 / lg 48px**; icon buttons are square at the same size | `ds-btn` `-sm` `-lg` `-icon` |
| Inputs | **sm 32 / md 40 / lg 48px** | `ds-input` `-sm` `-lg` |
| Search | the 40px input with a leading icon | `ds-search` / `<SearchInput>` |
| Segmented tabs / language toggle | **40px** | `ds-tabs` |
| Touch (`pointer: coarse`) | controls 44px, input text 16px | automatic |

Use: page-level action (new poster, new album, create group) = **lg**; toolbar and in-card actions, search and filter tabs = **md** (they line up in one 40px row); compact row actions = **sm**. Don't set your own heights or text sizes on these. The style guide's "Sizes & page head" section measures them live, and `npm test` asserts them.

## Page width
One width across all 大道大商 apps: the **72rem frame** (1152px, centered), as on draw.gpgb.app. Gutters are 16px, then 24px from 640px, so desktop content is **1104px** wide. The header and the page content share the frame.
- **Standard:** `ds-container` (72rem). Galleries, dashboards, chat, lists, forms-with-context.
- **Wide:** `ds-container ds-container-wide` (80rem). Editors and big tables only. Pass the same to `SiteHeader`'s `containerClassName`.
- **Never narrow the frame.** Narrow content is a column *inside* it: `ds-measure` (42rem) for reading text or a single form. Sign-in, invite and not-found pages are a `CenteredPage` card (400px).
- **Use the width:** `ds-split` / `<SplitLayout aside>` puts content on the left and a 22rem side panel (share link, QR, info, actions) on the right from 1024px, stacking below on smaller screens; `ds-grid-cards` is a responsive card grid (columns of at least 18rem); `<SidebarLayout>` is a left navigation column (240px) for editors, settings and admin.
- **Phones:** everything is one column with 16px gutters; the frame only matters from tablet up.

Tailwind note: `rounded-sm/md/lg/xl` (6/8/12/16px) and `shadow-sm/md/lg` are the system scale (they are defined in `@theme`), so they differ slightly from Tailwind's defaults in every app that imports the package. Use them rather than arbitrary radii.

## Page layouts
`<PageShell header footer wide>` (header, frame, footer: lists, galleries, dashboards) · `<CenteredPage>` (one 400px card: sign-in, invite, not-found) · `<SplitLayout aside>` (content + right side panel) · `<SidebarLayout aside>` (left navigation column: editors, settings, admin; on phones move it into a bottom Sheet) · `<PageTitle title description actions breadcrumbs>` (serif title, primary action first on phones).

## Content & voice
Warm, plain, respectful: a helpful neighbour at the community centre. Chinese (简体) first, English beside or beneath. Say what happened and what to do next; never blame the person.
| Situation | Say | Avoid |
|---|---|---|
| Button | 保存海报 · Save poster (verb + object) | 确定 · OK · Submit |
| Destructive confirm | 删除海报 (names the thing) | 确定 · Yes |
| Error | 上传失败，图片超过 10 MB。请压缩后重试。 | 出错了！错误代码 500 |
| Empty state | 还没有海报。从模板开始，或上传背景图。 | 暂无数据 |
| Success | 已发布。 · Published. | 操作成功！ |
| Loading (over 1s) | 正在生成海报… | 请稍候 |
| Permission | 你只有查看权限。联系管理员可申请编辑。 | 无权访问 |
Rules: cancel is always 取消 / Cancel. Errors give the cause then the fix, no codes up front, no "Oops". Empty states say what belongs there plus one action. The seal stamp is for big successes only. Chinese uses full-width punctuation (，。：); English uses sentence case, never all-caps sentences. Put a space between Chinese and numbers or Latin words (更新于 3 分钟前). Dates: 2026年10月5日 / 5 Oct 2026. Don't translate proper names. Icon-only buttons carry an `aria-label` in the page language.
Code: `labels.zh` / `labels.en` (and `t(lang, key)`) hold the standard strings (取消, 确认, 保存, 删除, 关闭, 重试, 返回, 下一步, 登录, 退出登录, 设置, 帮助…). Components accept `lang="zh" | "en"` (default zh).

## Accessibility baseline
- Focus: `:focus-visible` 2px `focus` outline, 2px offset (inputs: 1px offset, border matches). Never `outline: none` without a replacement.
- Contrast: text meets AA in both themes (see the Contrast table in the style guide). Known gap: white on orange fills is 2.5:1 in light (3.4:1 on hover), below AA. Accepted to keep greatpath-draw's look: keep those labels 14px+ medium weight and never let them carry meaning alone. Dark mode uses ink on orange (7.8:1) because white would be 2.1:1. Orange as text uses `accent-text`. `ink-faint` is for paper/surface only, not `paper-deep`. Form-control edges use `border-strong` (3:1+); focus rings use `focus`.
- Touch: coarse pointers get 16px inputs (stops iOS zoom) and 44px min button height. No tap highlight/300ms delay.
- Semantics: dialogs `role=dialog aria-modal` with focus trap and restore; menus `role=menu/menuitem(radio)` with roving arrow keys; tabs `role=tablist/tab/aria-selected`; toggle groups `aria-pressed`; nav `aria-current="page"`, steps `aria-current="step"`; toasts `status`/`alert`; closed sheets are `inert`; icons that carry meaning have labels.
- Icons: Lucide, 16–20px, stroke 2, inherit `currentColor`.

## Using it in an app
```bash
npm install @vibeuncle/gpgb-ui   # pin with ^0.x; Renovate/Dependabot keeps it current
```
```css
/* app/globals.css */
@import 'tailwindcss';
@import '@vibeuncle/gpgb-ui/styles.css';
@import '@vibeuncle/gpgb-ui/fonts.css';  /* optional */
```
```tsx
import { Button, Card, Modal } from '@vibeuncle/gpgb-ui'
```
Next.js: wrap the app once in `<LinkProvider value={Link}>` (`import Link from 'next/link'`) so nav, breadcrumbs, footer and menu links do client-side navigation (default is a plain `<a>`, i.e. full page loads). Add `transpilePackages: ['@vibeuncle/gpgb-ui']` to `next.config.ts` (the package ships TS source). `styles.css` already contains `@source '../src'`, so your Tailwind generates the utilities the React components use; no extra setup. Components are client components where they need state (`'use client'` is in the files).

## Migration map (when you adopt it)
| App's old name | Canonical |
|---|---|
| gpgb-albums `brand`, `brand-dark`, `brand-soft` | `accent`, `accent-hover`, `accent-soft` |
| gpgb-albums `ink-900/800/700`, `hairline`, `paper-100`, `night` | `ink`, `ink` / `ink-soft`, `border-soft`, `paper-deep`, `scrim` |
| jielong `seal`, `seal-deep`, `seal-wash`, `card`, `hairline` | `accent`, `accent-hover`, `accent-soft`, `surface`, `border-soft` |
| jiqun-studio `--brand-orange`, `--grey-*`, `--ochre-600` and other legacy aliases | `accent`, `border-soft`/`ink-soft`, `warn` |
| greatpath-draw inline `rounded-lg bg-accent …` buttons / `bg-red-600` toasts | `<Button>`, `<Toast tone="error">` |
| greatpath-draw `MobileSheet`, `WorkspaceSwitcher`, `StepIndicator`, `PosterPreviewModal` shell | `<Sheet>`, `<WorkspaceSwitcher>`, `<StepIndicator>`, `<Modal>` |
| jiqun-studio `BrandHeader`, `UserMenu`, `LangToggle` · jielong `SiteHeader` · albums `site-header`/`account-bar` | `<SiteHeader>`, `<UserMenu>`, `<LangToggle>` (+ `<NavLinks>` / `<NavDrawer>`) |
| `text-white` on `bg-accent` / `bg-brand` / `bg-seal` | `text-on-accent` (white in light, ink in dark). Orange text on paper: `text-accent-text` |
| `border-border-soft` on inputs | `border-border-strong` (use `ds-input`) |
Colour values already match, so renames are mechanical. The one visual change is dark mode, where text on orange becomes ink.

## Theme preview
`data-theme="light|dark"` on any element forces that theme for it (the style guide uses this on `<html>`); otherwise the OS setting applies. Visual reference: `styleguide/index.html` (rebuild with `npm run styleguide:build`). Machine-readable spec: `DESIGN.md`.

## Decks (slides)
For presentations and PDFs that explain the system or an app: 16:9, built from the same tokens, so a deck reads as the same room as the app. Reference implementation: `greatpath-draw/scripts/build-design-deck.py` (builds the 设计规范 deck through OfficeCLI; see `greatpath-draw/docs/README.md`). The builder takes its colours from the tokens above; a deck that needs a colour the tokens lack has the wrong colour.

| Thing | Rule |
|---|---|
| Canvas | 16:9, 33.87 × 19.05 cm. One 2.4 cm margin on every side; every slide shares the same left edge |
| Content slide | `paper` background. Title `ink`, serif bold; lede `ink-faint`; hairline `border-soft`; body `ink-soft` |
| Cover | The one slide on the dark set: `paper-dark` background, `ink-dark` title, `ink-soft-dark` subtitle, `ink-faint-dark` note, one short `accent-dark` rule and icon. Opens the deck the way dark mode opens the app |
| Logo | Bottom-right on **every** slide, 3.6 × 0.9 cm (the mark is 4:1), right edge aligned with the page number. `daoshang-horizontal-mark-dark.png` on `paper`, `…-mark-light.png` on the cover (pptx has no CSS filter, so the light file is a pre-made white copy) |
| Type | Noto Serif SC bold for titles, Noto Sans SC for everything else. Cover title 54 pt, slide title 30 pt, cover subtitle 17 pt, item titles 13 to 15 pt, lede 13 pt, body 9.8 to 11.5 pt, page number 11 pt. Line spacing 1.0 for titles, 1.45 for body, 1.85 for the closing quote |
| Header | Title top-left, lede beneath it, hairline under both. Top-right: `n / N`, then a 1.1 cm Lucide icon in `accent` naming the section |
| Orange | `accent` appears only as the section icon, the cover rule, list markers and step discs. Never as a background, never as body text (use `accent-text` if it must read as text) |
| Layouts | **Rules**: one or two columns of title + detail, balanced by measured height. **Avoid**: two columns, each item a title and a reason. **Checklist**: numbered `accent` discs, four columns. **Closing**: a single serif sentence on a white rounded card. Add a layout only when the content has a shape none of these fit |
| Density | At most 6 rules or 8 list items per slide. A longer section continues on the next slide as "名称（1/2）", with a checklist's numbering carrying on |
| Motion | Fade, medium, on every slide. Nothing else animates |
| Don't | Photos or decorative shapes behind content; shadows; a second accent colour; type below 9.8 pt |

OfficeCLI notes (non-ASCII working filenames are rejected, VPN TLS fallbacks, icon and shape numbering) live in `mindful-decks/CLAUDE.md`.

## Governance
Change tokens here first, then bump the apps; never edit a copy inside an app. Add a component only when 2+ apps need it. Update this file and `styles/` in the same commit.
