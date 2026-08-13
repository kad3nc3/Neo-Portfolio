# Monochrome Motion Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing Neo Belolo React portfolio into a premium monochrome, motion-led portfolio while preserving the existing content, Flask backend, resume, and contact flow.

**Architecture:** Keep the current React + Tailwind + Framer Motion structure. Add focused motion primitives and richer visual layers in the existing app/components rather than introducing a new UI framework. Use CSS pseudo-elements and Framer Motion for responsive, GPU-friendly ambient animation, with reduced-motion fallbacks.

**Tech Stack:** React 19, Framer Motion 12, Tailwind CSS 3, lucide-react, Vite 8, Vitest.

## Global Constraints

- Keep all existing portfolio content and links unless a visual-only change requires markup movement.
- Use a professional monochrome palette: near-black, charcoal, white, and gray; remove teal/blue/purple accent colors.
- Keep Framer Motion and existing responsive behavior.
- Respect `prefers-reduced-motion` and keyboard accessibility.
- Do not change Flask/API behavior.
- Do not add a large UI framework or database.

---

### Task 1: Establish monochrome design tokens and ambient motion layers

**Files:**
- Modify: `frontend/src/styles.css`
- Test: `frontend/src/App.test.jsx`

**Interfaces:**
- Produces stable utility/component classes used by the rest of the redesign: `mono-grid`, `ambient-orb`, `noise-overlay`, `glass-card`, `motion-line`, `mono-chip`, `button-primary`, `button-secondary`.

- [ ] **Step 1: Write the failing test**

Add an assertion that the rendered home section contains the existing identity card and monochrome hero hooks such as `code-card` and `hero-grid`.

- [ ] **Step 2: Run the focused test**

Run: `cd frontend && npm test -- --run src/App.test.jsx`
Expected: PASS before CSS changes; this protects existing structure while the visual layer changes.

- [ ] **Step 3: Implement monochrome tokens and layers**

Replace colored Tailwind-oriented CSS rules with neutral variables and classes. Use white/gray borders, subtle radial gradients that resolve to gray, moving grid lines via CSS keyframes, a soft noise layer, and neutral focus states.

- [ ] **Step 4: Run the focused test again**

Run: `cd frontend && npm test -- --run src/App.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/styles.css frontend/src/App.test.jsx
git commit -m "style: establish monochrome motion system"
```

---

### Task 2: Redesign the navigation into a premium monochrome header

**Files:**
- Modify: `frontend/src/components/Navbar.jsx`
- Modify: `frontend/src/styles.css`

**Interfaces:**
- Keeps the existing navigation IDs and mobile menu behavior.
- Adds an animated active indicator and subtle scroll-state motion.

- [ ] **Step 1: Add test coverage for navigation labels**

Verify `Home`, `About`, `Skills`, `Project`, `Education`, and `Contact` remain rendered as navigation links.

- [ ] **Step 2: Run the navigation-focused test**

Run: `cd frontend && npm test -- --run src/App.test.jsx`
Expected: PASS.

- [ ] **Step 3: Implement the new header**

Use a compact `NB` mark with monochrome hover illumination, an animated underline/active-dot treatment, translucent scroll background, and a bordered `Let's talk` button. Preserve the mobile menu with the same destinations.

- [ ] **Step 4: Verify tests**

Run: `cd frontend && npm test -- --run src/App.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/Navbar.jsx frontend/src/styles.css
 git commit -m "style: redesign monochrome navigation"
```

---

### Task 3: Rebuild the hero while preserving the code-card content

**Files:**
- Modify: `frontend/src/App.jsx`
- Modify: `frontend/src/styles.css`

**Interfaces:**
- Keeps `#home`, existing copy, GitHub URL, resume URL, and exact code-card data.
- Adds hero animation layers that consume Framer Motion's `useScroll`, `useTransform`, `useSpring`, and pointer position state.

- [ ] **Step 1: Add a regression test for hero content**

Verify the rendered page still contains `Neo Jedrick Belolo`, `Full-stack web`, `React`, `Flask`, `Build. Test. Improve.`, and `BSIT · Year 3`.

- [ ] **Step 2: Run the test to establish the baseline**

Run: `cd frontend && npm test -- --run src/App.test.jsx`
Expected: PASS.

- [ ] **Step 3: Implement the motion-led hero**

Keep the current code card but add:

```jsx
const { scrollY } = useScroll()
const heroShift = useTransform(scrollY, [0, 700], [0, -70])
const heroScale = useTransform(scrollY, [0, 700], [1, 0.96])
```

Add a small pointer-following offset for the code card using `onMouseMove`, clamp movement to a small range, and disable it when reduced motion is preferred or on touch-sized layouts. Stagger badge, greeting, name, body copy, and CTAs. Animate the code-card terminal dots, subtle scan line, and floating `Currently` badge. Add a neutral orbit/ring layer and a soft animated grid behind the card.

- [ ] **Step 4: Verify the test and production build**

Run:

```bash
cd frontend
npm test -- --run src/App.test.jsx
npm run build
```

Expected: all tests pass and Vite produces `dist` without errors.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/App.jsx frontend/src/styles.css frontend/src/App.test.jsx
git commit -m "feat: add cinematic monochrome hero motion"
```

---

### Task 4: Add motion-rich section transitions and interactive cards

**Files:**
- Modify: `frontend/src/components/Section.jsx`
- Modify: `frontend/src/App.jsx`
- Modify: `frontend/src/styles.css`

**Interfaces:**
- `Section` keeps the same public props.
- Existing skills, project, education, and contact content remains intact.

- [ ] **Step 1: Add tests for the section headings and project**

Verify `About me`, `Skills`, `Featured project`, `Education`, and `Contact` remain present.

- [ ] **Step 2: Run the focused tests**

Run: `cd frontend && npm test -- --run src/App.test.jsx`
Expected: PASS.

- [ ] **Step 3: Implement shared section entrance motion**

Use viewport-aware staggered children where helpful. Add horizontal reveal accents to section eyebrows, gently animated section dividers, and a consistent heading mask/reveal effect.

- [ ] **Step 4: Implement interactive content motion**

Enhance skill cards with subtle lift/shine motion; animate project visual placeholders on hover; make education timeline marker pulse softly; add contact-panel hover depth and focus transitions. Avoid exaggerated perpetual motion on dense content.

- [ ] **Step 5: Verify tests and build**

Run:

```bash
cd frontend
npm test -- --run src/App.test.jsx
npm run build
```

Expected: PASS and clean production build.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/Section.jsx frontend/src/App.jsx frontend/src/styles.css frontend/src/App.test.jsx
git commit -m "feat: animate portfolio sections and cards"
```

---

### Task 5: Final accessibility, motion fallback, and package verification

**Files:**
- Modify: `frontend/src/styles.css`
- Modify: `frontend/src/App.jsx`
- Modify: `frontend/src/components/Navbar.jsx`

**Interfaces:**
- No backend/API changes.
- Reduced motion must remove perpetual ambient movement and pointer-follow effects.

- [ ] **Step 1: Run the full frontend test suite**

Run: `cd frontend && npm test -- --run`
Expected: all tests PASS.

- [ ] **Step 2: Run the production build**

Run: `cd frontend && npm run build`
Expected: Vite build succeeds.

- [ ] **Step 3: Verify reduced-motion CSS**

Confirm the stylesheet contains a `prefers-reduced-motion: reduce` block that disables animation and transition durations and resets smooth scrolling.

- [ ] **Step 4: Verify no backend regressions**

Run: `cd backend && .venv/Scripts/python.exe -m pytest -q` on Windows, or the project's equivalent Python interpreter command.
Expected: backend tests pass.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/App.jsx frontend/src/components/Navbar.jsx frontend/src/styles.css
git commit -m "test: verify monochrome motion redesign"
```
