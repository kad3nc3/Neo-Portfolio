# Profile Interaction and Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the header profile toggle between the character and real portrait on click/hover while adding restrained motion throughout the current monochrome portfolio.

**Architecture:** Keep the two existing profile images and drive their visual state from a small React state machine in `Navbar.jsx`. Add CSS-only ambient motion for the profile ring, nav hover underline, and existing portfolio surfaces so no duplicate content or scan overlays are introduced.

**Tech Stack:** React 19, Framer Motion, CSS, Vitest, Testing Library.

## Global Constraints

- Preserve the existing React/Vite/Tailwind architecture.
- Keep the portfolio monochrome except for the existing terminal syntax colors and status dots.
- Do not reintroduce orbit, scan, or duplicate-code overlays.
- Respect reduced-motion behavior already implemented elsewhere in the site.
- Keep the existing profile assets at `frontend/public/profile-character.png` and `frontend/public/profile.png`.

---

### Task 1: Profile hover/click state

**Files:**
- Modify: `frontend/src/components/Navbar.jsx`
- Test: `frontend/src/App.test.jsx`

**Interfaces:**
- `ProfileSwitcher` owns `lockedReal`, `hovering`, and `suppressPreview` state.
- Produces `data-profile-state` values `hovering-real`, `locked-real`, or `locked-character` for testable UI state.

- [x] **Step 1: Write the failing test**

```text
The profile test asserts hover preview, click-to-lock real photo, and click-to-toggle back to the character.
```

- [x] **Step 2: Run test to verify it fails**

Run: `cd frontend && npm test -- --run src/App.test.jsx`
Expected: test runner unavailable because the bundled working copy has no installed `vitest` executable.

- [x] **Step 3: Implement the minimal state machine**

Use `lockedReal || (hovering && !suppressPreview)` for the visible photo and suppress hover preview immediately after toggling back to the character while the pointer remains over the control.

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend && npm test -- --run src/App.test.jsx`
Expected in an installed dependency environment: profile interaction test passes.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/Navbar.jsx frontend/src/App.test.jsx
 git commit -m "feat: add click-toggle profile interaction"
```

### Task 2: Add restrained motion polish

**Files:**
- Modify: `frontend/src/styles.css`

**Interfaces:**
- `profile-nav-frame` gains subtle float/ring/glint motion.
- `.nav-link` gains a hover underline sweep.

- [x] **Step 1: Add profile motion styles**

Use `profileFloat`, `profileRingSweep`, and `profileGlint` with low-opacity white light so the portrait remains readable.

- [x] **Step 2: Add nav hover motion**

Use `.nav-link::after` to create a subtle animated light underline.

- [ ] **Step 3: Run frontend build**

Run: `cd frontend && npm run build`
Expected in an installed dependency environment: Vite production build completes successfully.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/styles.css
git commit -m "feat: add subtle portfolio motion polish"
```
