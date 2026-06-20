# Raw Findings: Homepage — Blog + Contact + Footer (8000–end)

> **Compared:** 2026-06-20

---

## Blog Section

### Matches
- H2 "DESIGN INSIGHTS & IDEAS": 60px/700/Antonio/uppercase — ✅ Match
- Blog cards have images — ✅ Match

### Differences

#### Difference 1: Blog Card Dimensions
- **Difference:** Clone blog cards are 564×529.6px. Original blog card dimensions not precisely captured via data-framer-name query (cards may use "Blog Card" sub-element names). Need visual verification.
- **Severity:** Low (needs verification)
- **Location:** Blog section cards
- **Suggested Fix:** Verify blog card image ratio and text layout match original
- **Files Involved:** `src/components/BlogSection.tsx`

#### Difference 2: Blog Card Count
- **Difference:** Clone shows 2 blog cards side-by-side. Original likely shows 3 cards (1120px container ÷ ~360px per card).
- **Severity:** Medium (needs verification)
- **Location:** Blog section grid
- **Suggested Fix:** Check if original shows 2 or 3 blog cards and match count
- **Files Involved:** `src/components/BlogSection.tsx`

---

## Contact Section

### Matches
- H2 "LET'S WORK TOGETHER": 60px/700/Antonio/uppercase — ✅ Match
- Form has all 4 fields: text, email, select, textarea — ✅ Match
- Section height similar: 861.2 (original) vs 894.6 (clone) — close match

### Differences

#### Difference 3: Name & Email Input Layout
- **Difference:** Original: Name (270px) and Email (270px) are side-by-side in a row. Clone: Name (552px) and Email (552px) are stacked full-width.
- **Severity:** **High**
- **Location:** Contact form, first two inputs
- **Likely Cause:** Clone lays out form fields in a single column; original uses a two-column row for name/email
- **Suggested Fix:** Put Name and Email inputs side-by-side in a flex/grid row, each ~270px wide (half of 560px contact column minus gap)
- **Files Involved:** Contact form in `src/app/page.tsx`

#### Difference 4: Input Heights
- **Difference:** Original inputs: 43.2px tall. Clone inputs: 48.8px tall (+5.6px)
- **Severity:** Low
- **Location:** Contact form inputs
- **Likely Cause:** Clone uses slightly more padding
- **Suggested Fix:** Reduce input height to ~43px
- **Files Involved:** Contact form component

#### Difference 5: Textarea Height
- **Difference:** Original: 140px. Clone: 120.8px (-19.2px)
- **Severity:** Low
- **Location:** Contact form textarea
- **Suggested Fix:** Increase textarea height to ~140px
- **Files Involved:** Contact form component

#### Difference 6: Contact H2 Left Offset
- **Difference:** Original "Let's work together" at left=760.4. Clone at left=744.4 (16px diff — global issue)
- **Severity:** Medium (same global issue)
- **Location:** Contact section heading

---

## Footer

### Matches
- Background: lime (#d0ff71) — ✅ Match
- Full-width — ✅ Match

### Differences

#### Difference 7: Footer Height
- **Difference:** 205.4px (original) vs 88.0px (clone) — **117.4px shorter**
- **Severity:** **High**
- **Location:** Footer
- **Likely Cause:** Clone footer is missing content or uses a more compact layout. Original footer likely has multiple rows (nav links, copyright, social icons) that the clone compresses into a single row.
- **Suggested Fix:** Expand footer to include all original elements with proper spacing. Check original footer content: likely has nav links row, separator, bottom row with copyright + social icons.
- **Files Involved:** `src/components/Footer.tsx`

#### Difference 8: Total Page Height
- **Difference:** 9799px (original) vs 9404px (clone) — 395px shorter
- **Severity:** Low (consequence of accumulated section height differences)
- **Location:** Full page
- **Suggested Fix:** Will self-resolve when individual section heights are corrected
