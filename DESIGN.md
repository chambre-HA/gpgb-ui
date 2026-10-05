---
name: 大道大商 Design System
description: Warm paper, warm ink, one orange. A calm community-bulletin look for 大道大商 apps.
colors:
  paper: "#faf6ee"
  paper-deep: "#f1eadb"
  surface: "#ffffff"
  ink: "#221f1a"
  ink-soft: "#6b6458"
  ink-faint: "#766e59"
  border-soft: "#e8e0d1"
  border-strong: "#8f8676"
  accent: "#ff7f20"
  accent-hover: "#d96c1b"
  accent-soft: "#ffebdb"
  accent-text: "#b4540f"
  focus: "#d96c1b"
  on-accent: "#ffffff"
  danger: "#c62828"
  on-danger: "#ffffff"
  warn: "#8a5a20"
  success: "#2e7d4f"
  scrim: "#1c1a16"
  paper-dark: "#1c1a16"
  paper-deep-dark: "#2a2620"
  surface-dark: "#262320"
  ink-dark: "#f1ece1"
  ink-soft-dark: "#b5ac9c"
  ink-faint-dark: "#948c73"
  border-soft-dark: "#3a352c"
  border-strong-dark: "#7d7463"
  accent-dark: "#ff994d"
  accent-hover-dark: "#ffac6e"
  accent-soft-dark: "#664921"
  accent-text-dark: "#ff994d"
  focus-dark: "#ff994d"
  on-accent-dark: "#221f1a"
  on-danger-dark: "#221f1a"
  danger-dark: "#f87171"
  warn-dark: "#e0b06a"
  success-dark: "#6fcf97"
typography:
  display:
    fontFamily: "Noto Serif SC, Songti SC, serif"
    fontSize: "2.25rem to 3rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Noto Serif SC, Songti SC, serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "Noto Sans SC, PingFang SC, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  reading:
    fontFamily: "Noto Sans SC, PingFang SC, system-ui, sans-serif"
    fontSize: "16px"
    lineHeight: 1.85
    letterSpacing: "0.01em"
  reading-wide:
    fontFamily: "Noto Sans SC, PingFang SC, system-ui, sans-serif"
    fontSize: "17px"
    lineHeight: 1.85
    letterSpacing: "0.01em"
  button-lg:
    fontFamily: "Noto Sans SC, PingFang SC, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
  hint:
    fontFamily: "Noto Sans SC, PingFang SC, system-ui, sans-serif"
    fontSize: "12px"
    lineHeight: 1.6
  caption:
    fontFamily: "Noto Sans SC, PingFang SC, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    letterSpacing: "0.08em"
  badge-sm:
    fontFamily: "Noto Sans SC, PingFang SC, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.05em"
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "12px"
  label:
    fontFamily: "Noto Sans SC, PingFang SC, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-ghost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-danger}"
    rounded: "{rounded.pill}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  modal:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "24px"
  badge-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  tab-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.sm}"
---

# Design System: 大道大商

Source: `styles/tokens.css` and `styles/components.css`. Rendered reference: `styleguide/index.html`. Usage guide: `DESIGN_SYSTEM.md`.
Derived from the shipped build, not from intentions. The creative direction below was inferred from the existing apps (greatpath-draw reference) and was not interviewed; confirm or rename it.

## Overview

**Creative North Star: "The Community Bulletin."** A well-kept notice board in a warm room: cream paper, dark ink, a single orange seal of approval. Calm, legible, a little editorial. It is a working tool for volunteers and small teams, so it favours scanability and trust over spectacle.

- Pages are cream (`paper`); content sits on white `surface`; text is warm near-black `ink`. Dark mode is the same room at night: charcoal paper, cream ink, a lighter orange.
- Orange is the only brand colour and is rare by design: primary action, selection, focus, hover. One primary button per view.
- Serif (Noto Serif SC) carries voice, titles and quotes. Sans (Noto Sans SC) does the work, including all long reading.
- Shapes are soft (pills and rounded cards) with hairline borders and faint shadows. Motion is short and quiet.
- Light/dark follows the OS (`prefers-color-scheme`); `data-theme` forces one for previews.

## Colors

Strategy: restrained. Warm neutrals do 90% of the work; orange appears as fills, rings and small accents.

- **Surfaces:** `paper` page, `paper-deep` recessed panels and table hover, `surface` cards/inputs/modals.
- **Text:** `ink` body and headings; `ink-soft` secondary; `ink-faint` hints and placeholders (never on `paper-deep`, 4.2:1 there).
- **Lines:** `border-soft` for decorative dividers and card edges; `border-strong` for anything that must be perceivable as a control (input edges, switch track), 3:1+.
- **Accent family:** `accent` for fills; `accent-hover` for pressed/hover fills and the light-mode focus ring; `accent-soft` for tints and selected-row washes; `accent-text` when orange must read as text or an icon (raw `accent` is only 2.3:1 on paper).
- **On-fill text:** `on-accent` is white in light (the reference look, 2.5:1) and ink in dark (7.8:1; white would be 2.1:1). `on-danger` is white in light mode, ink in dark.
- **Feedback:** `danger`, `warn`, `success` are text/border colours, with dark-mode counterparts. `scrim` is the overlay base and stays dark in both themes.

Rule: no raw hex in app code; no Tailwind red/gray/orange.

## Typography

- **Display** (`font-display`): Noto Serif SC 500, tracking -0.025em, line-height 1.2, balanced wrapping. Page title 36 to 48px; section titles 20 to 24px.
- **Body:** Noto Sans SC 14px / 1.6. Secondary copy in `ink-soft`; hints 12px `ds-hint`.
- **Reading** (`font-answer`): 16px (17px from 640px), line-height 1.85, strict CJK line-breaking. Sans on purpose: serif hairlines break up on phones.
- **Editorial** (`font-editorial`): serif at 1.85 for quotes.
- **Caption** (`ds-caption`): 12px, uppercase, tracking .08em. Short labels only; never for sentences.
- Bilingual labels: Chinese first, English after or beneath. Numerals in tables are tabular.

## Layout

- 4px base. Page gutter 24px; `ds-container` max 72rem. Card padding 16 to 24px; field gap 16px; button icon gap 8px.
- Mobile-first; `sm` (640px) is the phone/tablet switch. On touch (`pointer: coarse`) inputs are 16px (no iOS zoom) and buttons are 44px tall; switches get a 44px hit area; tabs 40px.
- Sections separate with generous vertical space (40px) and a hairline; groups inside stay tight.

## Elevation & Depth

Mostly flat: hairline borders do the separating. Shadows are soft with offset and blur: `sm` at rest (cards, primary button), `md` on hover or raise, `lg` for modals and toasts. Dark mode deepens the shadow alpha. Overlays use `scrim` at 75%, with no blur.

## Shapes

Pill for anything you press or read as a label (buttons, badges, toasts). 16px modals, 12px cards, 8px inputs and tab groups, 6px tab items and skeletons. Images inside cards are clipped to the card radius.

## Components

- **Button:** pill, 14px/500. Variants primary (accent fill, on-accent text), outline, ghost, danger. Sizes sm, md, lg, icon. States: hover (darker fill or accent-soft wash, ghost text goes `accent-text`), press (scale .97), focus (2px `focus` ring, 2px offset), disabled (.45 opacity), loading (`aria-busy`, label hidden, spinner). Icon-only needs `aria-label`.
- **Input / textarea / select:** 8px, `border-strong` edge, hover to `ink-soft`, focus ring in `focus` with matching border, error via `aria-invalid` (danger border and ring) plus a `ds-error` message with `role=alert`. Checkbox and radio are native, `accent-color` orange.
- **Switch:** 40x24 pill, `role=switch`; off track `border-strong`, on track `accent`, white thumb.
- **Card:** surface, 1px `border-soft`, 12px, shadow-sm. Interactive card: border to accent and shadow-md on hover.
- **Badge:** pill; accent, ink, tint, outline, danger tones; small variant 11px uppercase.
- **Tabs / segmented:** `border-soft` group, 6px items, selected = accent fill with on-accent text. Toggle groups use `aria-pressed`, real tabs `aria-selected`.
- **Modal:** surface, 16px, shadow-lg, backdrop-in then modal-in (200ms). Esc and backdrop close; scroll locked; labelled. Footer: outline cancel, then the primary or danger action.
- **Toast:** top-centre pill, ink fill with paper text (danger fill for errors), 3s.
- **Alert:** inline, 8px, accent-soft default, danger and warn outlined. **Empty state:** serif title, hint, one action. **Skeleton** mirrors final layout; **spinner** only for short waits.
- **Table:** hairline rows, 12px/14px cells, tabular numerals, hover `paper-deep`.
- **Header:** hairline bottom, graphic logo (h-6), a 1px vertical hairline divider (20px, `border-strong` at 55%) so the lettering mark and the app name don't read as one phrase, then the serif app title, optional nav, right-aligned actions; skip link to main. The logo flips to light in dark mode, including the manual toggle.
- **Navigation:** pill nav links (current = `accent-soft` wash, `aria-current="page"`); below 768px they move to a left drawer behind a menu button. Breadcrumbs for depth 3+. Step indicator: done = ink check, current = accent dot on a tint, upcoming = outline. Footer: small logo, copyright, links.
- **Menu / popover / tooltip:** surface panel, 1px `border-soft`, 12px, shadow-md, 6px padding; items 8px radius with an `accent-soft` hover/focus wash and an inset `focus` ring; separators `border-soft`; destructive items in `danger`. Tooltip: ink bubble with paper text, 12px, 350ms delay, hidden on touch.
- **Sheet:** bottom sheet (16px top radius, grab handle) or left drawer (320px max); slides 300ms; closed = inert; focus trapped while open.
- **Account:** 32px avatar (accent-soft, initial) opening a menu; workspace switcher is an outline pill with a chevron and a 仅查看 badge for viewers.
- **Layouts:** PageShell (header, 72rem container, footer), CenteredPage (one 400px, 16px-radius card on paper), SidebarLayout (240px sticky aside from 1024px; a bottom sheet on phones).
- **Browser surfaces:** caret and checkboxes orange; selection is `accent-soft`; scrollbar thumbs `border-soft`; links underline at 4px offset on hover.

## Voice

Warm, plain, respectful; Chinese first, English beside or beneath. Buttons are verb + object (保存海报, never 确定). Errors give the cause, then the fix. Empty states say what belongs there plus one action. Chinese uses full-width punctuation and a space before numbers and Latin words. English is sentence case.

## Motion

Calm, physical, short: things settle into place like paper on a board. Tokens: 150ms (hover, press), 200ms (modal, slide, card lift), 350ms (list entry), 560ms (stamp); entrances use `cubic-bezier(.16,1,.3,1)`, the switch thumb settles with `cubic-bezier(.34,1.25,.64,1)`.

The one authored moment is the **seal stamp** (`ds-stamp`): an orange seal with an inner ring that lands from 1.8x scale and -16deg, settles at -6deg, and sends out one fading ring. Used once per view, on a meaningful success. Supporting motion is quiet feedback: staggered list entry (45ms steps, first load only), scroll reveal (CSS scroll timeline, no JS), card lift of 2px, link underline drawing in from the left, a switch thumb with a small spring, and a skeleton sweep. Modals use backdrop-in then modal-in; toasts drop 12px.

Only transform, opacity and shadow animate, never layout. `prefers-reduced-motion` removes all of it.

## Do's and Don'ts

Do
- Use tokens and `ds-*` classes; one primary button per view.
- Use `accent-text` when orange is text; `border-strong` for control edges; `focus` for rings.
- Keep serif for titles and quotes, sans for everything else.
- Give every state (hover, focus, disabled, loading, error, empty) a treatment.

Don't
- Use a menu for a hint, a tooltip for required information, or a modal for a task that needs neither interruption nor protected focus.
- Use orange-fill labels below 14px or below medium weight in light mode, or put white text on orange in dark mode. Orange as text must use `accent-text` (4.5:1 on paper).
- Use `ink-faint` on `paper-deep`, or `border-soft` as the only edge of a form control.
- Add colour beyond the tokens, a second brand colour, gradient text, or side-stripe borders on cards and alerts.
- Use caption (uppercase) styling for sentences, or Unicode glyphs in place of icons (Lucide, 16 to 20px, stroke 2).
- Animate layout, or replay entrances on content people are reading.
- Use the stamp more than once per view, or for anything minor.

## Known exceptions

- White on orange fills in light mode is 2.5:1 (3.4:1 on hover), below AA. Accepted to match greatpath-draw. Mitigation: labels stay 14px+ medium, never the only signal, and focus uses the separate `focus` token.
- Disabled controls (.45 opacity) are exempt from contrast by WCAG.
