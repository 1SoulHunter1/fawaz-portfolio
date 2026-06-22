# About Page — Forensic Comparison

> **Date:** 2026-06-21
> **Original viewport:** 1536×730
> **Clone viewport:** 1536×674
> **Original page height:** 6145px
> **Clone page height:** 6119px

---

## 1. Background System

| Property | Original | Clone | Diff |
|----------|----------|-------|------|
| Body background | `rgb(26, 26, 27)` | `rgb(26, 26, 27)` | ✅ Match |
| Noise overlay | Animated GIF, fixed, full viewport | **None** | ❌ Missing |
| Noise blend mode | `color-dodge` | — | ❌ |
| Noise opacity | `0.12` | — | ❌ |
| Noise image | `AVsssNQRylEZc5orEWvz8Q1wQT4.gif`, size 250px, repeat | — | ❌ |
| Noise z-index | `0` (behind content) | — | ❌ |
| Noise pointer-events | `auto` (but doesn't block) | — | ❌ |

**Severity:** HIGH — The grain gives the page its cinematic feel.

---

## 2. Hero Section

| Property | Original | Clone | Diff |
|----------|----------|-------|------|
| Section height | 730px (viewport) | 706px | -24px |
| Padding top to content | 133px | 176px (pt-44) | +43px |
| Content wrap width | 480px | Unconstrained (fills 560px) | +80px |
| H1 font-size | 120px | 120px | ✅ |
| H1 font-weight | 700 | 700 | ✅ |
| H1 line-height | 132px | 120px | -12px |
| H1 letter-spacing | -3.6px | -3.6px | ✅ |
| H1 font-family | Antonio | Antonio | ✅ |
| H3 "Duncan Robert" font-size | 32px | 32px | ✅ |
| H3 line-height | 41.6px | 48px | +6.4px |
| H3 margin-top | 0 (flex gap) | 24px | ❌ gap vs mt |
| First paragraph color | white | white | ✅ |
| Second paragraph color | white | `#b5b5b5` (gray) | ❌ |
| Social icon size | 30×30 | 40×40 | +10px |
| Social icon bg | transparent | `#303030` | ❌ |
| Social icon gap | 20px | 12px (gap-3) | -8px |
| Social icon wrap width | 180px | ~180px | ≈ |

---

## 3. Sticky Scroll Architecture

| Property | Original | Clone | Diff |
|----------|----------|-------|------|
| Sticky wrap width | 640px | 640px | ✅ |
| Sticky wrap padding | `0 40px` | `px-10` (40px) | ✅ |
| Sticky wrap display | flex center center | flex justify-center, pt offset | ≈ |
| Sticky container width | 560px | — | — |
| Sticky container overflow | hidden | — | — |
| Card viewport width | 340px | 340px | ✅ |
| Card viewport height | 476px | 476px | ✅ |
| Cards wrap transform | `matrix3d(1,0,0,0, 0,1,0,0, 0.14,0,1,-0.0008, -170,0,0,1)` | plain translateY | ❌ 3D perspective missing |
| Cards wrap position | absolute | relative (flex col) | ≈ functionally similar |

---

## 4. Section Heights Comparison

| Section | Original | Clone | Diff |
|---------|----------|-------|------|
| Hero | 730px | 706px | -24px |
| Services | 842px | 840px | -2px ✅ |
| Experience | 892px | 895px | +3px ✅ |
| Tech Stack | 976px | 986px | +10px ≈ |
| Process | 1639px | 1612px | -27px ≈ |
| Contact | 861px | 874px | +13px ≈ |
| Footer | 205px | ~207px | ≈ |

---

## 5. Services Section

| Property | Original | Clone | Diff |
|----------|----------|-------|------|
| Accordion item height | 83px (with border) | ~73px | -10px |
| Accordion item width | 480px | fills section | ≈ |
| Border | top border #333 | top border #333 | ✅ |
| Number + title font | 32px Antonio normal | 32px Antonio normal | ✅ |

---

## 6. Experience Section

| Property | Original | Clone | Diff |
|----------|----------|-------|------|
| Timeline row height | 84px | ~80px | -4px |
| Company name color | `#d0ff71` (lime) | `#d0ff71` | ✅ |
| Role font | 32px Antonio normal | 32px Antonio normal | ✅ |

---

## 7. Tech Stack Section

| Property | Original | Clone | Diff |
|----------|----------|-------|------|
| Card height | 105px | ~auto | — |
| Card width | 480px | fills section | ≈ |
| Card gap | 1px | 0 | -1px |
| Logo size | Varies (~56px) | 56px | ✅ |

---

## 8. Process Section

| Property | Original | Clone | Diff |
|----------|----------|-------|------|
| Grid item size | 360×380px | auto×380px | ≈ |
| Grid gap | 20px | 20px (gap-5) | ✅ |
| Card col-span 2 | Item 03 spans 2 cols | Item 03 spans 2 cols | ✅ |

---

## 9. Contact Section

| Property | Original | Clone | Diff |
|----------|----------|-------|------|
| Submit button width | 145px (fit-content) | 100% (full width) | ❌ |
| Submit button height | 50px | ~64px | +14px |
| Wave circle | 123×123, has "Hi" text | 100×100, has emoji 👋 | ❌ size + content |
| Portrait position | offset from contact text | Left aligned | ≈ |

---

## 10. Priority Ranking

1. **CRITICAL:** Noise/grain background overlay (affects entire page feel)
2. **HIGH:** Hero H1 line-height (132px vs 120px)
3. **HIGH:** Second paragraph color (white vs gray)
4. **HIGH:** Social icon size and style (30×30 plain vs 40×40 with bg)
5. **HIGH:** Hero section height (should be viewport height)
6. **HIGH:** Submit button width (fit-content vs full-width)
7. **MEDIUM:** Hero content width constraint (480px)
8. **MEDIUM:** Hero padding-top (133px vs 176px)
9. **MEDIUM:** Contact wave circle size (123px vs 100px)
10. **LOW:** H3 line-height (41.6px vs 48px)
11. **LOW:** Sticky cards 3D perspective transform
12. **LOW:** Accordion item height fine-tuning
