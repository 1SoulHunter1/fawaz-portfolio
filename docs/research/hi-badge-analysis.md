# Hi Badge Animation — Original Site Analysis

> **Date:** 2026-06-23
> **Source:** https://portavia.framer.website (dark mode, desktop, 1521×674 viewport)
> **Method:** Playwright MutationObserver + DOM inspection + style extraction
> **Recording duration:** 25 seconds (758 polling samples + 39 MutationObserver events)

---

## 1. DOM Structure

```
Badge "Text" (123×123px, #d0ff71, border-radius:99px, overflow:hidden)
│ display:flex, align-items:center, justify-content:center
│ position:relative
│
└── Container div.framer-1t4im-container (62×62px)
    │ position:relative, overflow:visible
    │
    └── "Hand Waving" component (62×62px, overflow:hidden)
        │ display:flex
        │ Framer variant class: framer-v-kr5gm8
        │
        ├── [0] RichTextContainer (62×62px)
        │   │ display:flex, justify-content:center
        │   │ transform: translate3d(0px, Ypx, 0px)  ← animated by Framer
        │   │ transform-origin: 50% 50% 0px
        │   │
        │   └── <p> "Hi"
        │
        └── [1] Lottie Container div.framer-1rl3kp7-container (62×62px)
            │ transform: translate3d(0px, Ypx, 0px)  ← same Y as [0]
            │ transform-origin: 50% 50% 0px
            │
            └── <div style="width:100%;height:100%">
                └── <svg viewBox="0 0 1080 1080" width="1080" height="1080"
                     preserveAspectRatio="xMidYMid meet"
                     style="width:100%;height:100%;
                            transform:translate3d(0,0,0);
                            content-visibility:visible">
                    ├── <defs>
                    │   └── <clipPath id="__lottie_element_2">
                    │       └── <rect 0,0 1080×1080>
                    │
                    └── <g clip-path="url(#__lottie_element_2)">
                        └── <g transform="matrix(a,b,c,d,tx,ty)"  ← Lottie animates this
                             opacity="1" style="display:block">
                            ├── <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                            │   └── <path> (hand body, dark color)
                            └── <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                └── <path> (hand accent, lime color)
```

### Key findings

- Both "Hi" text and Lottie SVG containers **always exist in DOM** — they are never mounted/unmounted.
- They slide in/out of view via `translate3d(0px, Ypx, 0px)` inside the 62×62 `overflow:hidden` container.
- Both containers receive the **same Y translation** simultaneously (carousel moves as a unit).
- The Lottie SVG is rendered by Framer's bundled Lottie player (not `window.lottie` — no global).
- The Lottie player modifies the inner `<g>` element's `transform` attribute with a full `matrix()` value.

---

## 2. "Hi" Text Styling

| Property       | Value                       |
|----------------|-----------------------------|
| Element        | `<p>` (HTML text, NOT SVG)  |
| Font family    | Inter, sans-serif           |
| Font size      | 40px                        |
| Font weight    | 400 (normal)                |
| Line height    | 40px                        |
| Letter spacing | normal                      |
| Color          | rgb(48, 48, 48) = `#303030` |
| Text align     | center                      |

---

## 3. Hand SVG Structure & Colors

- **SVG dimensions:** viewBox `0 0 1080 1080`, width 1080, height 1080
- **preserveAspectRatio:** `xMidYMid meet`
- **Clip path:** `__lottie_element_2` clips to full 1080×1080 rect

### Path fills (dark mode)

| Path   | SVG attribute (fallback for light mode)                                       | Computed fill (dark mode)           |
|--------|-------------------------------------------------------------------------------|-------------------------------------|
| Body   | `var(--token-861b2ae9-..., rgb(255,255,255))` (white fallback)                | `rgb(48, 48, 48)` = `#303030`      |
| Accent | `var(--token-54672876-..., rgb(106,113,223))` (purple fallback)               | `rgb(208, 255, 113)` = `#d0ff71`   |

Dark mode overrides both CSS variables. The hand body renders in the same dark gray as the "Hi" text. The accent renders in the same lime as the badge background (blends in visually).

---

## 4. Carousel Animation (Slide Transitions)

### Mechanism

Framer applies `translate3d(0px, Ypx, 0px)` to **both** children of the "Hand Waving" component simultaneously. The Y value moves them in/out of the 62×62 `overflow:hidden` viewport.

### Measured translateY events (MutationObserver on Hi container `style` attribute)

| Time (ms) | hiY (px)   | Meaning                                              |
|-----------|------------|------------------------------------------------------|
| 367       | 60         | Hi text below visible area → wave visible above      |
| 900       | ~0.35      | Hi returns to center → "Hi" visible                  |
| 4379      | -60        | Hi text above visible area → wave visible below      |
| 4934      | ~-0.29     | Hi returns to center → "Hi" visible                  |
| 6385      | 60         | Hi text below visible area → wave visible above      |
| 6967      | ~0.22      | Hi returns to center → "Hi" visible                  |
| 10397     | -60        | Hi text above visible area → wave visible below      |
| 11002     | ~-0.18     | Hi returns to center → "Hi" visible                  |
| 12415     | 60         | Hi text below visible area → wave visible above      |
| 13000     | ~0.22      | Hi returns to center → "Hi" visible                  |

### Carousel timing analysis

| Phase                     | Duration (ms) | Direction         |
|---------------------------|---------------|-------------------|
| Hi visible (initial)      | ~533          | —                 |
| Wave visible (cycle 1)    | ~533          | slide UP (hiY=-60)|
| Hi visible (long)         | ~3479         | —                 |
| Wave visible (cycle 2)    | ~555          | slide DOWN (hiY=+60)|
| Hi visible (short)        | ~1451         | —                 |
| Wave visible (cycle 3)    | ~582          | slide UP (hiY=-60)|
| Hi visible (long)         | ~3430         | —                 |
| Wave visible (cycle 4)    | ~605          | slide DOWN (hiY=+60)|
| Hi visible (short)        | ~1413         | —                 |

### Derived cycle structure

The carousel alternates slide direction each cycle:
1. **Hi visible** ~3400-3500ms
2. **Slide** → wave visible ~550ms → **slide back**
3. **Hi visible** ~1400-1500ms
4. **Slide** → wave visible ~550ms → **slide back**
5. Repeat from step 1

**Full cycle period:** ~6026ms (measured from 3 complete cycles)

**Slide direction alternation:**
- Odd transitions: hiY goes to **-60** (both items slide UP, wave enters from below)
- Even transitions: hiY goes to **+60** (both items slide DOWN, wave enters from above)

This creates a "ping-pong" effect rather than a one-directional carousel.

**Transition dynamics:** The near-zero return values (~0.35, ~-0.29) suggest a spring-based transition with slight overshoot before settling. Framer likely uses its own spring or `cubic-bezier(0.16, 1, 0.3, 1)` easing.

---

## 5. Lottie Wave Animation (Hand Rotation)

### Mechanism

Framer's bundled Lottie player modifies the `transform` attribute of the inner `<g>` element inside the SVG. The transform is a full `matrix(a,b,c,d,tx,ty)` that encodes both rotation and translation.

The translation component shifts the pivot point during rotation — the hand doesn't rotate around a fixed center but follows an arc, creating a more natural wrist-like wave motion.

### Measured rotation values (MutationObserver on `<g>` transform attribute)

| Time (ms) | Rotation (deg) | tx      | ty      | Notes              |
|-----------|--------------|---------|---------|--------------------|
| 901       | 0.00         | 540.00  | 540.00  | Rest position      |
| 1900      | -5.82        | 500.20  | 542.02  | Wave 1 peak        |
| 2912      | 0.00         | 540.00  | 540.00  | Return to rest     |
| 3912      | -10.32       | 469.65  | 546.36  | Wave 2 peak        |
| 4935      | 0.00         | 540.00  | 540.00  | Return to rest     |
| 5948      | -17.67       | 420.87  | 558.52  | Wave 3 peak        |
| 6968      | 0.00         | 540.00  | 540.00  | Return to rest     |
| 7965      | -19.95       | 406.06  | 563.56  | Wave 4 peak        |
| 8979      | 0.00         | 540.00  | 540.00  | Return to rest     |
| 9979      | -20.97       | 399.51  | 566.01  | Wave 5 peak (max)  |
| 11003     | 0.00         | 540.00  | 540.00  | Return to rest     |
| 11997     | -19.83       | 406.82  | 563.28  | Wave 6 peak        |
| 13001     | 0.00         | 540.00  | 540.00  | Return to rest     |
| 13998     | -19.83       | 406.82  | 563.28  | Wave 7 peak        |

### Lottie rotation characteristics

1. **Oscillation period:** ~2000ms per wave (1000ms to peak, 1000ms return)
2. **Direction:** Always negative rotation (counter-clockwise in screen coordinates = hand waving to the left)
3. **Amplitude ramp-up pattern:**
   - Wave 1: -5.82° (gentle start)
   - Wave 2: -10.32° (building)
   - Wave 3: -17.67° (approaching full)
   - Wave 4: -19.95° (near maximum)
   - Wave 5: -20.97° (peak amplitude)
   - Waves 6+: ~-19.83° (stabilized steady-state)
4. **Rest position:** rotation=0°, translation=(540, 540) = SVG center
5. **Peak translation arc:** tx ranges 399–540; ty ranges 540–566
   - The pivot sweeps an arc as it rotates — wrist-like motion
6. **The Lottie runs continuously** — it does NOT start/stop when the carousel shows/hides the wave
7. **Lottie DOM update rate:** ~1 fps to the `<g>` transform attribute (internal rendering is higher, but DOM commits are sparse)
8. **Rotation extremes over 25s recording:** min=-20.7°, max=+6.7°

### Relationship between rotation and translation

The Lottie matrix encodes a combined rotation + translation. As the rotation angle increases (more negative), the tx decreases (pivot moves left) and ty increases (pivot moves down slightly). This creates an arc-following wrist rotation rather than a rigid pin rotation.

| Rotation | tx   | ty    | Pivot offset from center |
|----------|------|-------|--------------------------|
| 0°       | 540  | 540   | (0, 0) = center          |
| -5.82°   | 500  | 542   | (-40, +2)                |
| -10.32°  | 470  | 546   | (-70, +6)                |
| -17.67°  | 421  | 559   | (-119, +19)              |
| -20.97°  | 400  | 566   | (-140, +26)              |

---

## 6. Badge Positioning

| Property         | Value                    |
|------------------|--------------------------|
| Badge size       | 123×123px                |
| Background       | `rgb(208, 255, 113)` = `#d0ff71` |
| Border radius    | 99px (effectively circular) |
| Overflow         | hidden                   |
| Position         | absolute                 |
| Left offset      | -62.41px from card left  |
| Bottom offset    | -62.76px from card bottom |

The badge center sits at approximately the card's bottom-left corner.

### Card dimensions

| Property | Value  |
|----------|--------|
| Width    | 340px  |
| Height   | 476px  |

---

## 7. Overflow Hierarchy

| Container         | overflow | Size       | Effect                                      |
|-------------------|----------|------------|---------------------------------------------|
| Hand Waving       | hidden   | 62×62px    | Clips carousel items during slide            |
| Badge "Text"      | hidden   | 123×123px  | Clips badge content to circle                |
| Sticky Container  | hidden   | viewport   | Clips entire sticky section                  |

---

## 8. Evidence-Based Answers

### Is "Hi" text or SVG?
**Text.** `<p>` element with CSS styling in Framer `RichTextContainer`. Font: Inter 40px weight 400.

### Is the hand an SVG, Lottie, GIF, or sprite?
**Lottie (rendered as SVG).** SVG has `clipPath id="__lottie_element_2"`. Inner `<g>` transform is modified by Framer's bundled Lottie player (Bodymovin-derived, not exposed as `window.lottie`). ViewBox is 1080×1080.

### Is animation driven by CSS, Framer Motion, SVG animation, or Lottie?
**Two separate systems:**
1. **Carousel slide:** Framer Motion — inline `style` attribute with `translate3d`, spring return
2. **Hand wave rotation:** Lottie — modifies SVG `<g>` `transform` attribute with `matrix()` values

### Are elements mounted/unmounted or simply hidden?
**Simply hidden.** Both containers always exist in DOM. They slide in/out of the 62×62 `overflow:hidden` viewport via `translateY`.

---

## 9. Screenshots

| State        | File                                                   |
|--------------|--------------------------------------------------------|
| Full page    | `docs/design-references/original-full-page.png`        |
| Hero + badge | `docs/design-references/original-hero-with-badge.png`  |

---

## 10. Summary — Key Parameters for Replication

```
BADGE
  size:           123×123px
  background:     #d0ff71
  border-radius:  99px (or 50%)
  overflow:       hidden
  position:       absolute, -62px left, -62px bottom from card

INNER CAROUSEL
  size:           62×62px
  overflow:       hidden
  layout:         flex column, 2 stacked items (Hi text above, wave SVG below)
  animation:      translateY on BOTH items simultaneously
  elements:       always mounted, never removed from DOM

CAROUSEL CYCLE (total ~6000ms)
  hi-visible (long):   ~3400ms
  slide transition:    instant snap to ±60px, spring return
  wave-visible:        ~550ms
  slide back:          spring to ~0px
  hi-visible (short):  ~1400ms
  slide transition:    snap to ±60px (opposite direction)
  wave-visible:        ~550ms
  slide back:          spring to ~0px
  direction:           alternates UP (-60) / DOWN (+60) each cycle

HI TEXT
  element:        <p> HTML text
  font:           Inter, 40px, weight 400
  color:          #303030
  line-height:    40px

WAVE SVG
  viewBox:        0 0 1080 1080
  type:           Lottie-generated inline SVG
  body fill:      #303030 (dark mode)
  accent fill:    #d0ff71 (dark mode)

LOTTIE WAVE ROTATION
  runs:           continuously, independent of visibility
  oscillation:    ~2000ms per cycle (1000ms to peak, 1000ms return)
  direction:      negative rotation only (counter-clockwise wave)
  amplitude:      ramps from ~6° → ~21° over first 5 cycles, then stabilizes ~20°
  rest position:  rotation=0°, pivot at SVG center (540, 540)
  peak position:  rotation≈-21°, pivot shifts to (~400, ~566)
  pivot behavior: sweeps an arc during rotation (wrist-like, not rigid pin)
```
