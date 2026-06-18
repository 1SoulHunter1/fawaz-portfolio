# Missing Features — Prioritized Implementation List

> Derived from the full audit. Ordered by impact (highest first).

---

## P0 — Critical (site is incomplete without these)

### 1. About Page (`/about`)
**Route:** `src/app/about/page.tsx`
**Sections to build:**
- Hero: "ABOUT ME" heading + "DUNCAN ROBERT" name + portrait image (green-tinted)
- Bio paragraph + 4 social icon links (X, Instagram, Behance, Dribbble)
- "WHAT I CAN DO FOR YOU" — condensed services list (4 items, no accordion)
- "DISCOVER MY JOURNEY IN DESIGN" — career timeline:
  - Art Director — Creative Studio 101
  - Senior UI/UX Designer — (company)
  - UI Designer — (company)
  - Graphic Designer — (company)
  - Each entry has: role title, company, approximate year range
- "MY TECH STACK" — grid of tool/skill badges
- "DESIGN WITH STRATEGY AND CREATIVITY" — 5 numbered process cards:
  - 01. Research & Strategy
  - 02. Concept & Ideation
  - 03. Feedback & Refinement
  - 04. Testing & Optimization
  - 05. Launch & Delivery
- Contact section (reuse `ContactSection` component)
- Footer

### 2. Projects Listing Page (`/projects`)
**Route:** `src/app/projects/page.tsx`
**Sections to build:**
- "FEATURED PROJECTS" heading + subtitle
- 4 featured project cards (identical to homepage — extract shared component)
- "MORE PROJECTS" heading
- Grid (2-column) of additional project cards:
  - Pantone Very Peri Poster Design (Graphic Design)
  - Intrada Brand Boutique E-Gift Card Design (Graphic Design)
  - Videaaken (Branding)
  - Immobitech Identity Rollout (Branding)
- Footer

### 3. Project Detail Pages (`/projects/[slug]`)
**Route:** `src/app/projects/[slug]/page.tsx`
**Sections to build:**
- Navbar (different variant — shows text links: Home, About, Projects, Blogs, Contact)
- Hero: category badge + project title + cover image
- Metadata row: Date | Role | Duration | Platform
- Content sections with h2 headings:
  - PROBLEM — paragraph
  - SOLUTION — paragraph
  - CHALLENGES — paragraph
  - SUMMARY — paragraph
- Project image gallery (2–3 images)
- "MORE PROJECTS" — 2×3 grid of related project cards
- "GET HIRE" CTA pill button (links to `/#contact`)
- Footer
**Data for 4 projects:** summer-vibes-festival-campaign, coral-spiral-abstract, shopease-redesign-sprint, black-geometric-prisms

### 4. Blog Listing Page (`/blogs`)
**Route:** `src/app/blogs/page.tsx`
**Sections to build:**
- "DESIGN INSIGHTS & IDEAS" heading + subtitle
- "MOST VIEWED" featured blog card (large, full-width)
- Blog post grid (2-column, mixed card sizes) — at least 6 posts:
  1. How to Streamline Your Design Workflow (Tutorials, Apr 27 2025)
  2. 5 Design Trends That Will Define 2024 (Insights, Apr 30 2025)
  3. The Power of Typography in Web Design
  4. The Role of Color Psychology in Branding
  5. Mastering UI/UX Design: Key Principles for Success
  6. Balancing Creativity and Functionality in Design
- Footer

### 5. Blog Post Pages (`/blogs/[slug]`)
**Route:** `src/app/blogs/[slug]/page.tsx`
**Sections to build:**
- Navbar (text links variant)
- Title (large Antonio heading)
- Metadata: category badge + date
- Hero image
- Numbered content sections (1–5), each with:
  - Numbered heading (e.g., "1. 3D Lettering and Bubble Type")
  - Paragraph text
  - Section image
- "YOU MAY ALSO LIKE" related articles (2-column grid, 2 cards)
- Footer

---

## P1 — High (core UX/interaction fidelity)

### 6. Custom Cursor / Mouse Follower
**Files:** New component `src/components/CustomCursor.tsx`, add to `layout.tsx`
**Behavior:**
- 16×16px circle, `background: #d0ff71`, `border-radius: 99px`
- `position: fixed`, `z-index: 13`, `pointer-events: none`
- Follows mouse position with slight spring/lerp delay (~100ms)
- Grows on hover over interactive elements (links, buttons) — e.g., scales to 40–60px
- Possibly grows further on project card hover
- Hidden on mobile/touch devices
**Implementation:** Use `mousemove` event listener + CSS transform or Framer Motion's `useSpring`

### 7. Hero 3D Card-Flip Parallax
**File:** `src/components/HeroSection.tsx`
**Current:** Single flat front-view image
**Required:**
- Render both `portrait-back.jpeg` (back) and `portrait-front.jpg` (front) as stacked layers
- Apply `transform-style: preserve-3d` to the container
- Use `matrix3d` transforms to create a 3D card-flip perspective
- Add mouse-tracking: images subtly rotate on X/Y axis following cursor position
- Use GSAP or Framer Motion for smooth mouse-track interpolation

### 8. Scroll-Triggered Entrance Animations
**Files:** All section components
**Required:**
- Fade-in-up animation on scroll for section headings
- Staggered entrance for list items (services, FAQ items, project cards)
- Use `react-intersection-observer` (already installed) + Framer Motion's `motion.div` with `whileInView`
- Stagger: ~100ms delay between child elements
- Duration: ~600ms per element
- Easing: Framer-style spring or `ease-out`

### 9. Services Section Accordion
**File:** `src/components/ServicesSection.tsx`
**Current:** All 4 categories always expanded
**Required:**
- Only one category expanded at a time (or all collapsed by default)
- Click on category header toggles expand/collapse
- Add a `+` / `−` toggle icon (or chevron) to each header
- Smooth height animation on expand/collapse (use `grid-rows` technique like FAQ)
- Sub-items slide in with staggered animation

### 10. Fix Project Card Links
**File:** `src/components/ProjectsSection.tsx`
**Current:** `href="#"` on all project cards
**Required:** `href={/projects/${project.slug}}` — link to actual project detail pages

### 11. Fix Blog Card Links
**File:** `src/components/BlogSection.tsx`
**Current:** `href="#"` on all blog cards
**Required:** `href={/blogs/${blog.slug}}` — link to actual blog post pages

---

## P2 — Medium (polish & interaction fidelity)

### 12. Navbar Link Text-Swap Hover Animation
**File:** `src/components/Navbar.tsx`
**Current:** Color change on hover
**Required:**
- Each nav link shows text in a container with `overflow: hidden`
- On hover, the text slides up on Y-axis and identical text slides in from below
- Creates a "rolling/flipping" text effect
- Duration: ~200ms
- Implementation: Two stacked `<span>` elements with `translateY` transitions

### 13. "BROWSE ALL INSIGHTS" — Restyle as Pill Button
**File:** `src/components/BlogSection.tsx`
**Current:** Styled as a plain text link with arrow
**Required:** Match "BROWSE ALL PROJECTS" style — pill border, lime color, hover fill, arrow icon, `border-radius: 99px`

### 14. "MY STORY" — Restyle as Pill Button
**File:** `src/components/AboutSection.tsx`
**Current:** Styled as a plain text link with arrow
**Required:** Match "BROWSE ALL PROJECTS" style — pill border, lime color, hover fill, arrow icon, `border-radius: 99px`

### 15. Green Dot Color Fix
**File:** `src/components/Navbar.tsx`
**Current:** Uses `#d0ff71` (lime) for the "Available for work" dot
**Required:** Use `#0bde66` (vivid green) — distinct from the lime accent

### 16. CTA Button Arrow Animation
**Files:** All CTA pill buttons (Browse All Projects, Browse All Insights, My Story, Submit)
**Required:** Arrow icon translates right ~4px on hover, with a slight spring animation

### 17. Footer Layout Refinement
**File:** `src/components/Footer.tsx`
**Current:** Single flex row
**Required:**
- First row: Email + Phone + Social icons (with "Social :" label)
- Divider line
- Second row: Copyright text (left) + "Created by" + logo + name (right)

### 18. "Hi" Wave Circle Element
**Files:** `src/components/HeroSection.tsx`, `src/components/ContactSection.tsx`
**Current:** Flat inline "Hi" + emoji
**Required:**
- Circular container (lime bg `#d0ff71`)
- "Hi" text inside + wave emoji image/SVG next to it
- Possibly has a rotating border or ring animation
- Appears in both hero and contact sections

---

## P3 — Low (fine-tuning & polish)

### 19. Page Transition Animations
**File:** `src/app/layout.tsx` or new template component
**Required:** Smooth fade or slide transitions between pages using Framer Motion's `AnimatePresence`

### 20. Smooth Scrolling (Lenis)
**File:** `src/app/layout.tsx` or new provider
**Note:** `lenis` is already in `package.json` dependencies but not initialized
**Required:** Initialize Lenis for smooth scroll behavior across the site

### 21. Navbar Spring Animation
**File:** `src/components/Navbar.tsx`
**Current:** CSS `duration-300` transition
**Required:** Spring physics for expand/collapse (use Framer Motion `layout` animation or GSAP spring)

### 22. FAQ Row Hover Highlight
**File:** `src/components/FAQSection.tsx`
**Required:** Subtle background highlight on FAQ row hover (e.g., `hover:bg-white/5`)

### 23. Blog Card Border Glow on Hover
**File:** `src/components/BlogSection.tsx`
**Required:** Border color transitions to lime (`#d0ff71`) on hover

### 24. Contact Form Input Side-by-Side
**File:** `src/components/ContactSection.tsx`
**Current:** Name and Email stacked vertically
**Required:** Name and Email side-by-side on desktop (`grid-cols-2`)

### 25. Timing Alignment
**Files:** Various components
**Required adjustments:**
- Navbar expand: switch from CSS 300ms to spring physics
- Project card zoom: verify 500ms matches original
- FAQ accordion: verify timing
- Blog card hover: add spring easing
- Counter animation: verify 2000ms matches original

---

## Assets Needed for New Pages

### Images to Download
- About page portrait (green-tinted variant)
- Tech stack tool logos/icons
- Additional project cover images (Pantone, Intrada, Videaaken, Immobitech)
- Additional project gallery images for each project detail page
- Additional blog post cover images (4 more posts)
- Blog post content images (section images within each post)

### Data to Extract
- Career timeline entries (roles, companies, years)
- Tech stack items (tool names, icons)
- Project detail content (problem, solution, challenges, summary text for each)
- Blog post full content (all 6+ posts)
- Additional project metadata (dates, roles, durations, platforms)

---

## Implementation Order (Recommended)

1. Fix existing links (P1: #10, #11) — quick wins
2. Fix green dot color (P2: #15) — quick win
3. Initialize Lenis smooth scroll (P3: #20) — already in deps
4. Services accordion (P1: #9) — improves existing page
5. Scroll-triggered animations (P1: #8) — improves existing page
6. Custom cursor (P1: #6) — global polish
7. Hero 3D parallax (P1: #7) — hero polish
8. Restyle buttons (P2: #13, #14) — consistency
9. Nav text-swap hover (P2: #12) — interaction fidelity
10. About page (P0: #1) — new page
11. Projects listing (P0: #2) — new page
12. Project detail pages (P0: #3) — new pages
13. Blog listing (P0: #4) — new page
14. Blog post pages (P0: #5) — new pages
15. Footer refinement (P2: #17) — polish
16. Remaining P2/P3 items — final polish
