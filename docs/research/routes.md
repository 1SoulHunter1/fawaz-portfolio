# Route Inventory — Portavia Clone vs Original

> **Date:** 2026-06-20
> **Original:** https://portavia.framer.website
> **Clone branch:** `portavia-refinement`

---

## Route Comparison

| Route | Original | Clone | Match |
|-------|----------|-------|-------|
| `/` (Homepage) | Yes | Yes | Exists |
| `/about` | Yes | Yes | Exists |
| `/projects` | Yes | Yes | Exists |
| `/blogs` | Yes | Yes | Exists |
| `/projects/summer-vibes-festival-campaign` | Yes | Yes | Exists |
| `/projects/coral-spiral-abstract` | Yes | Yes | Exists |
| `/projects/shopease-redesign-sprint` | Yes | Yes | Exists |
| `/projects/black-geometric-prisms` | Yes | Yes | Exists |
| `/projects/pantone-very-peri-poster-design` | Yes | Yes | Exists |
| `/projects/intenza-brand-boutique-e-gift-card-design` | Yes | Yes | Exists |
| `/projects/vistahaven` | Yes | Yes | Exists |
| `/projects/innovatetech-identity-rollout` | Yes | Yes | Exists |
| `/blogs/5-design-trends-that-will-define-2024` | Yes | Yes | Exists |
| `/blogs/how-to-streamline-your-design-workflow` | Yes | Yes | Exists |
| `/blogs/the-power-of-typography-in-web-design` | Yes | Yes | Exists |
| `/blogs/the-role-of-color-psychology-in-branding` | Yes | Yes | Exists |
| `/blogs/mastering-ui-ux-design-key-principles-for-success` | Yes | Yes | Exists |
| `/blogs/balancing-creativity-and-functionality-in-design` | Yes | Yes | Exists |
| `/#contact` (anchor) | Yes | Yes | Exists |

---

## Route Status: 100% Coverage

All 19 original routes are implemented in the clone.

---

## Navigation Links

### Original Navbar
- Home (`./`) | About (`./about`) | Projects (`./projects`) | Blogs (`./blogs`) | Contact (`./#contact`)

### Clone Navbar
- Home (`/`) | About (`/about`) | Projects (`/projects`) | Blogs (`/blogs`) | Contact (`#contact`)

### Footer Links (Both)
- Email: `mailto:designer@example.com`
- Phone: `tel:+1 (555) 123-4567`
- Social: X, Instagram, Behance, Dribbble
- Credits: oldshen (Framer profile), Duncan Shen (X)

---

## Page Title Comparison

| Route | Original Title | Clone Title | Severity |
|-------|---------------|-------------|----------|
| `/` | Portavia | Portavia | Match |
| `/about` | About — Portavia | About — Portavia | Match |
| `/projects` | Featured Projects — Portavia | Projects — Portavia | **Minor** |
| `/blogs` | Blogs — Portavia | Blogs — Portavia | Match |
| `/projects/[slug]` | {Title} - DigiPorto | {Title} — Portavia | **Minor** |
| `/blogs/[slug]` | {Title} - Portavia | {Title} — Portavia | Match |

---

## Section Inventory Per Route

### `/` Homepage (Original: 9974px total height)
1. Hero (0–732px) — "DIGITAL / DESIGNER" split heading
2. Services (732–1464px) — "WHAT I CAN DO FOR YOU" + accordion
3. About (1464–2196px) — Stats, contact info, socials
4. Projects (2196–6089px) — 4 featured project cards (sticky stacking)
5. Testimonials (6089–7046px) — 4 testimonials + 2 stat cards
6. FAQ (7046–7870px) — 2-column layout with sticky title
7. Blog (7870–8907px) — 2 blog cards
8. Contact (8907–9768px) — Form + portrait image
9. Footer (9768–9974px) — Lime bar with links

### `/about` (Original: 6147px total height)
1. About Hero (0–732px) — "About me" + Duncan Robert + bio
2. Services (732–1574px) — Accordion (same as homepage)
3. Experience (1574–2466px) — Timeline with 4 roles
4. Tech Stack (2466–3442px) — 5 tool cards
5. Process (3442–5081px) — 5 process step cards (grid)
6. Contact (5081–5942px) — Form + portrait
7. Footer (5942–6147px) — Lime bar

### `/projects` (Original: 5546px total height)
1. Hero heading (0–453px) — "Featured Projects" + description
2. Featured projects (453–3800px) — 4 sticky-stacking cards
3. More Projects (3800–5341px) — 4 compact cards in 2-col grid
4. Footer (5341–5546px) — Lime bar

### `/blogs` (Original: 3303px total height)
1. Hero heading (0–453px) — "Design Insights & Ideas" + description
2. Pinned post (453–1103px) — Large featured blog card
3. Blog grid (1103–2978px) — 6 blog cards in 2-col grid
4. Footer (2978–3303px) — Lime bar

### `/projects/[slug]` (Original: ~6457px)
1. Hero (0–748px) — Title, category badge, metadata grid
2. Cover image (748–1348px) — Full-width 3:2 image
3. Content blocks (1348–4092px) — Problem/Solution/Challenge/Summary sections with images
4. More Projects (4092–6252px) — 6 compact project cards
5. Footer (6252–6457px) — Lime bar

### `/blogs/[slug]` (Similar structure)
1. Hero — Title, category, date, excerpt
2. Cover image — Full-width
3. Content blocks — Article sections
4. Newsletter CTA — Lime card with subscribe button
5. More to Discover — 2 related blog cards
6. Footer — Lime bar
