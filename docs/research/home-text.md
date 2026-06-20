# Phase 4 — Hero Text & Content Analysis (Homepage)

> Source: https://portavia.framer.website/ at 1440×900 viewport

## Hero Section Text Layout

The hero text is split across **two columns** with a centered card image between them:

```
┌─────────────────────────────── 1425px (viewport) ──────────────────────────────┐
│                    ┌────────── 1200px (container) ──────────┐                  │
│                    │                                        │                  │
│                    │  ┌─ 415px ─┐  ┌ 370px ┐  ┌─ 415px ─┐  │                  │
│                    │  │ LEFT    │  │  gap   │  │  RIGHT  │  │                  │
│                    │  │         │  │        │  │         │  │                  │
│  y=339 ───────────────│ Duncan  │──│────────│──│─────────│─────────────────────│
│                    │  │ Robert  │  │        │  │         │  │                  │
│  y=384 ───────────────│ DIGITAL │──│──CARD──│──│DESIGNER │─────────────────────│
│                    │  │ (120px) │  │340×476 │  │ (120px) │  │                  │
│  y=516 ───────────────│─────────│──│────────│──│─────────│─────────────────────│
│  y=527 ───────────────│─────────│──│────────│──│I'm a US │─────────────────────│
│                    │  │         │  │        │  │-based.. │  │                  │
│                    │  └─────────┘  └────────┘  └─────────┘  │                  │
│                    └────────────────────────────────────────┘                  │
└───────────────────────────────────────────────────────────────────────────────┘
```

## Text Elements (Exact Values)

### 1. Name Label — "Duncan Robert"

| Property | Value |
|----------|-------|
| Tag | `<p>` |
| Text | `Duncan Robert` |
| Font family | Antonio, sans-serif |
| Font size | 32px |
| Font weight | 400 (regular) |
| Line height | 41.6px (1.3×) |
| Letter spacing | normal |
| Text transform | uppercase |
| Color | rgb(255, 255, 255) |
| Position | Left column, y: 339px |
| Container | "Text Wrap" (293×42, absolute, z:1, overflow:hidden) |
| Rendered size | 178×42px |

**Note:** The name sits 45px ABOVE the main heading baseline. It's in an `overflow:hidden` container (293×42), suggesting a clip-reveal animation on load.

### 2. Main Heading — "DIGITAL"

| Property | Value |
|----------|-------|
| Tag | `<h1>` |
| Text | `digital` (rendered as `DIGITAL` via text-transform) |
| Font family | Antonio, sans-serif |
| Font size | 120px |
| Font weight | 700 (bold) |
| Line height | 132px (1.1×) |
| Letter spacing | -3.6px (-0.03em) |
| Text transform | uppercase |
| Color | rgb(255, 255, 255) |
| Position | Left column, y: 384px |
| Container | 293×132px |

### 3. Main Heading — "DESIGNER"

| Property | Value |
|----------|-------|
| Tag | `<h1>` |
| Text | `designer` (rendered as `DESIGNER` via text-transform) |
| Font family | Antonio, sans-serif |
| Font size | 120px |
| Font weight | 700 (bold) |
| Line height | 132px (1.1×) |
| Letter spacing | -3.6px (-0.03em) |
| Text transform | uppercase |
| Color | rgb(255, 255, 255) |
| Position | Right column, y: 384px |
| Container | 386×132px |

**Note:** Both heading parts are at the same y-position (384px), creating a single visual line: `DIGITAL [card] DESIGNER`

### 4. Subtitle

| Property | Value |
|----------|-------|
| Tag | `<p>` |
| Text | `I'm a US-based digital designer and Framer developer` |
| Font family | Inter, sans-serif |
| Font size | 18px |
| Font weight | 300 (light) |
| Line height | 27px (1.5×) |
| Letter spacing | normal |
| Text transform | none |
| Color | rgb(255, 255, 255) |
| Position | Right column, y: 527px |
| Container | "Text Wrap" (348×54, absolute, z:1, overflow:hidden) |
| Rendered size | 348×54px (2 lines) |

**Note:** Also in an `overflow:hidden` container, suggesting a clip-reveal animation.

## Text Animation Patterns

The `overflow: hidden` containers around the name label and subtitle strongly suggest **clip-reveal** (mask) animations:

1. **Name label** ("Duncan Robert"): Container is 293×42 with `overflow:hidden`. Text slides up from below on page load.
2. **Subtitle**: Container is 348×54 with `overflow:hidden`. Text slides up from below, slightly delayed.
3. **Main headings** ("DIGITAL", "DESIGNER"): These appear to be in regular flow containers — may use opacity/translate animations instead.

### Expected Animation Sequence (Page Load)

```
t=0.0s  — Page loads, all text invisible (translated below clip containers)
t=0.3s  — "Duncan Robert" slides up into view
t=0.4s  — "DIGITAL" fades/slides in
t=0.5s  — "DESIGNER" fades/slides in
t=0.6s  — Subtitle slides up into view
t=0.8s  — Card image fades in / scales up
t=1.0s  — "Hi" badge appears with rotation
```

(Exact timing needs Phase 7 timeline analysis)

## Service Section Text (y: 900-1800)

```
Container (1200px, centered)
  └─ "Service Column" (600px, flex column, gap: 40px)
       ├─ "Text Wrap" (600×152, flex column, gap: 20px)
       │    ├─ Section heading (600×78)
       │    │    └─ "what I can do for you" — likely same Antonio font, large size
       │    └─ Section body (500×54)
       │         └─ Description paragraph — Inter, 18px, light
       │
       └─ Service accordion items (below text)
            └─ Multiple expandable items with chevron icons (24×24 SVGs)
```

### Service Accordion Structure

- 4-5 expandable service items
- Each has a chevron icon (20×27px SVGs at x:152)
- Expand/collapse icons (30×30px SVGs at x:722)
- Gap between items: ~47px (based on y positions: 1279, 1326, 1373, 1420)

## About Section Text (y: 1800-2700)

```
Container (1200px, centered)
  └─ "About Wrap" (600px, flex column, gap: 40px)
       ├─ "Text Wrap" (600×169, flex column, gap: 10px)
       │    ├─ Section heading (600×78) — likely "About Me"
       │    └─ Section body (500×81) — 3-line paragraph
       │
       ├─ "Number Card Wrap" (600×88, CSS Grid)
       │    └─ Stats cards (e.g., "50+ Projects", "8+ Years")
       │
       ├─ "Contact Info Grid" (600×50, CSS Grid)
       │    └─ Email, phone, location
       │
       └─ "Social Icon Wrap" (180×30, flex, gap: 20px)
            └─ 4 × social icon links (30×30, SVG viewBox 256×256, fill: white)
                 └─ Likely: X/Twitter, Instagram, LinkedIn, Dribbble
```

## Typography Summary for Clone

### Required Font Setup (next/font/google)

```typescript
import { Antonio, Inter } from 'next/font/google';

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-antonio',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-inter',
  display: 'swap',
});
```

### Tailwind Token Mapping

```css
/* Typography tokens */
--font-display: var(--font-antonio);  /* Headings */
--font-body: var(--font-inter);       /* Body text */

/* Size scale (used in hero) */
/* 120px = hero h1 */
/* 32px = name label */
/* 18px = subtitle / body */
/* 16px = nav / buttons */
```

## Content to Replicate

All text content from the hero:
1. Name: "Duncan Robert"
2. Heading word 1: "digital"
3. Heading word 2: "designer"
4. Subtitle: "I'm a US-based digital designer and Framer developer"

(Service and About section text needs extraction in Phase 5-6 or supplementary pass)
