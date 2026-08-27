# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable design direction

- Preserve the approved Vietnamese content, imagery, section order, and compact mobile-first layout unless the user explicitly requests content changes.
- Favor a modern TeenCare visual treatment inspired by the reference landing page: warm cream/orange/gold gradients, soft navy contrast, layered glow, glass-like cards, and restrained ambient motion.
- Keep the page visually bright: use near-white ivory as the dominant surface and reserve cream/gold for subtle edge glows and accents. Avoid full-section yellow casts or heavy warm overlays.
- Motion should feel calm and premium, remain secondary to readability/conversion, and respect `prefers-reduced-motion`.
- Keep all primary registration CTAs on the same orange gradient treatment. Use a compact sticky bottom registration CTA during scrolling so conversion remains accessible without covering substantial content.
- The webinar has one fixed weekly session: Thursday from 20:00 to 21:30 on Google Meet. Do not ask registrants to choose a session; submit `thu-5` internally so registration, attribution, and Lead tracking remain compatible.
- Keep the three “Ba mẹ có đang...?” carousel photos as separate image assets so LadiPage exports do not depend on CSS sprite cropping.
