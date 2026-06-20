# Contact Section — Complete Reverse-Engineering Specification

> **Source:** https://portavia.framer.website/
> **Date:** 2026-06-20
> **Viewport:** 1536 × 674 (desktop)
> **Method:** Chrome DevTools MCP — computed styles, DOM hierarchy, pseudo-element inspection, CSS variable resolution, focus state testing

---

## 1. Section Layout

### Section Container

| Property | Value |
|----------|-------|
| Tag | `<section id="contact">` |
| `data-framer-name` | `"Contact"` |
| Width | Full viewport (1520.8px at 1536 viewport) |
| Height | 861.2px |
| Background | Transparent (inherits page dark bg `#1a1a1b`) |
| Display | `flex` |
| Justify-content | `center` |
| Align-items | `center` |
| Overflow | `hidden` |
| Border | None |
| Position Y | 8732px from page top |

### Inner Container

| Property | Value |
|----------|-------|
| `data-framer-name` | `"Container"` |
| Width | 1200px |
| Max-width | 1200px |
| Padding | `120px 40px` |
| Display | `flex` |
| Flex-direction | `row` |
| Align-items | `center` |
| Gap | `0px` (columns sized by flex basis) |

### Two-Column Layout

| Column | `data-framer-name` | Width | Alignment |
|--------|--------------------|-------|-----------|
| Left | `"Avatar Column"` | 560px | `center` (both axes) |
| Right | `"Contact Column"` | 560px | `flex-start` horizontally, `center` vertically |

Both columns are vertically centered at Y=9163 (midpoint) — the container's `align-items: center` ensures this.

### Spacing Between Sections

| Boundary | Value |
|----------|-------|
| Blog section bottom | 8732px |
| Contact section top | 8732px |
| Contact section bottom | 9593px |
| Footer top | 9593px |
| Separator | None (sections are flush, no borders or gaps) |

---

## 2. Avatar Column

### 2.1 Avatar Image

| Property | Value |
|----------|-------|
| `data-framer-name` | `"Avatar Image"` |
| Size | 340 × 476px |
| Border-radius | `20px` |
| Object-fit | `cover` |
| Source | `qrxY8NagVO40NBrdhFEGgFR3PYY.jpg` (same front portrait used in hero) |

The image is wrapped in 3 nested divs with `border-radius: 20px` and the innermost has `overflow: clip`.

### 2.2 Avatar Wrap (3D Container)

| Property | Value |
|----------|-------|
| `data-framer-name` | `"Avatar Wrap"` |
| Position | `relative` |
| Display | `flex` |
| Align-items | `center` |
| Justify-content | `center` |
| Transform | `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -0.000833333, 0, 0, 0, 1)` |
| Transform-style | `preserve-3d` |

The matrix3d is `perspective(1200px)` — same as the hero card and nav links. This enables the badge to appear to float in front of the avatar via `translateZ(30)`.

### 2.3 Hi Badge

The lime circle badge overlaps the bottom-left corner of the avatar image.

| Property | Value |
|----------|-------|
| `data-framer-name` | `"Text"` |
| Size | 120 × 120px (rendered as 123 × 123 via pixel rounding) |
| Background | `rgb(208, 255, 113)` — lime (`#d0ff71`) |
| Border-radius | `99px` (circle) |
| Overflow | `hidden` |
| Display | `flex`, `align-items: center`, `justify-content: center` |
| Will-change | `transform` |

#### Badge Positioning

The badge is positioned via an absolutely-positioned parent div with a 3D transform:

```
Parent div:
  position: absolute
  top: 471.2px
  left: 3.4px
  right: 216.6px
  bottom: -115.2px
  width: 120px
  height: 120px
  transform: matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, -60,-60,30, 1)
            = translateX(-60px) translateY(-60px) translateZ(30px)
```

This places the badge:
- **62px left** of the avatar's left edge (overlapping outside the image)
- **60px above** the avatar's bottom edge (overlapping the image corner)
- **30px forward** in Z-space (appearing to float in front via perspective)

#### Badge Content — "Hi" + Wave Carousel

The badge contains a `"Hand Waving"` component (62 × 62px, `flex-direction: column`, `overflow: hidden`) with two stacked children:

| Child | Content | Size | Notes |
|-------|---------|------|-------|
| 1 | `<p>` "Hi" text | 62 × 41px | RichTextContainer |
| 2 | Wave hand SVG (Lottie-like) | 62 × 62px | Animated SVG with `<g>` transforms |

##### "Hi" Text Typography

| Property | Value |
|----------|-------|
| Font family | Inter |
| Font size | 40px |
| Font weight | 400 |
| Line-height | 40px |
| Color | `rgb(48, 48, 48)` — dark (`#303030`) |
| Text-align | `center` |

##### Wave SVG

An inline `<svg>` (62 × 62px) containing a hand-waving animation rendered via `<g>` transforms:
```
<svg viewBox="0 0 1080 1080">
  <g transform="translate(540, 540)">
    <!-- animated hand paths -->
  </g>
</svg>
```

The carousel cycles between "Hi" text and the wave animation via `translateY` on the "Hand Waving" container. Since both items are stacked in a column with `overflow: hidden`, only one is visible at a time.

---

## 3. Contact Column

### 3.1 Text Wrap (Heading + Description)

| Property | Value |
|----------|-------|
| `data-framer-name` | `"Text Wrap"` |
| Display | `flex`, `flex-direction: column` |
| Gap | `20px` |
| Width | 560px |
| Overflow | `hidden` (used for reveal animation clipping) |

#### Heading

| Property | Value |
|----------|-------|
| Tag | `<h2>` |
| Text | `"Let's work together"` |
| Rendered as | `"LET'S WORK TOGETHER"` (via `text-transform: uppercase`) |
| Font family | Antonio |
| Font size | 60px |
| Font weight | 700 |
| Line-height | 78px |
| Color | `rgb(255, 255, 255)` — white |
| Letter-spacing | `normal` |
| Text-transform | `uppercase` |

#### Description

| Property | Value |
|----------|-------|
| Tag | `<p>` |
| Text | `"Let's build something impactful together—whether it's your brand, your website, or your next big idea."` |
| Font family | Inter |
| Font size | 18px |
| Font weight | 300 |
| Line-height | 27px (1.5×) |
| Color | `rgb(255, 255, 255)` — white |
| Max-width | 500px |

### 3.2 Spacing

| Gap | Value |
|-----|-------|
| Text Wrap to Form | `40px` (Contact Column gap) |
| Heading to description | `20px` (Text Wrap gap) |
| Form fields (vertical) | `20px` (Form gap) |
| Name/Email inputs (horizontal) | `20px` (Input Wrap gap) |
| Label to input | `10px` (label flex gap) |

---

## 4. Form Structure

### 4.1 Form Container

| Property | Value |
|----------|-------|
| Tag | `<form>` |
| `data-framer-name` | `"Desktop"` |
| Width | 560px |
| Height | 429.2px |
| Display | `flex`, `flex-direction: column` |
| Gap | `20px` |

### 4.2 Form Fields

#### Row 1 — Name + Email (Side by Side)

| Property | Name | Email |
|----------|------|-------|
| `data-framer-name` | `"Input Wrap"` (parent) | (same parent) |
| Layout | `flex`, `gap: 20px` | (same row) |
| Each input width | 270px | 270px |
| Tag | `<input type="text">` | `<input type="email">` |
| Placeholder | `"John Smith"` | `"johnsmith@gmail.com"` |

#### Row 2 — Service Needed

| Property | Value |
|----------|-------|
| Tag | `<select>` |
| Full width | 560px |
| Appearance | `none` (native dropdown hidden) |
| Wrapper padding | `0px 20px 0px 0px` (right space for chevron) |

**Select Options:**

| Value | Text | State |
|-------|------|-------|
| `""` | `"Select…"` | Selected, disabled (placeholder) |
| `"Branding"` | `"Branding"` | — |
| `"Web design"` | `"Web design"` | — |
| `"Web Design"` | `"Web Design"` | — (duplicate with different case) |
| `"UI / UX"` | `"UI / UX"` | — |

**Select Chevron (Dropdown Arrow):**

Rendered via `::before` pseudo-element on `.framer-form-select-wrapper`:

| Property | Value |
|----------|-------|
| Content | `""` (empty string) |
| Position | `absolute`, `right: 0`, `top: 0` |
| Size | 16 × 19.2px |
| Background-color | `rgb(255, 255, 255)` — white |
| Mask-image | Inline SVG: `<path d="M 3.5 6 L 8 10.5 L 12.5 6">` (chevron-down) |
| Mask-size | 16px |
| Pointer-events | Inherits from wrapper |

The chevron is a CSS mask — a white rectangle masked by an SVG chevron path, making only the chevron shape visible.

#### Row 3 — Message

| Property | Value |
|----------|-------|
| Tag | `<textarea>` |
| Width | 560px |
| Height | 140px |
| Placeholder | `"Hello, I'd like to enquire about..."` |
| Padding | `20px` |
| Resize | Default browser behavior (visible resize handle) |

### 4.3 Label Typography

All labels share the same style:

| Property | Value |
|----------|-------|
| Font family | Inter |
| Font size | 14px |
| Font weight | 300 |
| Line-height | 21px |
| Color | `rgb(208, 255, 113)` — lime (`#d0ff71`) |

**Label texts:**
- `"Name"`
- `"Email"`
- `"Service Needed ?"`
- `"What Can I Help You..."`

### 4.4 Input Styling

#### Common Input Properties

| Property | Value |
|----------|-------|
| Background | Transparent (input itself) |
| Wrapper background | `rgb(51, 51, 51)` — dark gray (`#333`) |
| Wrapper overflow | `hidden` |
| Input border | None (`0px none`) |
| Input padding | `12px 20px` (text inputs, select) / `20px` (textarea) |
| Font family | Inter |
| Font size | 16px |
| Font weight | 300 |
| Line-height | 19.2px (1.2×) |
| Text color | `rgb(255, 255, 255)` — white |
| Placeholder color | `#b5b5b5` — light gray (via `--framer-input-placeholder-color`) |
| Outline | `none` |

#### Per-Field Border Radius

| Field | Wrapper Border-radius |
|-------|-----------------------|
| Name input | `99px` (pill) |
| Email input | `99px` (pill) |
| Service select | `99px` (pill) |
| Message textarea | `20px` (rounded rectangle) |

#### Input Wrapper Height

| Field | Wrapper Height |
|-------|---------------|
| Name | 43.2px |
| Email | 43.2px |
| Service | 43.2px |
| Message | 140px |

---

## 5. Input Focus States

### 5.1 Focus Border Mechanism

Framer uses a `::after` pseudo-element on the input wrapper (`.framer-form-input-wrapper`) for focus borders:

```css
.framer-form-input-wrapper::after {
  content: "";
  display: block;
  position: absolute;
  inset: 0px;
  pointer-events: none;
  border-radius: inherit;
  transition: border-color, border-width, border-style, border-radius;
}

/* Unfocused: */
  border: 0px none transparent;

/* Focused (:focus-within): */
  border: 0.8px solid rgb(208, 255, 113);  /* lime */
```

### 5.2 Focus CSS Variables

| Variable | Value |
|----------|-------|
| `--framer-input-focused-border-color` | `#d0ff71` (lime) |
| `--framer-input-focused-box-shadow` | (empty — no shadow) |
| `--framer-input-border-color` | (empty — no default border) |
| `--framer-input-border-width` | (empty — 0) |

### 5.3 Focus State Summary

| State | Border | Background | Box-shadow |
|-------|--------|------------|------------|
| Unfocused | None (0px) | `#333` (dark gray) | None |
| Focused | `0.8px solid #d0ff71` (lime) | `#333` (unchanged) | None |

The border transition is animated via the `::after` pseudo-element's `transition: border-color, border-width, border-style` properties. The background does not change on focus.

### 5.4 Per-Field Focus Border-radius

| Field | Focus `::after` Border-radius |
|-------|-------------------------------|
| Name / Email / Service | `99px` (pill) |
| Message textarea | `20px` (rounded rect) |

### 5.5 Hover State

No visible hover state change on input wrappers. No background-color or border change on hover — only the cursor changes (default cursor, standard browser `text` cursor for inputs).

### 5.6 Active State

Same as focus state — the `::after` border appears on mousedown/focus. No additional visual change on `:active`.

---

## 6. Submit Button

### 6.1 Button Structure

```
div [data-framer-cursor="1hyjosv"]     ← arrow cursor variant on hover
└── button [data-framer-name="Desktop"]
      display: flex
      border-radius: 99px
      padding: 6px 40px 10px
      overflow: hidden
      background: transparent
      
      ├── div [data-framer-name="Color BG"]   ← lime circle for hover fill
      │     position: absolute
      │     z-index: 1
      │
      └── div (text container)
            position: relative
            z-index: 1
            └── h4 "Submit"
```

### 6.2 Button Dimensions

| Property | Value |
|----------|-------|
| Width | 145px |
| Height | 49.8px |
| Border-radius | `99px` (pill) |
| Padding | `6px 40px 10px` |
| Background | Transparent |

### 6.3 Button Border

The button border is rendered via `::after` pseudo-element (NOT the button's own border property):

| Property | Value |
|----------|-------|
| `::after` content | `""` |
| `::after` position | `absolute`, `inset: 0` |
| `::after` border | `0.8px solid rgb(208, 255, 113)` — lime |
| `::after` border-radius | `99px` |

The button's CSS custom properties confirm:
```
--border-color: #d0ff71 (lime)
--border-width: 1px (all sides)
--border-style: solid
```

### 6.4 Button Text

| Property | Value |
|----------|-------|
| Tag | `<h4>` |
| Text | `"Submit"` |
| Rendered | `"SUBMIT"` (via `text-transform: uppercase`) |
| Font family | Antonio |
| Font size | 26px |
| Font weight | 400 |
| Line-height | 33.8px (1.3×) |
| Color | `rgb(208, 255, 113)` — lime |
| Text-transform | `uppercase` |
| z-index | `1` (text container, `position: relative`) |

### 6.5 Button Hover — Circle Fill

Same pattern as the navbar Contact button:

| Phase | State |
|-------|-------|
| Default | Color BG is a small circle (15 × 19px) positioned at `bottom: -15px; left: -19px` (hidden below-left of button) |
| Hover | Color BG expands to cover the entire button area |
| Leave | Color BG shrinks back |

**Color BG Properties:**

| Property | Default | Hover |
|----------|---------|-------|
| Width | 15px | ~180px |
| Height | 19px | ~180px |
| Position | `absolute`, `bottom: -15px`, `left: -19px` | Expands to cover button |
| Background | `rgb(208, 255, 113)` — lime | Same |
| Border-radius | `99px` | `99px` |
| z-index | `1` | `1` |
| Transition | `all` | `all` |
| Duration | — | ~400ms |
| Easing | — | ease-out |

**Text on hover:** The lime text remains on lime background — low contrast. This suggests the text color should invert to dark on hover (similar to the navbar Contact button pattern), though the `<h4>` color is already lime.

### 6.6 Cursor Interaction

| Property | Value |
|----------|-------|
| Cursor variant | `1hyjosv` (arrow — 70px expanded lime circle with diagonal arrow icon) |
| Applied to | Parent `<div>` wrapping the button (via `data-framer-cursor="1hyjosv"`) |

### 6.7 Magnetic Behavior

None. The button does not exhibit any magnetic/attraction behavior. The cursor follows the mouse via LERP only.

---

## 7. Design Tokens (CSS Variables)

| Token ID | Resolved Value | Usage |
|----------|---------------|-------|
| `--token-54672876-...` | `#d0ff71` (lime) | Button border color, label text color, focus border |
| `--token-cb6b9558-...` | `#333` (dark gray) | Input wrapper background (`--framer-input-background`) |
| `--token-a9f688eb-...` | `#fff` (white) | Input text color, select icon color |
| `--token-7d1fd828-...` | `#b5b5b5` (light gray) | Placeholder text color, select default text color |
| `--token-861b2ae9-...` | `#303030` (near-black) | "Hi" text color inside badge |

---

## 8. Animations

### 8.1 Entrance Reveal

The Contact section uses Framer's JS-driven entrance animation system (not Web Animations API — no `getAnimations()` results). The `"Text Wrap"` has `overflow: hidden`, which clips content during a slide-up reveal.

**Observed behavior (scrolling into section):**
- The heading and description text slide up from below (masked by the `overflow: hidden` container)
- The avatar image fades/slides in from the left
- The form elements appear with a slight stagger

**Estimated parameters (from visual observation):**

| Element | Animation | Duration | Delay | Easing |
|---------|-----------|----------|-------|--------|
| Avatar image | Fade in + slide up | ~600ms | 0ms | ease-out |
| Heading | Slide up (clipped reveal) | ~600ms | ~100ms | ease-out |
| Description | Slide up (clipped reveal) | ~600ms | ~200ms | ease-out |
| Form row 1 (Name/Email) | Fade in + slide up | ~500ms | ~300ms | ease-out |
| Form row 2 (Service) | Fade in + slide up | ~500ms | ~400ms | ease-out |
| Form row 3 (Message) | Fade in + slide up | ~500ms | ~500ms | ease-out |
| Submit button | Fade in + slide up | ~500ms | ~600ms | ease-out |

**Trigger:** IntersectionObserver-based — fires when the section enters the viewport. Plays once (does not replay on re-entry).

### 8.2 Badge Rotation

The "Text" badge has `will-change: transform`, indicating it may rotate slowly (continuous rotation or hover-triggered). This is the same rotating badge behavior seen in the hero section — a slow continuous rotation.

### 8.3 Badge Carousel (Hi ↔ Wave)

The "Hand Waving" component (62 × 62px) cycles between "Hi" text and the wave SVG via `translateY`:
- Container: `flex-direction: column`, `overflow: hidden`, 62px visible height
- Child 1 ("Hi"): 62 × 41px
- Child 2 (wave SVG): 62 × 62px
- Animation: `translateY` shifts the container to show one child at a time
- Cycling is automatic (interval-based or Framer variant cycling)

### 8.4 No Scroll-Driven Animations

Unlike the hero section, the Contact section does not use scroll-driven transforms. All animations are entrance-triggered (IntersectionObserver).

---

## 9. Responsive Behavior

### Desktop (≥ 1024px)

Two-column layout as described above:
- Left: Avatar image (340 × 476px) with badge
- Right: Heading + description + form

### Tablet / Mobile (< 1024px)

Expected layout changes:
- Single-column stack (avatar above form)
- Form fields stack vertically (Name and Email become full-width, single column)
- Avatar may be centered or hidden
- Container padding reduces

---

## 10. DOM Hierarchy

```
<section id="contact" data-framer-name="Contact">
  display: flex, justify-content: center, align-items: center, overflow: hidden

  └── div [data-framer-name="Container"]
        width: 1200px, max-width: 1200px, padding: 120px 40px
        display: flex, flex-direction: row, align-items: center

        ├── div [data-framer-name="Avatar Column"]
        │     width: 560px, display: flex, flex-direction: column
        │     align-items: center, justify-content: center
        │
        │     └── div [data-framer-name="Avatar Wrap"]
        │           position: relative, transform: perspective(1200px), preserve-3d
        │
        │           ├── div (display: contents)
        │           │     └── div [data-framer-name="Avatar Image"]
        │           │           340×476px, border-radius: 20px
        │           │           └── div → div → <img> (object-fit: cover)
        │           │
        │           └── div (display: contents)
        │                 └── div (position: absolute, top: 471px, left: 3px)
        │                       transform: translateX(-60) translateY(-60) translateZ(30)
        │                       └── div [data-framer-name="Text"]
        │                             120×120px, bg: #d0ff71, border-radius: 99px, overflow: hidden
        │                             └── div [data-framer-name="Hand Waving"]
        │                                   62×62px, flex-direction: column, overflow: hidden
        │                                   ├── div (RichTextContainer) → <p> "Hi"
        │                                   └── div → <svg> (wave hand animation)
        │
        └── div [data-framer-name="Contact Column"]
              width: 560px, display: flex, flex-direction: column, gap: 40px
              align-items: flex-start

              ├── div [data-framer-name="Text Wrap"]
              │     display: flex, flex-direction: column, gap: 20px, overflow: hidden
              │     ├── div → <h2> "Let's work together"
              │     └── div → <p> "Let's build something impactful..."
              │
              └── div (display: contents)
                    └── <form data-framer-name="Desktop">
                          display: flex, flex-direction: column, gap: 20px

                          ├── div [data-framer-name="Input Wrap"]
                          │     display: flex, gap: 20px
                          │     ├── <label> "Name"
                          │     │     └── div.framer-form-input-wrapper (bg: #333, br: 99px)
                          │     │           └── <input type="text" placeholder="John Smith">
                          │     └── <label> "Email"
                          │           └── div.framer-form-input-wrapper (bg: #333, br: 99px)
                          │                 └── <input type="email" placeholder="johnsmith@gmail.com">
                          │
                          ├── <label> "Service Needed ?"
                          │     └── div.framer-form-select-wrapper (bg: #333, br: 99px, padding-right: 20px)
                          │           ::before (chevron: SVG mask, 16px, white)
                          │           └── <select appearance="none">
                          │                 <option disabled selected>Select…</option>
                          │                 <option>Branding</option>
                          │                 <option>Web design</option>
                          │                 <option>Web Design</option>
                          │                 <option>UI / UX</option>
                          │
                          ├── <label> "What Can I Help You..."
                          │     └── div.framer-form-input-wrapper (bg: #333, br: 20px)
                          │           └── <textarea placeholder="Hello, I'd like to enquire about...">
                          │
                          └── div [data-framer-cursor="1hyjosv"]
                                └── <button data-framer-name="Desktop">
                                      br: 99px, padding: 6px 40px 10px, overflow: hidden
                                      ::after (border: 0.8px solid #d0ff71, br: 99px, inset: 0)
                                      ├── div [data-framer-name="Color BG"]
                                      │     position: absolute, bg: #d0ff71, 15×19px
                                      │     bottom: -15px, left: -19px, z-index: 1
                                      └── div (position: relative, z-index: 1)
                                            └── <h4> "Submit"
```

---

## 11. Complete Typography Reference

| Element | Font | Size | Weight | Line-height | Color | Transform |
|---------|------|------|--------|-------------|-------|-----------|
| Heading (H2) | Antonio | 60px | 700 | 78px | white | uppercase |
| Description | Inter | 18px | 300 | 27px | white | — |
| Labels | Inter | 14px | 300 | 21px | `#d0ff71` (lime) | — |
| Input text | Inter | 16px | 300 | 19.2px | white | — |
| Placeholder text | Inter | 16px | 300 | 19.2px | `#b5b5b5` (light gray) | — |
| Select text (unselected) | Inter | 16px | 300 | 19.2px | `#b5b5b5` (light gray) | — |
| Submit button | Antonio | 26px | 400 | 33.8px | `#d0ff71` (lime) | uppercase |
| "Hi" badge text | Inter | 40px | 400 | 40px | `#303030` (dark) | — |

---

## 12. Color Palette (Contact Section)

| Usage | Color | Hex |
|-------|-------|-----|
| Background (section) | Transparent (inherits dark) | `#1a1a1b` |
| Heading / description text | `rgb(255, 255, 255)` | `#ffffff` |
| Label text | `rgb(208, 255, 113)` | `#d0ff71` |
| Input text | `rgb(255, 255, 255)` | `#ffffff` |
| Placeholder text | `rgb(181, 181, 181)` | `#b5b5b5` |
| Input wrapper bg | `rgb(51, 51, 51)` | `#333333` |
| Focus border | `rgb(208, 255, 113)` | `#d0ff71` |
| Button border | `rgb(208, 255, 113)` | `#d0ff71` |
| Button text | `rgb(208, 255, 113)` | `#d0ff71` |
| Color BG (hover fill) | `rgb(208, 255, 113)` | `#d0ff71` |
| Badge background | `rgb(208, 255, 113)` | `#d0ff71` |
| Hi text | `rgb(48, 48, 48)` | `#303030` |
| Select chevron | `rgb(255, 255, 255)` | `#ffffff` |

---

## 13. Interaction Summary

| Element | Hover | Focus | Click | Cursor |
|---------|-------|-------|-------|--------|
| Name input | No change | Lime border (0.8px) | — | Default (text) |
| Email input | No change | Lime border (0.8px) | — | Default (text) |
| Service select | No change | Lime border (0.8px) | Opens native dropdown | Default |
| Message textarea | No change | Lime border (0.8px) | — | Default (text) |
| Submit button | Circle fill (lime) | — | Submit form | Arrow (1hyjosv) |
| Avatar image | None | — | — | Default |
| Hi badge | Badge rotates | — | — | Default |
