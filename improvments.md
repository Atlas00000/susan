## Improvements Plan (Quick Wins → Industry Grade)

### Weekly Implementation Roadmap

#### Week 1 — Performance & Correctness (Foundations)
- Add `priority` to above‑the‑fold `next/image` and proper `sizes`; enable `placeholder="blur"` on hero and first grid images.
- Replace any raw `<img>` with `next/image`; remove event handlers from server components.
- Fix client/server boundaries (move Framer Motion to client components; avoid handlers in server paths).
- Preload critical fonts via `next/font` and set `display: swap`.
- Lazy‑load below‑the‑fold sections and heavy widgets.
- Reduce animation density on mobile; stick to transform/opacity.

#### Week 2 — Caching, Assets & Routing Hygiene
- Serve images from `/public` with long cache headers; prefer immutable filenames when possible.
- Configure `images` in `next.config` (sizes, formats); disable production source maps.
- Add `public/favicon.ico`; remove or add stub for `/sw.js` to stop 404s.
- Resolve invalid component warnings by fixing exports/imports; ensure all nav links route to existing pages.
- Statically generate safe routes (`export const dynamic = 'error'` where applicable).

#### Week 3 — Bundle Size, Code Splitting & Monitoring
- Dynamic import heavy sections; only use `ssr: false` where required.
- Scope framer‑motion imports to components; remove unused imports and dead code.
- Add bundle analyzer to CI and cut largest offenders.
- Add Web Vitals + RUM (Vercel Analytics) and error tracking (Sentry).

#### Week 4 — Accessibility, SEO & Polish
- Ensure all buttons/links have accessible text/`aria-label`; keyboard focus states.
- Verify color contrast and reduced‑motion variants.
- Page `metadata` (title/description), canonical URLs, Open Graph/Twitter cards.
- Confirm sitemap and robots include only public, valid routes.

### Priority Table

| Item | Impact | Effort | Priority |
| --- | --- | --- | --- |
| Convert all above‑the‑fold images to `next/image` with `priority`/`sizes` | Very High | Low | P0 |
| Fix client/server boundaries (no handlers/animation in server comps) | Very High | Low | P0 |
| Add `next/font` with preload and `display: swap` | High | Low | P0 |
| Lazy‑load below‑the‑fold sections | High | Low | P1 |
| Add favicon and stop `/sw.js` 404s (stub or remove) | Medium | Low | P1 |
| Clean up invalid imports/exports causing “type is invalid” | High | Low | P1 |
| Configure image optimization in `next.config` | Medium | Low | P2 |
| Dynamic import heavy components + tree‑shake motion | Medium | Medium | P2 |
| Enable Web Vitals + Sentry | Medium | Medium | P2 |
| Accessibility pass (labels, focus, contrast, reduced motion) | Medium | Medium | P2 |
| Static generation for safe routes (`dynamic = 'error'`) | Medium | Low | P3 |
| Disable production source maps | Medium | Low | P3 |

### Notes
- Prioritize P0/P1 first for biggest performance and stability gains.
- Use CI gates for build, lint, type‑check, and Lighthouse budgets to guard regressions.


