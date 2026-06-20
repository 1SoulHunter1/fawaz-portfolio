# Phase 5 — Navbar System Analysis (Homepage)

> Source: https://portavia.framer.website/ at 1440×900 viewport
> See also: `navbar-active-state.md` for 3D hover fix details

## Navbar States

The navbar has two states controlled by scroll position:

### State 1: Expanded (scrollY < 70px)

```
┌──────────────────────── 508×56 ────────────────────────┐
│ [Avatar] ─40px─ Home About Projects Blogs ─40px─ [Contact] │
│  40×40   gap:5px between links   gap:10px              │
└────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Width | 508px |
| Height | 56px |
| Background | `rgba(15, 15, 15, 0.9)` |
| Border | none |
| Border radius | 28px |
| Backdrop filter | `blur(5px)` |
| Padding | `8px 10px` (py-2 px-[10px]) |
| Position | fixed, top: 20px, centered horizontally (left: 50%, transform: translateX(-50%)) |
| Z-index | 10 |

### State 2: Collapsed (scrollY >= 70px)

```
┌────────── ~229×56 ──────────┐
│ [Avatar]  Available for work ● │
│  40×40   lime text    dot    │
└─────────────────────────────┘
```

Same container styles, but nav links are replaced by the "Available for Work" pill.

### Transition Animation

| Property | Value |
|----------|-------|
| Duration | ~700ms |
| Ease | `[0.16, 1, 0.3, 1]` (custom ease-out) |
| Mechanism | `motion.nav` with `layout` prop — FLIP animation |
| Children enter | `opacity: 0, filter: blur(4px)` → `opacity: 1, filter: blur(0px)` |
| Children exit | reverse of enter |
| AnimatePresence mode | `popLayout` — children animate independently of layout shift |

## Avatar

| Property | Value |
|----------|-------|
| Size | 40×40px |
| Shape | `rounded-full` (50% border-radius) |
| Image | `/images/avatar.jpg` |
| Object fit | cover |
| Position | Always visible in both states |
| Layout | `layout="position"` — smoothly repositions during state transition |

## Nav Links (Expanded State)

### Structure

```
<div class="flex items-center gap-10 pl-10">    ← 40px padding-left from avatar
  <div class="flex items-center gap-5">          ← 20px between links
    <NavLink /> × 4
  </div>
  <ContactButton />                              ← 40px gap from links group
</div>
```

### NavLink 3D Flip Effect

Each link uses a 3D text rotation on hover:

```
<a> (overflow:hidden, height:24px, cursor:pointer)
  └─ motion.div (flex column)
       │ animate: rotateX(0 → -90deg) on hover
       │ transformPerspective: 1200
       │ transformOrigin: "50% 0%"
       │ transformStyle: "preserve-3d"    ← CRITICAL for 3D rendering
       │ transition: 0.35s, ease [0.16,1,0.3,1]
       │
       ├─ Face 1: white text (h-6, text-base/16px, font-light/300, Inter)
       │    └─ transform: none (default facing forward)
       │
       └─ Face 2: lime text (h-6, text-base/16px, font-light/300, Inter)
            └─ transform: rotateX(90deg), origin: 50% 0%
            └─ color: rgb(208, 255, 113)
```

**How it works:**
1. Face 2 is pre-rotated 90° around its top edge → perpendicular to screen (invisible)
2. Link container has `overflow:hidden` + `height:24px` → clips to one face
3. On hover, wrapper rotates `-90°` around top edge
4. Face 1 rotates away (flat → perpendicular), Face 2 rotates in (perpendicular → flat)
5. `preserve-3d` is essential — without it, Face 2's rotation flattens to 2D (invisible edge)

### Contact Button (Circle Fill)

```
<a> (relative, overflow:hidden, rounded-full, bg:white, h:40px, px:30px)
  ├─ motion.div (absolute, rounded-full, bg:#d0ff71)
  │    Default: w:20 h:20, inset: 40px 118px -20px -20px (below button, hidden)
  │    Hover:   w:180 h:180, inset: -65px -31px -75px -31px (covers entire button)
  │    Transition: 0.5s, ease [0.16,1,0.3,1]
  │
  └─ <span> "Contact" (relative, z:10, text-base, font-light, color: rgb(48,48,48))
```

**How it works:**
1. A small lime circle sits below the button (clipped by `overflow:hidden`)
2. On hover, the circle expands from 20×20 to 180×180, flooding upward
3. `border-radius: 9999px` on both button and circle maintains round edges
4. Text stays on top (z:10) with dark color throughout

## Available for Work Pill (Collapsed State)

```
<a href="#contact"> (flex, items-center, gap:8px, py:4px, pr:4px, pl:8px)
  ├─ <span> "Available for work" (text-base/16px, font-light/300, color: rgb(208,255,113))
  │
  └─ <div> (relative, 24×24, flex, items-center, justify-center)
       ├─ motion.div "Glow" (absolute, 40×40, bg: rgb(11,222,102), blur:8px)
       │    animate: opacity [0.3, 0.6, 0.3]
       │    transition: duration:2s, repeat:Infinity, ease:easeInOut
       │
       └─ <div> "Dot" (relative, 6×6, rounded-full, bg: rgb(11,222,102))
```

## Mobile Behavior (< 1024px / lg breakpoint)

- Nav links and Contact button are hidden (`hidden lg:flex`)
- Available for Work pill is always visible
- Hamburger button appears (3 bars, white, animated to X on open)
- Mobile dropdown menu: dark bg, white text, lime hover

## Scroll Threshold Logic

```typescript
// useNavbarState.ts
const THRESHOLD = 70; // pixels
// scrollY < 70 → expanded (show nav links)
// scrollY >= 70 → collapsed (show "Available for work")
```

Uses `useScroll()` + `useMotionValueEvent` from motion/react. No velocity or direction detection — pure position threshold.
