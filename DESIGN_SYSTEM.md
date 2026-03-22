# TrackrAI Design System

Reference guide for the TrackrAI marketing site design tokens, CSS class system, and conventions.

---

## Brand Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-brand-primary` | `#295EFF` | Primary CTA buttons, active states, links, icons |
| `--color-brand-secondary` | `#658BFF` | Hover states, gradients, secondary accents |
| `--color-brand-heading` | `#0F1724` | All headings, dark backgrounds |
| `--color-brand-body` | `#4B5563` | Body copy, secondary text |
| `--color-brand-border` | `#E5E7EB` | Card borders, dividers |
| `--color-brand-alt-bg` | `#F8FAFF` | Alternate section backgrounds |

### Standard gradient
```css
background: linear-gradient(135deg, #295EFF 0%, #658BFF 100%);
```

### Deprecated (do not use)
- `#635BFF` — old purple/indigo primary (fully removed)
- `#4F46E5` — old indigo hover (fully removed)

---

## Typography

### Fonts
- **Headings:** `DM Serif Display` (Google Fonts via `next/font`) — fallback: `Ronzino, Georgia, serif`
- **Body / UI:** `Inter` (Google Fonts via `next/font`) — fallback: `system-ui, sans-serif`

Font variables are set on `<html>` via `app/layout.tsx`:
- `--font-heading` → DM Serif Display
- `--font-body` → Inter

### Tailwind font utilities
```
font-heading   → var(--font-heading)
font-body      → var(--font-body)
```

### CSS component classes
| Class | Size | Use |
|-------|------|-----|
| `.heading-1` | 2.5–4.25rem | Hero headlines |
| `.heading-2` | 2–3rem | Section headlines |
| `.heading-3` | 1.5–2rem | Sub-section headlines |
| `.heading-4` | 1.25rem | Card titles |
| `.body-lg` | 1.125rem | Lead paragraphs |
| `.body-md` | 1rem | Standard body copy |
| `.body-sm` | 0.875rem | Captions, labels |
| `.body-xs` | 0.75rem | Fine print |

---

## Buttons

All buttons are defined as `@layer components` classes in `app/globals.css`.

| Class | Description |
|-------|-------------|
| `.btn` | Base button (standalone, no colour) |
| `.btn-primary` | Filled brand-primary, hover → brand-secondary |
| `.btn-primary-lg` | Same, larger padding + font |
| `.btn-secondary` | Outlined brand-primary, hover fills |
| `.btn-dark` | Filled `brand-heading` (near-black) |
| `.btn-dark-lg` | Same, larger |
| `.btn-ghost` | Transparent, hover bg-gray-50 |

> Tailwind v4 note: `@apply` cannot reference other component-layer classes. Base styles are inlined in each variant.

---

## Cards

| Class | Description |
|-------|-------------|
| `.card` | White, rounded-2xl, brand border, shadow-sm |
| `.card-hover` | card + hover shadow + lift transition |
| `.card-dark` | Dark/glass card (white/5 bg, white/10 border) |
| `.card-padded` | card + p-6 |
| `.card-padded-hover` | card-hover + p-6 |

---

## Section Labels (pill badges)

```jsx
<div className="section-label">FEATURES</div>
<div className="section-label">
  <Icon className="h-4 w-4" />
  Mobile App
</div>
```

| Class | Colours |
|-------|---------|
| `.section-label` | `text-brand-primary` on `bg-brand-primary/10` |
| `.section-label-dark` | `text-brand-secondary` on `bg-brand-secondary/20` |

---

## Section Wrappers

| Class | Description |
|-------|-------------|
| `.section` | `py-24 md:py-32`, white bg |
| `.section-alt` | Same padding, `bg-[#F8FAFF]` |
| `.section-dark` | Same padding, `bg-brand-heading text-white` |
| `.section-gradient` | Same padding, brand gradient bg, white text |
| `.container-inner` | `max-w-7xl mx-auto px-6` |
| `.section-header` | Centred flex column, `mb-16` |
| `.section-header-left` | Left-aligned flex column, `mb-12` |

---

## Form Inputs

```jsx
<label className="input-label">Email</label>
<input className="input" />
```

| Class | Description |
|-------|-------------|
| `.input` | Full-width, brand border, rounded-xl, focus ring |
| `.input-label` | `font-medium text-brand-heading`, 0.875rem |

---

## Gradient Text

```jsx
<span className="text-gradient">with AI</span>
```

Renders `#295EFF → #658BFF` gradient clipped to text.

---

## Navigation

| Class | Description |
|-------|-------------|
| `.nav-link` | Body font, `text-brand-body`, hover `text-brand-heading` |
| `.nav-link-active` | Body font, `text-brand-primary`, subtle bg pill |

---

## Animations

All keyframes and utility classes are defined outside `@layer` in `globals.css` so they are globally available.

| Class | Animation |
|-------|-----------|
| `.animate-float` | Vertical float loop (hero dashboard) |
| `.animate-fade-up` | Fade + slide up (feature cards) |
| `.animate-fade-in` | Opacity fade |
| `.animate-scale-in` | Scale from 0.85 |
| `.animate-slide-in-left/right/bottom` | Directional slide-in |
| `.animate-grow-bar` | Vertical scale from bottom (bar charts) |
| `.animate-fill-progress` | Horizontal scale from left (progress bars) |
| `.animate-pulse-glow` | Subtle brand-primary ring pulse |
| `.animate-bounce-light` | Gentle vertical bounce |
| `.animate-scroll` | Infinite horizontal scroll (testimonials) |
| `.animate-sync-flash` | Brief background flash (sync section) |
| `.sync-beam-right` / `.sync-beam-left` | Animated light beams |
| `.hiw-slide-left/up/right` | How It Works entrance (JS-triggered) |
| `.hiw-visible` | Active state for HIW animations |
| `.hiw-icon-bounce` | Icon bounce on step activation |

---

## Tailwind Custom Utilities

Registered via `@theme` in `globals.css`:

```
bg-brand-primary        → #295EFF
bg-brand-secondary      → #658BFF
bg-brand-heading        → #0F1724
bg-brand-body           → #4B5563
bg-brand-border         → #E5E7EB
bg-brand-alt-bg         → #F8FAFF
text-brand-primary      → #295EFF
border-brand-primary    → #295EFF
... (all token variants)
```

Opacity modifiers work natively: `bg-brand-primary/10`, `border-brand-primary/30`, etc.

---

## Files

| File | Purpose |
|------|---------|
| `app/globals.css` | All tokens (`@theme`), base styles, animations, component classes (`@layer components`) |
| `app/layout.tsx` | Font setup via `next/font/google`, CSS variable injection |
| `app/opengraph-image.tsx` | Dynamic OG image (uses inline styles with `#295EFF`) |
| `components/landing/` | All landing page section components |
| `public/logo-light-theme.svg` | Light background logo |
| `public/logo-dark-theme.svg` | Dark background logo |
| `public/Favicon.svg` | SVG favicon |
| `public/og.png` | Static OG fallback image |
