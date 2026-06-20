# Raw Findings: About Page (/about)

> **Compared:** 2026-06-20

---

## Page-Level

| Metric | Original | Clone | Delta |
|--------|----------|-------|-------|
| Total height | 6089px | 6840px | +751px |

---

## Matches
- 4 sticky images on right: 340×476px at left=870.4 — ✅ Match
- Content column width: 560px — ✅ Match
- Section order: About → Services → Experience → Tech Stack → Process → Contact → Footer — ✅ Match
- Font family: Antonio for headings — ✅ Match

---

## Differences

### Difference 1: H1 Height
- **Difference:** Original h1 "About me" height=132px. Clone h1 height=120px (-12px)
- **Severity:** Low
- **Location:** About hero heading
- **Likely Cause:** Line-height difference on the h1
- **Suggested Fix:** Match line-height to produce 132px at the same font size
- **Files Involved:** `src/app/about/page.tsx`

### Difference 2: H1 Vertical Position
- **Difference:** Original h1 top=105px. Clone h1 top=176px (+71px lower)
- **Severity:** Medium
- **Location:** About hero heading
- **Likely Cause:** Different top padding/margin on the about page hero
- **Suggested Fix:** Reduce top padding to position h1 closer to top=105px
- **Files Involved:** `src/app/about/page.tsx`

### Difference 3: Global Left Offset (16px)
- **Difference:** Original content at left=200.4. Clone content at left=184.4 (16px left)
- **Severity:** Medium (same root cause as homepage)
- **Location:** All about page content sections
- **Likely Cause:** px-6 (24px) vs original's 40px container padding
- **Suggested Fix:** Fix global container padding (same fix as homepage)
- **Files Involved:** `src/app/about/page.tsx`

### Difference 4: Service Accordion State
- **Difference:** Original shows service items collapsed (83px each, stacked tightly). Clone shows service items expanded (~234px spacing between titles), displaying body content.
- **Severity:** **High**
- **Location:** About page services section
- **Likely Cause:** Clone renders accordion items in always-expanded state on the about page, while original keeps them collapsed (same as homepage)
- **Suggested Fix:** Default accordion items to collapsed state on about page. Ensure they are interactive (click to expand/collapse).
- **Files Involved:** `src/app/about/page.tsx`

### Difference 5: Process Step Image Border Radius
- **Difference:** Original process images: borderRadius=20px. Clone: borderRadius=0px
- **Severity:** Medium
- **Location:** Process section step images (360×380px)
- **Likely Cause:** Missing rounded-2xl or rounded-[20px] class on process images
- **Suggested Fix:** Add `rounded-[20px]` to process step images
- **Files Involved:** `src/app/about/page.tsx`

### Difference 6: Scroll-Driven Image Animation Missing
- **Difference:** Original has sticky scroll architecture — the 4 right-column images translate vertically as user scrolls through content sections. Clone shows all 4 images stacked statically.
- **Severity:** **High**
- **Location:** About page right column image stack
- **Likely Cause:** Clone lacks the sticky scroll wrapper + useScroll/useTransform animation
- **Suggested Fix:** Implement sticky scroll architecture matching homepage pattern (see plan Issue 5)
- **Files Involved:** `src/app/about/page.tsx`

### Difference 7: Footer Height
- **Difference:** Same as homepage — 205.4px (original) vs 88px (clone)
- **Severity:** **High** (duplicate of homepage #33)
- **Location:** Footer
- **Files Involved:** `src/components/Footer.tsx`

### Difference 8: Heading Width
- **Difference:** Original h1 width=480px (shrink-wrap). Clone h1 width=560px (fills column)
- **Severity:** Low
- **Location:** About hero h1
- **Likely Cause:** Clone h1 stretches to fill parent; original shrink-wraps to text content
- **Suggested Fix:** Add `w-fit` or `max-w-[480px]` to the h1
- **Files Involved:** `src/app/about/page.tsx`
