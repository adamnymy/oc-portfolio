# Design system

**Genre** product-engineer · **Theme** Signal · **Mode** dark · built by hand.
Every colour, font, size, radius, and shadow lives in
[`css/tokens.css`](css/tokens.css); components in
[`css/styles.css`](css/styles.css) only reference tokens.

## Philosophy

Direct, technical, and current. The page should read like a working
engineer’s console, not a marketing deck: one clear claim, real project
evidence, and enough structure to scan without decoration getting in the
way. Depth comes from layered dark surfaces, light bone panels, and one
confident accent — never from noise.

## Colour — 60 / 30 / 10

| Token | Value | Share | Role |
| --- | --- | --- | --- |
| `--color-ground` | `#232C27` | ~60% | page ground, nav, dark sections |
| `--color-ground-2` | `#2A342E` | — | raised dark surfaces and cards |
| `--color-ground-3` | `#323D36` | — | spare dark step |
| `--color-bone` | `#F0EBDD` | ~30% | type on dark, light panels, hairlines |
| `--color-bone-2` | `#E6DFCD` | — | spare bone step |
| `--color-bone-muted` | `#C9C4B6` | — | secondary text on dark |
| `--color-yellow` | `#E8D98F` | ~10% | CTA fill, active/hover, focus, status dot |
| `--color-yellow-2` | `#F1E6AD` | — | accent hover |
| `--color-yellow-ink` | `#232C27` | — | text on yellow |

The accents are only: primary buttons, current-page marker, one hero word,
status dots, timeline nodes, active arrows, and focus rings. Bone panels
carry dark-green ink (`--color-on-bone`); yellow is never used as text on
bone. Focus rings are yellow on dark surfaces and dark green on bone.

Contrast at the core pairings: bone on ground **12.1:1**, yellow on ground
**10.1:1**, ground on yellow **10.1:1**, muted bone on ground **8.3:1**.

## Typography

- **Display** — Space Grotesk 500/600/700. Tight tracking (`-0.03em` to
  `-0.045em` on the hero), balanced wrapping.
- **Body** — Inter 400/500/600, `1.65` line height.
- **Outlier** — JetBrains Mono for labels, meta, indices, stack lines,
  buttons, nav, and the wordmark. Uppercase `0.08em`–`0.12em` for `.eyebrow`.
- Fluid scale from 16px to a 6rem hero. `max-width` on prose (`62ch`) and
  the signal panel. No italic headings.

## Space & shape

4pt-ish scale `--space-2xs … --space-4xl`. Radii: 8/14/22px plus pills for
buttons and tags. One card shadow (`--shadow-card`) and one lift shadow
(`--shadow-lift`); no glow except the low-opacity accent wash in the signal
panel. Sizing, colour, radius, and motion values are tokens only.

## Layout

- **Nav**: sticky, translucent dark ground with a hairline base. Wordmark
  left, mono links and an accent CTA right. Mobile uses a real toggle button
  with an accessible dropdown — no hidden content without JS.
- **Hero**: status pill, oversized claim with one yellow phrase, short lede,
  two actions; paired with a coded wireframe-globe panel (no fake app
  screenshots).
- **Tech strip**: hairline band with mono stack names.
- **Project cards**: 12-column bento grid — 7/5 then full-width, or 7/5 then
  4/4/4 on the index. Bone media area, dark body, tag pills, arrow that fills
  yellow on hover. The title link covers the card.
- **Stats / facts**: bone panels with dark ink, used for the 30% light
  counterweight.
- **Timeline**: hairline spine, yellow node, mono period column, prose entry.
- **Contact**: large bone panel with a dark ground button and an oversized
  email address; contact page adds a copy-email control.
- **Case studies**: eyebrow → title → media → facts panel → numbered
  Problem / Approach / Outcome sections → prev/next case nav.
- **Footer**: brand + tagline, mono link row, copyright meta.

## Motion

Short, functional transitions only: hover lift on cards, arrow fills, link
colour, reveal-on-scroll (`IntersectionObserver`, 18px rise). The status dot
pulses, broadcast rings expand from the globe core, and link dashes flow
slowly. Everything flattens under `prefers-reduced-motion`; content is
visible immediately when JS is off.

## JS budget

One script, four jobs: footer year, accessible mobile nav, copy-email
feedback, and progressive reveal. No framework, no build step, no
dependencies.

## Pages

- `index.html` — hero + network signal, stack strip, three featured cards,
  credentials, bio split, contact band.
- `projects.html` — all five projects, each with a case study.
- `about.html` — intro, coordinates panel, tool groups, timeline.
- `contact.html` — email card with copy control, contact rows, GitHub band.
- `work/brs.html`, `work/waqafer.html`, `work/pretzel.html`,
  `work/drywallet.html`, `work/jom-order.html` — case studies.

## Assets

`assets/work/*.svg` are local, typographic placeholders sized 16:10. They
exist so layout and loading behaviour are real before screenshots arrive.
Replace them with 16:10 images at the same paths (or update the `src`), keep
`width`/`height`, and write descriptive `alt` text. Do not add invented app
chrome or fake screenshots.

## Voice

Declarative, specific, technical. Name the concrete thing. No hype
adjectives (seamless / robust / cutting-edge / leverage / unlock), no
invented metrics, no testimonials, no skill percentages.

## Bans

No `#000`/`#FFF`, no rainbow gradients, no glassmorphism beyond the nav
backdrop, no heavy glows, no fake terminals or app screenshots, no skill
bars, no contact form, no carousels, no decorative code samples, no inline
colour or font values, no italic headings.
