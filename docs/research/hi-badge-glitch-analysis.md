# Hi Badge Animation Glitch Analysis

> **Date:** 2026-06-23
> **Source:** http://localhost:3000 vs https://portavia.framer.website (Dark Mode)

---

## Symptom

During the wave animation, the hand SVG exhibits:
- Multiple hand states visible simultaneously
- Animation does not return cleanly to resting position
- Visual glitching / ghosting during rotation

---

## Root Cause: Framer Motion `useAnimation` + Nested `motion.div` Conflict

### What Was Implemented

```tsx
// ❌ Original (broken) approach:
const waveHandControls = useAnimation();
useEffect(() => {
  if (showWave) {
    waveHandControls.start({
      rotate: [0, 20, -15, 21, -16, 0],
      transition: { duration: 1.2, ... }
    });
  } else {
    waveHandControls.stop();
    waveHandControls.set({ rotate: 0 });
  }
}, [showWave, waveHandControls]);

// In JSX:
<motion.div animate={waveHandControls} ...>
  <WaveHandIcon />
</motion.div>
```

### Why It Failed

1. **Animation never reached the DOM**: Inspecting the computed style during the wave phase showed `transform: none` on the wave wrapper — the rotation was never applied. The `useAnimation().start()` call was processed by Framer Motion's internal scheduler but the resulting transform never propagated to the element's inline style.

2. **Two control paths competing**: Passing `animate={controls}` to a `motion.div` gives Framer Motion ownership of that element's animation lifecycle. Simultaneously calling `controls.start()` externally creates a race condition — Framer Motion's reconciler intercepts the controls object's state changes but may drop them when the parent `motion.div` (the carousel column) is also animating `y`.

3. **`stop()` + `set()` causes position snap**: When `showWave` toggled to false, `stop()` halted the animation mid-keyframe, then `set({ rotate: 0 })` instantly reset the transform. This caused a visible "snap" from whatever angle the hand was at back to 0°, rather than a smooth return.

4. **Nested motion.div interference**: The parent carousel `motion.div` (animating `y`) and the child rotation `motion.div` (animating `rotate`) share Framer Motion's animation context. Framer Motion batches and coordinates animations on the same element tree, and in this case the parent animation took priority, suppressing the child rotation animation.

---

## Investigation Results

### DOM: No duplicate SVGs

Two SVG elements exist (one per badge instance), but only one is visible:

| Instance | Parent | Size | Visible |
|----------|--------|------|---------|
| SVG 1 | StickyScrollSection badge (desktop) | 63.6×63.6px | Yes |
| SVG 2 | HeroPanel badge (mobile) | 0×0px | No |

**No duplicate hand SVGs are rendered.** The "multiple states" appearance was caused by the animation snap-back, not literal duplication.

### Animation State (During Wave Phase)

| Element | Expected Transform | Actual Transform |
|---------|-------------------|-----------------|
| Carousel column | `translateY(-50%)` | `translateY(-50%)` ✅ |
| Wave hand wrapper | `rotate(Xdeg)` (keyframe) | `none` ❌ |

The carousel correctly positioned the wave slot, but the rotation was **never applied**.

### React Renders

- `showWave` toggles cause 1 re-render per toggle (correct)
- No render loops detected
- No `requestAnimationFrame` leaks

---

## Fix: CSS Keyframe Animation + React Key Remount

### Approach

Replace Framer Motion rotation with a CSS `@keyframes` animation. Use a React `key` that increments each time `showWave` becomes true to force a clean DOM remount, restarting the CSS animation fresh each wave cycle.

### Implementation

**globals.css:**
```css
@keyframes wave-hand {
  0%   { transform: rotate(0deg); }
  20%  { transform: rotate(20deg); }
  40%  { transform: rotate(-15deg); }
  60%  { transform: rotate(21deg); }
  80%  { transform: rotate(-16deg); }
  100% { transform: rotate(0deg); }
}

.animate-wave-rotation {
  animation: wave-hand 1.2s ease-in-out;
  transform-origin: center center;
}
```

**StickyScrollSection.tsx:**
```tsx
const [waveAnimKey, setWaveAnimKey] = useState(0);
useEffect(() => {
  if (showWave) setWaveAnimKey((k) => k + 1);
}, [showWave]);

// JSX — regular div, not motion.div:
<div
  key={waveAnimKey}
  className={`flex h-[40px] w-[40px] ... ${showWave ? "animate-wave-rotation" : ""}`}
>
  <WaveHandIcon />
</div>
```

### Why This Works

1. **No Framer Motion nesting** — CSS animations run in the browser's native animation engine, completely independent of Framer Motion's render loop. The parent carousel `motion.div` animates `y` via Framer Motion; the wave hand rotates via CSS. They don't interfere.

2. **Clean restarts via key remount** — `waveAnimKey` increments only when `showWave` becomes true. React unmounts the old div and mounts a new one with `animate-wave-rotation` class. The CSS animation starts fresh on the new element. No cross-fade, no overlap.

3. **Smooth return to rest** — The keyframes end at `rotate(0deg)` at 100%. The animation duration (1.2s) fits within the wave display window (1.6s) with a 0.4s buffer. By the time `showWave` toggles to false and the class is removed, the hand is already at 0°.

4. **No snap-back** — When `showWave` becomes false, the `animate-wave-rotation` class is simply removed. If the animation has already completed (which it should, with the 0.4s buffer), the element is already at 0°. Even if still mid-animation on rare timing overlaps, the CSS `animation` removal returns the element to its natural transform (none = 0°), which is imperceptible since the carousel is simultaneously sliding the hand out of view.

5. **Single element guarantee** — The `key` approach ensures only ONE DOM element exists at a time. React processes unmount and mount in the same commit — no frame where both old and new elements are visible.

---

## Verification Checklist

- [x] Only one hand SVG exists in the DOM at any time
- [x] No duplicate SVGs, no overlapping frames
- [x] CSS animation runs independently of Framer Motion
- [x] Key only changes on `showWave: true` (not on every render)
- [x] Animation completes within wave display window (1.2s < 1.6s)
- [x] `transform-origin: center center` matches original pivot (540,540 in viewBox)
- [x] Keyframes match original Lottie rotation pattern (±20° oscillation)
- [x] No `useAnimation`, no nested motion.div conflicts
- [x] No `stop()` + `set()` snap-back
- [x] Build passes (`npm run build`)
