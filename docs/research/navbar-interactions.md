# Navbar — Interactions Specification

> **Source:** https://portavia.framer.website/
> **Date:** 2026-06-20 (updated — corrects prior inaccuracies)
> **Method:** Chrome DevTools MCP — scroll behavior testing, hover state capture, DOM mutation observation

---

## 1. Scroll Behavior

### Direction Detection (NOT Position-Based)

**Critical correction from prior analysis:** The navbar uses **scroll direction detection**, not absolute scroll position threshold.

| Scroll Action | Result |
|---------------|--------|
| Scroll down (any amount) | Collapses to "Desktop / Closed" |
| Scroll up (any amount) | Re-expands to "Desktop / Open" |
| At scrollY=0 after scrolling down | Stays Closed (last direction was down) |
| At scrollY=500 after scrolling up | Re-opens to Open (direction is up) |

**Evidence:** When scrolling down to scrollY=1600 and then smoothly scrolling back to scrollY=500, the nav remained in "Closed" state — proving it tracks direction, not absolute position.

### How Framer Detects Direction

Framer's scroll listener compares current `scrollY` with a stored previous value:
- If `scrollY > prevScrollY` → direction = "down" → collapse
- If `scrollY < prevScrollY` → direction = "up" → expand
- The transition has hysteresis — requires some minimum delta to trigger (very sensitive, ~20-50px of movement)

### Re-expansion Delay

When scroll direction reverses from down to up:
- ~300ms delay before the Closed → Open transition begins
- Then ~700ms for the width animation
- Total time from scroll reversal to fully expanded: ~1000ms

### Fixed Positioning

| Property | Value |
|----------|-------|
| Position | `fixed` (on parent wrapper) |
| z-index | `10` |
| Top | `20px` from viewport top |
| Horizontal | Centered via `left: 50%; transform: translateX(-50%)` |
| Visibility | Always visible — never slides off-screen |

### Interaction with Lenis Smooth Scroll

The page uses Lenis for smooth scrolling. The scroll direction detection uses `window.scrollY` values (the actual scroll position, not Lenis virtual position). Lenis's smooth scrolling means the direction change is gradual, not instantaneous.

---

## 2. Nav Link Interactions

### 2.1 Hover — 3D Text Flip

| Phase | Visual Effect |
|-------|---------------|
| Default | White text visible, lime text hidden (rotateX(-90°), edge-on) |
| Hover Enter | White text flips away (rotateX(90°)), lime text flips into view (rotateX(0°)) |
| Hover Leave | Reverse — lime text flips away, white text returns |

**Per-link measurements:**

| Link | Default Width | Hover Width (lime) | href |
|------|--------------|-------------------|------|
| Home | 44.6px | 45.5px | `./` |
| About | 44.1px | 45.0px | `./about` |
| Projects | 59.9px | 61.1px | `./projects` |
| Blogs | 41.5px | 42.4px | `./blogs` |

The lime text is slightly wider than the white text (~1px) due to the color rendering difference.

### 2.2 Click

Standard navigation — follows the `href`:
- Home → `./` (homepage)
- About → `./about`
- Projects → `./projects`
- Blogs → `./blogs`

Page transitions: opacity fade between routes (~200ms).

### 2.3 Cursor

The nav grandparent has `data-framer-cursor="17ph7dh"` — the custom lime cursor dot is active over the entire nav area. No specific arrow or blend variant is set on individual nav links.

### 2.4 Focus / Keyboard

No special focus styles observed. Tab navigation works (standard browser behavior) but no visible focus ring is added by Framer.

### 2.5 Active State

The original Portavia site has **no visible active state indicator**:
- Active link gets `data-framer-page-link-current="true"` attribute
- No CSS styling difference — no underline, no color change, no dot indicator
- All links look identical regardless of current page
- The attribute exists for Framer's internal routing but has no visual effect

---

## 3. Contact Button Interactions

### 3.1 Hover — Circle Fill

| Phase | Color BG State | Visual |
|-------|----------------|--------|
| Default | 20×20px circle at `bottom: -20px; left: -20px` | White pill, dark text |
| Hover | ~180×180px circle covers button | Lime-filled pill, dark text persists |
| Leave | Circle shrinks back to 20×20 | White pill returns |

The lime circle (`rgb(208, 255, 113)`) expands from the bottom-left of the button. The `overflow: hidden` + `border-radius: 99px` clips it to the pill outline.

**Text color does NOT change** — stays `rgb(48, 48, 48)` in both states. The dark text on lime background creates a complementary contrast.

### 3.2 Click

Smooth scrolls to the `#contact` section on the current page. Does NOT navigate to a different route.

---

## 4. Available-for-Work Badge Interactions

### 4.1 Visibility

Only visible in the "Desktop / Closed" nav state (when user has scrolled down).

### 4.2 Hover — 3D Flip

The "Available for work" text uses the **same 3D flip** as the nav links:
- Default: white text visible
- Hover: lime text flips into view
- Same `perspective(1200px)` + `preserve-3d` + `rotateX` mechanism

### 4.3 Click

The "Available for work" link has `href="./#contact"` — scrolls to the Contact section (same as the Contact button).

### 4.4 Green Dot

The green dot (`6×6px, rgb(11, 222, 102)`) is always visible in the Closed state. It does not respond to hover — it's a status indicator, not interactive.

### 4.5 Glow Animation

The `"Glowing"` element plays a single 700ms entrance animation when the Closed state appears:
- Scales from small to ~40×40px
- Opacity settles at 0.5
- Does NOT continuously pulse
- Replays each time the nav collapses (state re-entry)

---

## 5. Avatar Interactions

### 5.1 Open State

In the Open state, the avatar is `"Only Avatar"` — a 40×40px circular image. No hover effect, no click behavior. It's purely decorative in this state.

### 5.2 Closed State

In the Closed state, the avatar is part of the `"Desktop / Available Glow"` component. The entire component (avatar + text + dot) is wrapped in a flex container. The text link is clickable (scrolls to #contact), but the avatar itself has no separate interaction.

---

## 6. Mobile / Tablet Interactions

When viewport width < ~1024px:

### 6.1 Layout

| Element | Value |
|---------|-------|
| Variant | `"Tablet & Phone / Closed"` |
| Width | ~278px |
| Contents | Avatar + "Available for work" + hamburger button |

### 6.2 Hamburger Menu

| Interaction | Behavior |
|-------------|----------|
| Tap hamburger | Opens full-width dropdown menu |
| Line animation | Top + bottom lines → ±45° (X shape), middle line → opacity 0 |
| Menu content | All 4 nav links + Contact button |
| Close triggers | Link tap, outside tap, hamburger re-tap |
| Animation | Slide down / fade in (AnimatePresence-style) |

### 6.3 Mobile Menu Links

Same click behavior as desktop — navigate to respective routes. No 3D flip hover effect on mobile (touch devices don't have hover).

---

## 7. Interaction Map

| Element | Hover | Click | Cursor Variant |
|---------|-------|-------|----------------|
| Home link | 3D flip (white→lime) | Navigate to `./` | Default (17ph7dh) |
| About link | 3D flip (white→lime) | Navigate to `./about` | Default |
| Projects link | 3D flip (white→lime) | Navigate to `./projects` | Default |
| Blogs link | 3D flip (white→lime) | Navigate to `./blogs` | Default |
| Contact button | Circle fill (white→lime) | Scroll to #contact | Default |
| Avatar (open) | None | None | Default |
| "Available for work" | 3D flip (white→lime) | Scroll to #contact | Default |
| Green dot | None | None (indicator only) | Default |
| Hamburger (mobile) | None | Toggle mobile menu | Default |

---

## 8. Implementation Differences (Clone vs Original)

### Corrections from Fresh Inspection

| Property | Prior Doc Said | Actual (Verified) |
|----------|---------------|-------------------|
| z-index | 2 | **10** |
| Top offset | 16px | **20px** |
| Avatar size | 32×32px | **40×40px** |
| Nav background | `rgba(255, 255, 255, 0.8)` (light!) | **`rgba(15, 15, 15, 0.9)`** (dark!) |
| Nav border | `1px solid rgb(218, 218, 218)` | **None** (0px none) |
| Link hover color | `rgb(106, 113, 223)` (purple) | **`rgb(208, 255, 113)`** (lime) |
| Scroll trigger | Position-based (~70px threshold) | **Direction-based** (any down = close, any up = open) |
| Glow animation | Infinite pulse loop | **Single 700ms entrance** (plays once per collapse) |

### Key Differences in Clone Implementation

| Feature | Original | Clone Status |
|---------|----------|-------------|
| Scroll trigger | Direction-based | Scroll idle timeout (600ms) → **wrong** |
| 3D text flip | `preserve-3d` + `rotateX` faces | Implemented (after fix) |
| Contact circle fill | Color BG expanding circle | Implemented |
| Green dot glow | Single 700ms entrance pulse | May be infinite loop → **check** |
| "Available for work" flip | Same 3D flip as nav links | Needs verification |
| Active state | No visual indicator (attr only) | Should match — no indicator |
