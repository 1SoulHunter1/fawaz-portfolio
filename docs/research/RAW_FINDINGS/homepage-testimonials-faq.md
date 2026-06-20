# Raw Findings: Homepage — Testimonials + FAQ (5000–8000px)

> **Compared:** 2026-06-20

---

## Testimonials

### Matches
- H2 "WHAT MY CLIENTS SAY": 60px/700/Antonio/uppercase — ✅ Match
- Section exists on both sites — ✅ Match

### Original Testimonials Layout
- Grid: 1120px wide, 498px tall, `grid-template-columns: 360px 360px 360px`, gap: 20px
- 4 cards in brickwork/offset pattern:
  - Card 1: left=200.4, top=6253.25 (col 1, row 1)
  - Card 2: left=580.4, top=6253.25 (col 2, row 1)
  - Card 3: left=580.4, top=6512.25 (col 2, row 2)
  - Card 4: left=960.4, top=6512.25 (col 3, row 2)
- Card styling: 360×239px, bg=#333, borderRadius=20px, padding=40px

### Differences

#### Difference 1: Testimonial Card Styling Not Confirmed
- **Difference:** Clone testimonial cards not found via bg=#333 class search — may use different background color or class structure
- **Severity:** Medium (need to verify visually)
- **Location:** Testimonials section
- **Likely Cause:** Clone may use a different card background, class naming, or Tailwind tokens
- **Suggested Fix:** Verify clone card styling matches: bg=#333, 360×239px, borderRadius=20px, padding=40px
- **Files Involved:** `src/components/TestimonialsSection.tsx`

#### Difference 2: Testimonial Grid Layout (Brickwork)
- **Difference:** Original uses an offset brickwork pattern (3 columns, 4 cards staggered across 2 rows with gaps). Clone layout needs verification.
- **Severity:** Medium
- **Location:** Testimonial grid
- **Likely Cause:** Clone may use a simple 2×2 or 3-column grid without the brickwork offset
- **Suggested Fix:** Match original's staggered layout: col1-row1, col2-row1, col2-row2, col3-row2
- **Files Involved:** `src/components/TestimonialsSection.tsx`

---

## FAQ

### Matches
- H2 "FREQUENTLY ASKED QUESTIONS": 60px/700/Antonio/uppercase — ✅ Match
- 6 FAQ items — ✅ Match
- Two-column layout (sticky left heading + right accordion) — ✅ Match (original has FAQ Column / Sticky at width=440)

### Differences

#### Difference 3: FAQ Item Width
- **Difference:** 600px (original) vs 662.4px (clone) — 62.4px wider
- **Severity:** Medium
- **Location:** FAQ accordion items
- **Likely Cause:** Clone's two-column grid allocates more width to the right column (1.5fr vs original's fixed widths)
- **Suggested Fix:** Set FAQ accordion column width to 600px max, or adjust grid ratio
- **Files Involved:** FAQ section in `src/app/page.tsx`

#### Difference 4: FAQ Item Heights
- **Difference:** Original: items 1-3, 5-6 are 65px; item 4 is 98.6px (text wraps). Clone: all items are uniform 73.8px.
- **Severity:** Low
- **Location:** FAQ accordion item heights
- **Likely Cause:** Clone uses fixed padding producing uniform heights; original's taller item 4 wraps its longer text
- **Suggested Fix:** Minor — ensure longer text wraps naturally rather than being clipped or truncated

#### Difference 5: FAQ Left Column Width
- **Difference:** Original sticky column: 440px wide. Clone uses `grid-cols-[1fr_1.5fr]` which gives ~480/720 split at 1200px
- **Severity:** Low
- **Location:** FAQ layout
- **Likely Cause:** Grid ratio approximation
- **Suggested Fix:** Use fixed width `grid-cols-[440px_1fr]` or similar
- **Files Involved:** FAQ section in `src/app/page.tsx`
