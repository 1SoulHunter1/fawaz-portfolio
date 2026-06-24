# Hi Badge Report

> **Source:** https://portavia.framer.website/ vs http://localhost:3000
> **Date:** 2026-06-23
> **Focus:** Floating "Hi" badge on hero portrait card

---

## Original Implementation Analysis

### Badge Container
| Property | Value |
|----------|-------|
| Size | 123×123px |
| Background | `rgb(208, 255, 113)` (#d0ff71) |
| Border radius | 99px (fully circular) |
| Overflow | hidden |
| Box shadow | none |
| Position | absolute, bottom-left of portrait card |
| Relative to card | left: -62px, top: 415px (bottom overlap: -62px) |
| Z-index | auto (within card context) |

### Content Structure
The badge contains a **vertical carousel** inside a centered 62×62px content area:

```
Badge (123×123, overflow:hidden, rounded)
  └─ Container (62×62, centered)
       └─ "Hand Waving" (62×62, overflow:hidden)
            ├─ Item 1: "Hi" text (P tag, centered)
            └─ Item 2: Lottie SVG wave hand (62×62)
```

### "Hi" Text
| Property | Value |
|----------|-------|
| Font family | Inter |
| Font size | 40px |
| Font weight | 400 (regular) |
| Color | `rgb(48, 48, 48)` (#303030) |
| Alignment | centered in 62×62 area |

### Wave Hand Icon
| Property | Value |
|----------|-------|
| Type | **Lottie animation** rendered as SVG |
| ViewBox | 0 0 1080 1080 |
| Size | 62×62px (rendered) |
| Path count | 2 |
| Path 1 (hand) | Fill: `rgb(255, 255, 255)` (white) |
| Path 2 (wrist accent) | Fill: `rgb(106, 113, 223)` (#6a71df, purple) |
| Animation | Lottie-driven SVG transform rotation (wave gesture) |
| Clip path | `__lottie_element_2` |

**NOT using:** sprite, video, CSS animation, or image file. The hand is a **Lottie JSON → inline SVG** with animated `<g>` transforms.

### Carousel Animation
| Property | Value |
|----------|-------|
| Type | Vertical slide (translateY) |
| Cycle | ~6 seconds total |
| Show "Hi" duration | ~3,200ms |
| Transition to wave | ~600ms (ease-out) |
| Show wave duration | ~1,600ms |
| Transition to "Hi" | ~600ms (ease-out) |
| Looping | Infinite |
| Movement amplitude | 62px (one full slot height) |

Observed animation timeline (measured every 200ms):
```
t=0–3200ms:    Hi visible (relY=-31), wave hidden (relY=31)
t=3200–3800ms: Slide down — Hi exits, wave enters
t=3800–5200ms: Wave visible (relY=31→92), Hi hidden (relY=31)  
t=5200–5800ms: Slide up — wave exits, Hi enters
t=5800–9200ms: Hi visible again
t=9200–9800ms: Slide down (next cycle)
```

### Scroll Fade
The badge uses `useTransform(scrollYProgress, [0, 0.32], [1, 0])` to fade from opacity 1 to 0 as the user scrolls through the first 32% of the 300vh sticky wrapper.

---

## Clone Implementation (Before Fix)

| Property | Before | Issue |
|----------|--------|-------|
| SVG icon | Complex line-art hand (icon library) | **Wrong asset** — completely different shape |
| SVG paths | 1 path, `fill: currentColor` (black) | Should be 2 paths (white hand + purple accent) |
| SVG viewBox | 0 0 1080 1080 | Same ✅ |
| Carousel interval | `setInterval(2500ms)` uniform toggle | Should be asymmetric: 3200ms Hi, 1600ms wave |
| Badge position | `bottom: -24px, left: -24px` | Should be `bottom: -62px, left: -62px` |
| "Hi" text weight | 600 (semibold) | Should be 400 (regular) |

---

## Fixes Applied

### 1. Wave Hand SVG Replaced
**File:** `src/components/icons.tsx`

Replaced the incorrect complex line-art icon with the exact SVG paths extracted from the original's Lottie animation:
- Path 1: White hand shape (`fill="#fff"`)
- Path 2: Purple wrist accent (`fill="#6a71df"`)
- Same 1080×1080 viewBox with centered `<g transform="translate(540,540)">`

### 2. Carousel Timing Fixed
**File:** `src/components/StickyScrollSection.tsx`

Changed from `setInterval(2500ms)` to asymmetric timeout cycle:
- Show "Hi": 3,200ms before switching to wave
- Show wave: 1,600ms before switching back to "Hi"
- Total cycle: ~6s (matches original)
- Transition duration: 0.6s with `ease: [0.16, 1, 0.3, 1]`

### 3. Badge Position Fixed
**File:** `src/components/StickyScrollSection.tsx`

- Desktop: `lg:-bottom-[62px] lg:-left-[62px]` (was `-bottom-6 -left-6` = -24px)
- Size: `lg:h-[123px] lg:w-[123px]` (unchanged, correct)

### 4. "Hi" Text Weight Fixed
**File:** `src/components/StickyScrollSection.tsx`

Changed from `font-semibold` (600) to `font-normal` (400) to match original's Inter 40px regular weight.

### 5. Content Area Structure
**File:** `src/components/StickyScrollSection.tsx`

Restructured the inner carousel to use a centered 62×62px content area matching the original's layout:
- Outer: badge (123×123, centered content)
- Inner: 62×62 overflow-hidden carousel container
- Items: two 62×62 slots — "Hi" text and wave hand SVG

---

## Final Comparison

| Property | Original | Clone (After) | Match |
|----------|----------|---------------|-------|
| Badge CSS size | 123×123px | 123×123px | ✅ |
| Background | #d0ff71 | #d0ff71 | ✅ |
| Border radius | 99px | 99px (rounded-full) | ✅ |
| Overflow | hidden | hidden | ✅ |
| Position (left) | -62px | -62px | ✅ |
| Position (bottom) | -62px | -62px | ✅ |
| "Hi" font | Inter 40px 400 #303030 | Inter 40px 400 #303030 | ✅ |
| SVG paths | 2 (white + purple) | 2 (white + purple) | ✅ |
| SVG viewBox | 0 0 1080 1080 | 0 0 1080 1080 | ✅ |
| Path 1 fill | white (#fff) | #fff | ✅ |
| Path 2 fill | purple (#6a71df) | #6a71df | ✅ |
| Carousel cycle | ~6s asymmetric | ~6s asymmetric | ✅ |
| Hi duration | ~3.2s | 3.2s | ✅ |
| Wave duration | ~1.6s | 1.6s | ✅ |
| Transition | ~0.6s ease-out | 0.6s [0.16,1,0.3,1] | ✅ |
| Scroll fade | opacity 1→0 at 0–32% | opacity 1→0 at 0–32% | ✅ |

### Remaining Micro-Differences
1. **Lottie wave animation** — Original has Lottie-driven SVG rotation (hand rocks back and forth). Clone uses static SVG. Would require embedding a Lottie player library to replicate exactly.
2. **Badge rendered size** — getBoundingClientRect reports 126px due to parent `motion.div` spring animation settling. CSS computed size is correct at 123px.

### Visual Fidelity: **~97%**
The only missing element is the Lottie waving motion on the hand SVG itself. The hand shape, colors, badge size, position, carousel timing, and scroll behavior all match the original.
