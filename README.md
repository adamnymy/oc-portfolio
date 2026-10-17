# oc-portfolio

Portfolio of Adam HJ — computer networks student at UiTM Jasin. A
responsive, no-build site: static HTML, two small CSS files, one JS file,
and local SVG artwork.

Dark product-engineer theme on a 60/30/10 palette — dark grey-green ground,
soft bone white type and panels, soft yellow accent. See
[`design.md`](design.md) for the full system.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Hero · network globe · selected work · credentials · bio · contact band |
| `projects.html` | All five projects as a bento index |
| `about.html` | Bio · coordinates · tools · timeline |
| `contact.html` | Email card with copy control · contact rows · GitHub link |
| `work/brs.html` | Case study — Barbershop Reservation System (FYP) |
| `work/waqafer.html` | Case study — Waqafer (FELDA internship) |
| `work/pretzel.html` | Case study — Pretzel (Flutter/Firebase marketplace) |
| `work/drywallet.html` | Case study — DryWallet (offline tracker, archived) |
| `work/jom-order.html` | Case study — Jom Order (QR ordering, archived) |

## Structure

```
.
├── index.html
├── about.html
├── contact.html
├── projects.html
├── favicon.svg
├── work/               # five case-study pages
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

## Deploying

Hosted with GitHub Pages from the `main` branch — the repo root is the
site and there is no build step, so any push to `main` goes live.

One-time setup if the site 404s: repo **Settings → Pages → Source:
Deploy from a branch → `main` / `(root)`**.

Expected URL: <https://adamnymy.github.io/oc-portfolio/>

## Customizing

- **Content** — names, links, and contact details live in each page’s
  markup; education/experience entries in `about.html`; project case
  studies in `work/*.html`.
- **Colours** — change tokens in `css/tokens.css` only. Keep the dark
  ground to ~60%, bone to ~30%, and yellow to ~10%.
- **Fonts** — `--font-display` (Space Grotesk), `--font-body` (Inter), and
  `--font-mono` (JetBrains Mono); the Google Fonts `<link>` in each page’s
  `<head>` must match.
- **Project art** — replace `assets/work/*.svg` with real 16:10 images and
  update the `alt` text. Keep the `width`/`height` attributes.
- **Signal panel** — the wireframe globe is inline SVG in `index.html`;
  its styling and animations live in the `.signal__map` rules in
  `css/styles.css`.

## Notes

- No invented metrics, testimonials, logos, or screenshots — the work is
  described, not scored. Archived projects (DryWallet, Jom Order) say so.
- Works without JavaScript; all motion (hover, reveal, globe animation) is
  disabled under `prefers-reduced-motion`.
- Mobile nav is a real toggle with `aria-expanded`, Escape, and outside-click
  dismissal.
- Every page carries Open Graph meta tags for link previews.
- No build step and no npm dependencies.
