# Portfolio

A responsive, no-build portfolio for Adam Harith J — computer networks
student at UiTM Jasin. Static HTML, two small CSS files, one JS file, and
local SVG placeholders.

Redesigned as a dark product-engineer site on a 60/30/10 palette: dark
grey-green ground, soft bone white type and panels, soft yellow accent. See
[`design.md`](design.md).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Hero · network signal · selected work · credentials · bio · contact band |
| `projects.html` | All five projects as a bento index |
| `about.html` | Bio · coordinates · tools · timeline |
| `contact.html` | Email card with copy control · contact rows · GitHub link |
| `work/brs.html` | Case study — Barbershop Reservation System (FYP) |
| `work/waqafer.html` | Case study — Waqafer (FELDA internship) |
| `work/pretzel.html` | Case study — Pretzel (Flutter/Firebase marketplace) |

## Structure

```
.
├── index.html
├── about.html
├── contact.html
├── projects.html
├── favicon.svg
├── work/               # three case-study pages
├── assets/
│   └── work/           # five local SVG project placeholders
├── css/
│   ├── tokens.css      # the only place colours/fonts/sizes are defined
│   └── styles.css      # components, built only from tokens
├── js/
│   └── main.js         # year, mobile nav, copy email, reveal
└── design.md           # the design system
```

## Running locally

The pages load shared CSS/JS and web fonts, so serve them over HTTP:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Opening a single `.html` file directly (`file://`) may block local
sub-resource loading — use the server.

## Customizing

- **Content** — names, links, and contact details live in each page’s
  markup; education/experience entries in `about.html`; project case studies
  in `work/*.html`.
- **Colours** — change tokens in `css/tokens.css` only. Keep the dark ground
  to ~60%, bone to ~30%, and yellow to ~10%.
- **Fonts** — `--font-display` (Space Grotesk), `--font-body` (Inter), and
  `--font-mono` (JetBrains Mono); the Google Fonts `<link>` in each page’s
  `<head>` must match.
- **Project art** — replace `assets/work/*.svg` with real 16:10 images and
  update the `alt` text. Keep the `width`/`height` attributes.

## Notes

- No invented metrics, testimonials, logos, or screenshots — the work is
  described, not scored.
- Works without JavaScript; motion is hover/reveal only and disabled under
  `prefers-reduced-motion`.
- Mobile nav is a real toggle with `aria-expanded`, Escape, and outside-click
  dismissal.
- No build step and no npm dependencies.
# oc-portfolio
