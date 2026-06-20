# Responsive Behavior — Portavia Clone vs Original

> **Date:** 2026-06-20
> **Original:** https://portavia.framer.website
> **Clone branch:** `portavia-refinement`

---

## Severity Legend
- **Critical** — Layout broken at a breakpoint
- **Major** — Visible layout difference from original
- **Minor** — Subtle spacing or sizing difference

---

## Breakpoints

| Breakpoint | Tailwind Class | Original Behavior | Clone Behavior |
|------------|---------------|-------------------|----------------|
| < 640px (mobile) | `sm:` | Single column, compact | Single column | Match |
| 640–767px (sm) | `md:` | Minor adjustments | Minor adjustments | Match |
| 768–1023px (tablet) | `lg:` | Tablet layout | Tablet layout | Match |
| 1024px+ (desktop) | `lg:` | Full desktop layout | Full desktop layout | Match |

---

## 1. Navbar Responsive Behavior

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop (1024+) | Full nav: avatar + 4 links + Contact button | Same | Match |
| Desktop collapsed | Avatar + "Available for work" pill | Same with AnimatePresence | Match |
| Mobile (< 1024) | Avatar + pill + hamburger | Same | Match |
| Mobile menu | Dropdown with links | AnimatePresence dropdown | Match |
| Navbar width | Auto-fit content | Auto-fit content | Match |
| Navbar position | Fixed, centered, top: 20px | `fixed top-4 left-1/2` | Match |

---

## 2. Homepage Responsive Behavior

### 2.1 Hero Section

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | "DIGITAL" left + card center + "DESIGNER" right | Two columns with 370px gap | Match |
| Mobile | "DIGITAL" + static card + "DESIGNER" stacked | `flex-col` with mobile card | Match |
| Card (desktop) | 340×476px flipping in sticky layer | `hidden lg:flex` sticky card | Match |
| Card (mobile) | Static 240×340px image | `lg:hidden` static image | Match |
| Badge (mobile) | 80px with wave icon | `h-[80px] w-[80px]` | Match |
| H1 font size (desktop) | 120px | `lg:text-[120px]` | Match |
| H1 font size (mobile) | 60px | `text-[60px]` | Match |

### 2.2 Services Section

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | Max-width 600px accordion | `max-w-[600px]` | Match |
| Mobile | Full-width accordion | Full-width | Match |
| H3 font (desktop) | 32px | `lg:text-[32px]` | Match |
| H3 font (mobile) | 24px | `text-[24px]` | Match |

### 2.3 About Panel

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | Stat cards: 3 columns | `lg:grid-cols-3` | Match |
| Mobile | Stat cards: 2 columns | `grid-cols-2` | Match |
| Social icons | 30×30px in row | `h-[30px] w-[30px]` flex row | Match |
| Contact info | 2-column grid | `grid-cols-2` | Match |

### 2.4 Projects Section

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | Sticky stacking cards, full width | `sticky top-[80px]` | Match |
| Mobile | Sticky cards still work | Same sticky behavior | Match |
| Image aspect | 3:2 ratio | `aspect-[3/2]` | Match |

### 2.5 Testimonials Section

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | 3-column grid: 360px × 3 | `md:grid-cols-3` | Match |
| Mobile | Single column stack | Default `flex-col` | Match |
| Gap | 20px | `gap-5` | Match |

### 2.6 FAQ Section

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | 2-column: title (440px sticky) + FAQ list (600px) | `md:grid-cols-[1fr_1.5fr]` | Match |
| Desktop sticky | Title column is sticky at top: 100px | Not sticky | **Minor** |
| Mobile | Single column, title above FAQ | Grid collapses to single col | Match |

### 2.7 Blog Section

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | 2 blog cards side by side | `md:grid-cols-2` | Match |
| Mobile | Single column stack | Default column | Match |
| Blog image | 16:9 aspect | `aspect-[16/9]` | Match |

### 2.8 Contact Section

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | 2 columns: portrait left + form right | `md:grid-cols-2` | Match |
| Mobile | Single column: form only or stacked | Grid collapses | Match |
| Portrait image | 340×476px | `h-[476px] w-[340px]` | Match |

### 2.9 Footer

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | 3-section row: contact, socials, credits | `md:flex-row md:justify-between` | Match |
| Mobile | Stacked sections | `flex-col` | Match |
| Background | `#d0ff71` (lime) | `bg-[#d0ff71]` | Match |

---

## 3. About Page Responsive Behavior

### 3.1 Sticky Scroll Layout

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | 2 columns: Content 560px + Sticky images 640px | `w-[560px]` + `flex-1` | **Major** — Right col not fixed 640px |
| Mobile | Content only, single static image | `lg:hidden` with static image | Match |
| Card images (desktop) | 4 stacked in sticky container | 4 images in `motion.div` | Match |
| Card images (mobile) | Single hero image | One `Image` in `lg:hidden` div | Match |

### 3.2 Services (About Page)

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | Accordion with expand/collapse | Static expanded lists | **Major** |
| Mobile | Same accordion behavior | Static lists | **Major** |

### 3.3 Experience Timeline

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | Row: role/company left, years right | `sm:flex-row sm:justify-between` | Match |
| Mobile | Stacked: role, company, years | `flex-col` | Match |

### 3.4 Tech Stack Grid

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | 5 columns | `lg:grid-cols-5` | Match |
| Tablet | 3 columns | `md:grid-cols-3` | Match |
| Mobile | 2 columns | `sm:grid-cols-2` | Match |
| Card layout | Icon + name + description | Same structure | Match |

### 3.5 Process Grid

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | 2-column grid, some cards span 2 cols | `md:grid-cols-2` + `md:col-span-2` | Match |
| Mobile | Single column stack | Default | Match |
| Wide card | Horizontal layout with image | `md:flex-row md:items-center` | Match |
| Process card size | 380px height (original) | Auto height (based on content) | **Minor** |

---

## 4. Projects Page Responsive Behavior

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | Sticky featured cards + 2-col compact grid | Same layout | Match |
| Mobile | Full-width cards, single column compact | Same responsive behavior | Match |
| Featured card | 1120×747px at desktop | `aspect-[3/2]` at max-w-[1120px] | Match |
| Compact card | 540×320px image + text below | Responsive grid card | Match |
| H1 (desktop) | 120px | `lg:text-[120px]` | Match |
| H1 (mobile) | ~56px | `text-[56px]` | Match |

---

## 5. Blogs Page Responsive Behavior

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | Pinned post full-width + 2-col grid below | Same layout | Match |
| Mobile | Single column, all cards stacked | Grid collapses | Match |
| Pinned image | 1120×500px | Full-width with aspect ratio | Match |
| Card image | 540×320px | Responsive | Match |
| H1 (desktop) | 120px | `lg:text-[120px]` | Match |
| H1 (mobile) | 44px | `text-[44px]` | Match |

---

## 6. Project/Blog Detail Pages Responsive Behavior

| Viewport | Original | Clone | Severity |
|----------|----------|-------|----------|
| Desktop | 1000px max-width content | `max-w-[1000px]` | Match |
| Mobile | Full-width with padding | `px-6` | Match |
| Cover image | 1000×600px (3:2) | `aspect-[3/2]` at max-w | Match |
| Metadata grid | 4 columns | `md:grid-cols-4` / `grid-cols-2` on mobile | Match |
| Content images | Side-by-side (480px each) or full-width | `ContentBlock` component | Match |
| More projects | 2-column compact grid | `md:grid-cols-2` | Match |

---

## 7. Summary

| Category | Issues Found | Severity |
|----------|-------------|----------|
| Navbar | 0 | — |
| Homepage sections | 1 (FAQ sticky) | Minor |
| About page | 2 (sticky col width, services accordion) | Major |
| Projects page | 0 | — |
| Blogs page | 0 | — |
| Detail pages | 0 | — |
| Footer | 0 | — |
| **Total** | **3** | 1 Major, 1 Major, 1 Minor |
