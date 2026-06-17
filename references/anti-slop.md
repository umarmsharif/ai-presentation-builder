# Anti-slop reference — impeccable catalogue mapped to v5

## Purpose

This file catalogues the impeccable "slop" findings: the visible tells that a design was AI-generated. For each finding it records two things. First, whether the tell can occur in a static consulting deck rendered through pptxgenjs, versus tells that only exist in web, motion, or hover contexts. Second, the deliberate v5 "Bright White & Pine" response. The skill renders mostly to PPTX, where many CSS and motion tells are structurally impossible; HTML-output decks can additionally be passed through `npx impeccable detect` for a live check. Findings and names are taken from the impeccable registry (`antipatterns.mjs`), credited to impeccable (https://impeccable.style/slop, github.com/pbakaus/impeccable); nothing here is invented.

Tags used in the catalogue:

- `deck` — can occur in a static PPTX deck; the v5 response governs it.
- `web-only` — a CSS, hover, or motion tell with no analogue in PPTX. Irrelevant to a rendered deck, but relevant for HTML-output decks run through impeccable.
- `voice` — a copy tell already barred by the voice gate (`voice-check`); recorded here so all tells sit in one place.

---

## The v5 reversals

These eight findings drove the v4 (Burgundy & Brass) to v5 (Bright White & Pine) redesign. Each was a v4 default that the catalogue flags as a tell:

- **Cream / beige palette** → bright `surface` (`FCFCFA`) ground; cream never reintroduced.
- **Single font for everything** → a configurable display font (default Charter, chosen per deck) paired with Manrope body; an intentional all-sans Manrope-Bold display is allowed (the single-family advisory is consciously accepted, weight hierarchy mitigates it).
- **Side-tab accent border** → emphasis by type weight, full-width hairline, full fill, and whitespace; no one-side bars.
- **Hero eyebrow / pill chip** → a plain tracked breadcrumb is the only top-left label; no floating chip above titles.
- **Numbered section markers (01 / 02 / 03)** → worded section identity carries the divider; no oversized digit.
- **Gradient text** → solid `ink` or `accent` for all text and figures.
- **AI color palette** (purple / violet / cyan) → deep pine `12564A` accent on a cool neutral system.
- **Dark mode with glowing accents** → bright ground; the one full accent fill is the closing band, no glow shadows.

---

## The full catalogue

40 deterministic registry rules across 8 sections (the public catalogue calls it "46 patterns" once the LLM-review-only tells are added). Four rules are provider-gated (GPT / Gemini) and off by default; they are listed under their section.

### Visual Details

- **Side-tab accent border** — `deck` — emphasis comes from weight, hairline, fill, and space; no coloured stripe down a card edge.
- **Border accent on rounded element** — `deck` — callout strips are full fills, not accent borders on rounded cards.
- **Hairline border with wide shadow** (gated: gpt) — `deck` — panels commit to a defined edge or a soft elevation, not both at once.
- **Repeating-gradient stripes** (gated: gpt) — `web-only` — pptxgenjs has no repeating-gradient surface decoration; surfaces stay plain.

### Typography

- **Overused font** — `deck` — a configurable display font (default Charter) paired with Manrope body; Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk are barred.
- **Single font for everything** — `deck` — a display + body pairing is the default; an intentional all-sans Manrope-Bold display is allowed (single-family advisory consciously accepted, weight hierarchy mitigates).
- **Flat type hierarchy** — `deck` — title, section, body, and label sizes step with clear contrast, not a flat ramp.
- **Icon tile stacked above heading** — `deck` — no rounded-square icon container above headings; the feature-card template is avoided.
- **Italic serif display headline** — `deck` — the display serif is set roman; never an oversized italic serif hero.
- **Hero eyebrow / pill chip** — `deck` — kicker integrated as a plain tracked breadcrumb, not a pill above the title.
- **Repeated section kicker labels** — `deck` — section structure carries the page; no repeated tracked-label scaffolding.
- **Oversized hero headline** — `deck` — long headlines set at title size (28–32pt), not blown to display size.
- **Crushed letter spacing** — `deck` — tracking stays optical; never crushed past where characters keep their shape.
- **All-caps body text** — `deck` — uppercase reserved for short tracked labels; never long body passages.

### Color & Contrast

- **Gradient text** — `deck` — solid colours for all text and figures.
- **AI color palette** — `deck` — pine accent on a cool neutral system; no purple / violet / cyan.
- **Cream / beige palette** — `deck` — bright `surface` ground; the warm off-white default is removed.
- **Dark mode with glowing accents** — `deck` — bright ground, no glow shadows; the lone full accent fill is the closing band.
- **Gray text on colored background** — `deck` — text on dark or accent fills is white / near-white, never washed grey.
- **Low contrast text** — `deck` — `ink` and `body` on `surface` clear WCAG AA; light pine-tint never carries primary text.

### Layout & Space

- **Nested cards** — `deck` — hierarchy is flattened with spacing, type, and hairlines; cards are not nested inside cards.
- **Monotonous spacing** — `deck` — spacing varies: tight within a group, generous between groups; no single value everywhere.
- **Numbered section markers (01 / 02 / 03)** — `deck` — worded section identity, no oversized numeral.
- **Line length too long** — `deck` — content holds a sensible measure; body never runs the full slide width unbroken.
- **Cramped padding** — `deck` — ≥ 0.18" inner padding in any bordered, tinted, or filled box; text never sits flush to an edge.
- **Content overflowing its container** — `deck` — every element respects the bottom safe edge (`y + h ≤ 6.97`) and the right edge (≤ 12.8).
- **Positioned child clipped by overflow container** — `web-only` — no overflow-clip layers in a static slide; tooltips and popovers do not exist.

### Motion

- **Bounce or elastic easing** — `web-only` — a static deck has no easing curves.
- **Layout property animation** — `web-only` — no animated width / height / padding in PPTX.
- **Image hover transform** (gated: gemini) — `web-only` — no hover state on a rendered slide.

### Copy

- **Em-dash overuse** — `voice` — max one em-dash per page; barred by the voice gate and `deck_qa.js`.
- **Marketing buzzword** — `voice` — generic SaaS phrases (streamline, empower, supercharge, world-class, next-generation) are barred.
- **Aphoristic-cadence copy** — `voice` — "Not X. Just Y." manufactured-contrast cadence is barred as a voice tell.
- **Theater framing copy** (gated: gpt) — `voice` — dismissing something as "theater" is barred; say what the thing does.

### Imagery

- **Broken or placeholder image** — `deck` — every image reference resolves to a real or generated asset; no empty or placeholder `src`.

### General quality

- **Skipped heading level** — `deck` — slide hierarchy steps in order; no jump from title to a sub-label with the middle tier missing.
- **Justified text** — `deck` — body text is left-aligned; never justified (no rivers of white).
- **Tiny body text** — `deck` — body sits at 10–12pt; nothing dips below the legibility floor.
- **Tight line height** — `deck` — body leading leaves room to breathe; not crushed below readability.
- **Wide letter spacing on body text** — `deck` — wide tracking reserved for short uppercase labels only; never body.
- **Body text touching viewport edge** — `deck` — the left margin (x = 0.533) and symmetric right edge hold; body never bleeds to the slide edge.

---

## What deck_qa.js checks

The statically-checkable tells run programmatically in `scripts/deck_qa.js`:

- Em-dash overuse (count per slide).
- Marketing buzzwords (term list).
- Gradient and banned-palette hexes (purple / violet / cyan, gradient fills).
- Single-font use (both families present).
- All-caps body text.
- Tiny body text (point-size floor).
- Justified text.
- Content overflow (bottom and right safe edges).

The remaining tells need the human / `flight-check` visual pass; they are judgement or layout-sense calls a static parse cannot make reliably:

- Side-tab accent bars and border-on-rounded (visual inspection of card edges).
- Monotonous spacing (rhythm is a perceptual call).
- Nested cards (depth reads visually, not from coordinates alone).
- AI palette judgement (whether the chosen accent reads as deliberate, beyond a check for banned hexes).
