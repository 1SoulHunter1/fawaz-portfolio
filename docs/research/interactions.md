# Interaction Inventory — Portavia Clone vs Original

> **Date:** 2026-06-20
> **Original:** https://portavia.framer.website
> **Clone branch:** `portavia-refinement`

---

## Severity Legend
- **Critical** — Interaction is broken or missing entirely
- **Major** — Interaction exists but behavior differs noticeably
- **Minor** — Subtle interaction difference

---

## 1. Navigation Interactions

### 1.1 Navbar Expand / Collapse

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Scroll down → collapse | Nav shrinks to avatar + "Available for work" pill | `useNavbarState` hook triggers collapse | Match |
| Scroll to top → expand | Nav expands with links + Contact button | AnimatePresence re-shows links | Match |
| Layout animation | Smooth width transition | `LayoutGroup` with `duration: 0.7` | Match |
| Blur on enter/exit | Items blur in/out | `filter: blur(4px)` transitions | Match |

### 1.2 Nav Link Hover (3D Flip)

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Hover: text flips | White text rotates up, lime text appears from below | `rotateX: -90` with perspective 1200 | Match |
| Leave: text returns | Lime text rotates away, white returns | `rotateX: 0` | Match |
| Cursor change | Framer cursor variant | `data-cursor="arrow"` on parent | Match |

### 1.3 Contact Button Hover

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Hover: circle fills | Lime circle expands from bottom-left | `motion.div` circle: 20px→180px | Match |
| Text stays readable | Text above circle via z-index | `relative z-10` on text | Match |

### 1.4 Mobile Hamburger

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Tap: menu opens | Dropdown with links | AnimatePresence + MobileMenu component | Match |
| Lines animate | Top/bottom cross, middle fades | `rotate-45` / `-rotate-45` / `opacity-0` | Match |
| Close on link click | Menu closes | `onClick={onClose}` | Match |

---

## 2. Custom Cursor Interactions

### 2.1 Default Cursor

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Native cursor hidden | `cursor: none` globally | `html.cursor-hidden` CSS class | Match |
| Custom dot follows mouse | 16px lime circle with lerp | `requestAnimationFrame` + lerp 0.12 | Match |
| Smooth tracking | Position interpolated | Lerp-based smoothing | Match |
| Touch devices | No custom cursor | `isTouch()` check returns null | Match |
| Window leave | Cursor fades | `mouseleave → opacity: 0` | Match |

### 2.2 Arrow Variant

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Trigger | Hover navbar, CTA links, project cards | `data-cursor="arrow"` attribute | Match |
| Appearance | 70px expanded circle with arrow icon | `EXPANDED_SIZE = 70`, arrow SVG | Match |
| Arrow icon | Diagonal arrow | `-rotate-45` arrow path | Match |
| Transition | Smooth size change | `transition-[width,height,...] duration-300` | Match |

### 2.3 Blend Variant

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Trigger | Hover certain elements | `data-cursor="blend"` attribute | Match |
| Appearance | 16px dot with color-burn blend | `mix-blend-mode: color-burn` | Match |

### 2.4 Image Variant

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Trigger | Hover service accordion items | `data-cursor="image"` + `data-cursor-image` | Match |
| Appearance | 200px rounded rect showing photo | `IMAGE_SIZE = 200`, `borderRadius: 20px` | Match |
| Image source | Per-service unique image | `data-cursor-image={service.image}` | Match |
| Transition | Smooth size + image fade | CSS transitions on width/height + opacity | Match |

---

## 3. Accordion Interactions

### 3.1 Service Accordion (Homepage)

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Click: expand | Shows bullet list of sub-services | `grid-rows-[0fr] → [1fr]` animation | Match |
| Click again: collapse | Hides content | `grid-rows-[1fr] → [0fr]` | Match |
| Multiple open | Multiple items can be open | Independent `useState` per item | Match |
| Chevron rotation | Rotates 180° when open | `rotate-180` class toggle | Match |
| Hover cursor | Image cursor variant | `data-cursor="image"` on button | Match |
| Click target | Full-width button | `w-full` button element | Match |

### 3.2 FAQ Accordion (Homepage)

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Click: expand | Shows answer text | `grid-rows-[0fr] → [1fr]` + opacity | Match |
| Exclusive open | Only one open at a time | `openIndex` single state | Match |
| Chevron | ChevronDown rotates on open | `rotate-180` class toggle | Match |
| Row hover highlight | Background lightens on hover | Not implemented | **Minor** |

### 3.3 Service Accordion (About Page)

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Layout | Static list with all items visible | Services always expanded (no accordion) | **Major** — About page services are always expanded, not accordion |

---

## 4. Form Interactions

### 4.1 Contact Form

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Input fields | Name, Email, Service select, Message textarea | All 4 fields present | Match |
| Focus border | Border changes to lime on focus | `focus:border-[#d0ff71]` | Match |
| Select options | Branding, Web Design, UI/UX | Same 3 options | Match |
| Submit button | Full-width with hover fill | Circle-fill animation on hover | Match |
| Form submission | Framer form handler | `handleSubmit` (no-op) | **Major** — No backend |

---

## 5. Link / Button Interactions

### 5.1 CTA Links ("Browse All", "My Story", etc.)

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Hover: opacity change | Link dims slightly | `hover:opacity-80` | Match |
| Arrow icon | Right arrow next to text | `ArrowRightIcon` component | Match |
| Cursor variant | Custom cursor on hover | `data-cursor="blend"` | Match |
| Circle-fill animation | Original may have subtle fill | Not implemented on CTA links | **Major** |

### 5.2 Project Card Links

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Click: navigate | Goes to project detail | `Link href={/projects/${slug}}` | Match |
| Hover: image zoom | Image scales up | `hover:scale-105` on Image | Match |
| Hover: overlay darkens | Black overlay deepens | `hover:bg-black/50` | Match |
| Cursor | Arrow variant | `data-cursor="arrow"` | Match |

### 5.3 Blog Card Links

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Click: navigate | Goes to blog detail | `Link href={/blogs/${slug}}` | Match |
| Hover: scale up | Card scales slightly | `hover:scale-[1.02]` | Match |
| Hover: image zoom | Image within scales | `hover:scale-105` on Image | Match |
| Cursor | Arrow variant | `data-cursor="arrow"` | Match |
| Border glow | Subtle border animation | Not specifically implemented | **Minor** |

### 5.4 Social Icon Links

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Click: external link | Opens in new tab | `target="_blank"` + `rel="noopener noreferrer"` | Match |
| Hover (about page) | Background changes to lime, icon to black | `hover:bg-[#d0ff71] hover:text-black` | Match |
| Hover (footer) | Subtle opacity change | `hover:opacity-80` | Match |

---

## 6. Scroll Interactions

### 6.1 Smooth Scroll

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Scroll behavior | Lenis smooth scroll (`html.lenis` class) | `SmoothScroll.tsx` wrapper (Lenis installed) | **Major** — May not be fully active |
| Momentum | Smooth deceleration | Depends on Lenis config | Unknown |

### 6.2 Scroll-to-Contact

| Interaction | Original | Clone | Severity |
|-------------|----------|-------|----------|
| Contact link | Scrolls to `#contact` section | `href="#contact"` on Contact link | Match |
| Behavior | Smooth scroll to anchor | Browser default (or Lenis) | Match |

---

## 7. Missing Interactions Summary

| Interaction | Location | Severity | Description |
|-------------|----------|----------|-------------|
| Page transitions | Global | **Major** | No opacity fade between routes |
| CTA circle-fill hover | All CTA links | **Major** | Only on Contact/Submit buttons, not on "Browse All", "My Story", "Load More" |
| Form submission | Contact form | **Major** | No backend/handler — form is a no-op |
| Lenis smooth scroll | Global | **Major** | Installed but potentially not fully active |
| FAQ row hover | Homepage FAQ | **Minor** | No background highlight on row hover |
| Blog card border glow | Blog cards | **Minor** | Using scale instead of border effect |
| About page service accordion | About `/about` | **Major** | Services are always-open lists, not interactive accordion |
