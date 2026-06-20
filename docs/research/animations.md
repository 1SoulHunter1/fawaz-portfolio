# Animation Inventory — Portavia Clone vs Original

> **Date:** 2026-06-20
> **Original:** https://portavia.framer.website
> **Clone branch:** `portavia-refinement`

---

## Severity Legend
- **Critical** — Breaks core UX or is immediately noticeable as wrong
- **Major** — Visible difference from original, affects perceived quality
- **Minor** — Subtle difference, only noticeable on close comparison

---

## 1. Scroll-Driven Animations

### 1.1 Homepage Sticky Scroll + 3D Card Flip

| Property | Original | Clone | Status |
|----------|----------|-------|--------|
| Wrapper height | OutterWraper 2196px (~3x viewport) | `h-[300vh]` | Match |
| Sticky layer | z-[2], 100vh sticky | `relative z-[2]`, `sticky top-0 h-screen` | Match |
| Content layer | z-[1], absolute inset | `absolute inset-0 z-[1]` | Match |
| Card rotateY | 0 → 360° across scroll | `useTransform [0, 1] → [0, 360]` | Match |
| Card translateX | 0 → 340px (mid-scroll hold) | `useTransform [0, 0.5, 1] → [0, 340, 340]` | Match |
| Card scale | 1 → 0.9 → 1 | `useTransform [0, 0.5, 1] → [1, 0.9, 1]` | Match |
| Card rotateZ | 0 → 10° → 5° | `useTransform [0, 0.5, 1] → [0, 10, 5]` | Match |
| Spring physics | Smooth interpolation | `stiffness: 300, damping: 35` | Match |
| Card dimensions | 340 × 476px | `lg:h-[476px] lg:w-[340px]` | Match |
| Card corner radius | 20px | `rounded-[20px]` | Match |
| Perspective | ~1200px | `perspective: 1200` | Match |
| Backface visibility | Front hidden, back visible | Correct per-face | Match |
| Desktop only | Card hidden on mobile | `hidden lg:flex` | Match |

**Status: Fully implemented**

### 1.2 Badge Carousel (Hi / Wave)

| Property | Original | Clone | Severity |
|----------|----------|-------|----------|
| Circle size | 123px | 80px base / 120px lg | **Major** — ~3px smaller at lg |
| Background color | `#d0ff71` (lime) | `bg-[#d0ff71]` | Match |
| "Hi" text | 40px Inter, semibold, `#303030` | `text-[40px] font-semibold text-[#303030]` (lg) | Match |
| Wave icon | Lottie animated waving hand | Static SVG `WaveHandIcon` | **Minor** — No Lottie animation on the hand itself |
| Carousel mechanism | `translateY` between two slots | `motion.div animate y: 0%/-50%` | Match |
| Cycle interval | Auto (unknown exact timing) | 2500ms `setInterval` | Match |
| Scroll fade | Badge fades on scroll | `useTransform scrollYProgress [0,0.15] → [1,0]` | Match |
| Entry animation | Pop-in | `scale:0→1, rotate:-30→0, delay:0.8s` | Match |
| Badge position | `translate3d(-60, -60, 30)` | `-bottom-6 -left-6` (lg) | Match |
| 3D layer | z: 30 in transform | `style={{ z: 30 }}` | Match |

### 1.3 About Page Sticky Scroll (Image Stack)

| Property | Original | Clone | Severity |
|----------|----------|-------|----------|
| Architecture | Two-column: Content 560px + Sticky Wrap 640px | `w-[560px]` left + `flex-1` right | **Major** — Right column width not fixed at 640px |
| Sticky element | `Sticky Wrap` at `top: 0px` | `sticky top-0 h-screen` | Match |
| Card stack | 4 cards × 340×476px = 1904px total | 4 `Image` components, 340×476 | Match |
| Scroll-driven translateY | Cards shift vertically with scroll | `useTransform + useSpring` | Match |
| Spring config | Unknown | `stiffness: 300, damping: 40` | Estimated |
| Desktop only | Sticky hidden on mobile | `hidden lg:block` / `lg:hidden` | Match |
| Mobile fallback | Shows first image only | Single static image | Match |
| Card images | qrxY8..., MZuXa..., yb0fd..., VRQgk... | Same 4 image paths | Match |

### 1.4 Project Cards Stacking

| Property | Original | Clone | Status |
|----------|----------|-------|--------|
| Sticky behavior | Each card sticks at scroll position | `sticky top-[80px]` | Match |
| Card dimensions | 1120 × 747px | `aspect-[3/2]` at max-w 1120px | Match |
| Stack overlap | ~120px between sticky tops | `paddingBottom: 120px` | Match |
| Card count | 4 featured | 4 featured | Match |

---

## 2. Entrance Animations (Scroll Reveal)

### 2.1 ScrollReveal

| Property | Original (Framer appear) | Clone | Status |
|----------|--------------------------|-------|--------|
| Trigger | Scroll into view | `useInView` with `once: true` | Match |
| Direction | Fade up (opacity + translateY) | `opacity: 0→1, y: 40→0` | Match |
| Easing | Framer spring/ease | `[0.16, 1, 0.3, 1]` (ease-out expo) | Match |
| Duration | 600–800ms | 600ms default | Match |
| Threshold | ~30% visible | `amount: 0.3` | Match |

### 2.2 StaggerReveal

| Property | Original | Clone | Status |
|----------|----------|-------|--------|
| Stagger delay | Sequential per child | `staggerDelay` prop (0.08–0.15s) | Match |
| Per-child motion | Each child animates independently | `motion.div` wrapping each child | Match |

---

## 3. Component Animations

### 3.1 Navbar Transitions

| Property | Original | Clone | Status |
|----------|----------|-------|--------|
| Layout animation | Smooth width/height change | `LayoutGroup` + `motion.nav layout` | Match |
| Duration | ~700ms | `duration: 0.7` | Match |
| Easing | Expo ease-out | `[0.16, 1, 0.3, 1]` | Match |
| Link enter/exit | Fade + blur | `opacity + filter: blur(4px)` | Match |
| Pill enter/exit | Fade + blur | Same AnimatePresence | Match |

### 3.2 Nav Link 3D Flip

| Property | Original | Clone | Status |
|----------|----------|-------|--------|
| Hover effect | Text rotates on X axis | `rotateX: 0 → -90` | Match |
| Perspective | 3D depth | `transformPerspective: 1200` | Match |
| Second label | Lime green text underneath | `text-[rgb(208,255,113)]` rotated 90deg | Match |
| Duration | ~350ms | `duration: 0.35` | Match |

### 3.3 Contact Button Circle Fill

| Property | Original | Clone | Status |
|----------|----------|-------|--------|
| Circle expand | From bottom-left to cover | `motion.div` with size 20→180 | Match |
| Background | `#d0ff71` | `bg-[#d0ff71]` | Match |
| Duration | ~500ms | `duration: 0.5` | Match |

### 3.4 Available For Work Pulse

| Property | Original | Clone | Status |
|----------|----------|-------|--------|
| Dot | Green (#0bde66) | `bg-[rgb(11,222,102)]` | Match |
| Glow | Blurred halo pulsing | `blur(8px)`, `opacity [0.3, 0.6, 0.3]` | Match |
| Cycle | 2s infinite | `duration: 2, repeat: Infinity` | Match |

### 3.5 CountUp Numbers

| Property | Original | Clone | Status |
|----------|----------|-------|--------|
| Number animation | Counts from 0 to target | `CountUp` component | Match |
| Trigger | On viewport entry | `useInView` | Match |
| Suffix support | "%" / "+" | suffix prop | Match |

### 3.6 Service Accordion

| Property | Original | Clone | Status |
|----------|----------|-------|--------|
| Expand/collapse | Smooth height | `grid-rows-[0fr] → [1fr]` transition | Match |
| Chevron rotation | 180° on open | `rotate-180` with transition | Match |
| Stagger entrance | Per-item delay | `useInView` + `delay: index * 0.1` | Match |

---

## 4. Missing Animations (Not Implemented)

| Animation | Where | Severity | Description |
|-----------|-------|----------|-------------|
| Page transitions | Global | **Major** | Original has opacity fade between routes (~200ms). Clone does hard navigation. |
| Lenis smooth scroll | Global | **Major** | Original has `html.lenis` class and smooth scroll behavior. Clone has `SmoothScroll.tsx` wrapper but Lenis may not be fully active. |
| CTA button circle-fill | Multiple CTA links | **Major** | Only implemented on "Submit" and "Contact" buttons. Missing on "Browse All Projects", "Browse All Insights", "Load More", "My Story" links. |
| Badge Lottie wave | Homepage badge | **Minor** | Static SVG instead of animated Lottie waving hand. |
| Project card image zoom | `/projects` page | **Minor** | Homepage has `hover:scale-105` on project images but effect could be stronger. |
| FAQ row hover | Homepage FAQ | **Minor** | No background highlight on FAQ row hover. |
| Social icon hover fill | Footer + about page | **Minor** | Clone uses opacity transition; original may use color fill. |
| Blog card hover glow | Homepage blog section | **Minor** | Clone uses `hover:scale-[1.02]`; may not match original's border glow. |
| Noise overlay loop | Global | **Minor** | Using `noise.gif` background; may differ from original's rendering. |
