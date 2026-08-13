# Neo Belolo Monochrome Motion Redesign

## Goal

Turn the existing portfolio into a premium monochrome, editorial-style developer site with substantially richer motion while preserving the current content, links, Flask backend, resume, and contact workflow.

## Visual Direction

- Near-black background with charcoal surfaces and white/gray typography.
- No teal, blue, purple, or colored gradients.
- Thin borders, soft glass surfaces, oversized typography, asymmetric spacing, and subtle ambient light.
- The current code-editor hero identity card remains the visual anchor.

## Hero

- Preserve the exact current code snippet content and `BSIT · Year 3` status card.
- Add staged entrance animation for status, name, copy, and actions.
- Add scroll-linked parallax and slight scale reduction.
- Add a restrained pointer-follow tilt/offset to the code card on non-touch devices.
- Add a moving grid, orbit ring, scan line, and subtle floating light dots.
- Keep the motion tasteful and disable it for reduced-motion users.

## Navigation

- Retain all destinations and mobile navigation.
- Use a clean monochrome `NB` mark, active navigation indicator, translucent scrolled state, and restrained hover lighting.

## Sections

- Keep current About, Skills, Projects, Education, and Contact content.
- Add consistent section reveal motion and animated accent lines.
- Make skill/project/education/contact cards subtly interactive with hover depth and light sweeps.

## Accessibility

- Preserve semantic links, buttons, focus rings, and mobile menu controls.
- Respect `prefers-reduced-motion` and avoid requiring animation to understand content.
- Keep contrast high and content text-extractable.

## Non-goals

- No backend changes.
- No new database.
- No new major UI framework.
- No content fabrication.
