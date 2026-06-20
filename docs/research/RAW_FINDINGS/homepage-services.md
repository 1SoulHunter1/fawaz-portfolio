# Raw Findings: Homepage — Services (800–1600px)

> **Compared:** 2026-06-20

---

## Matches
- H2 "WHAT I CAN DO FOR YOU": 60px/700/Antonio/uppercase — ✅ Match
- Description: 18px/300/Inter — ✅ Match
- Container width: 1200px — ✅ Match
- Accordion item width: 600px — ✅ Match
- H3 titles: 32px/400/Antonio/uppercase — ✅ Match
- Cursor on accordion: Original `data-framer-cursor` variants, Clone `data-cursor="image"` — ✅ Equivalent

## Differences

### Difference 1: Global Left Offset (16px)
- **Difference:** All service content at left=200.4 (original) vs 184.4 (clone)
- **Severity:** Medium (consistent with all other sections)
- **Location:** Services section left alignment
- **Likely Cause:** Clone uses `px-6` (24px padding) within 1200px container. Original has 40px effective left padding.
- **Suggested Fix:** Change `px-6` to `px-10` (40px) on service container, or globally
- **Files Involved:** `src/app/page.tsx`, potentially global container class

### Difference 2: Accordion Item Height
- **Difference:** 83px (original) vs 81.6px (clone) — 1.4px
- **Severity:** Low (within tolerance)
- **Location:** Service accordion items
- **Suggested Fix:** None needed

### Priority: Only the global 16px left offset matters here.
