# Design system — v5 Bright White & Pine

This is the DNA of every deck this skill produces. Read it end-to-end before editing any build script. The goal: every deck reads as if it came from the same senior operator's desk, across clients.

v5 (June 2026) is a deliberate move off the v4 Burgundy & Brass system, which leaned on patterns now widely flagged as AI-design tells — a warm-cream surface, a single type family, one-side accent bars, eyebrow pills, oversized section numerals. v5 keeps the editorial restraint but rebuilds the surface, type, and anatomy so the output reads as a chosen brand, not a reflexive default. The anti-slop posture is part of the DNA now, not a review afterthought — see `references/anti-slop.md` and §7 below.

The system: a bright near-white ground, a single pine accent used sparingly, a display serif paired with a sans body, and emphasis carried by whitespace, hairlines, and weight rather than coloured bars. The exact pptxgenjs helper bodies (`header()`, `title()`, `footer()`) live in the pattern library — this file documents the system; the library carries the implementation.

## Table of contents

1. Palette
2. Typography
3. Layout anatomy (the universal slide grid)
4. Spacing system
5. Design principles
6. What to change vs. what to lock
7. Anti-slop posture

---

## 1. Palette

A single accent plus a cool neutral system. One accent. One family of neutrals. Never introduce a third colour lightly.

### Primary (the accent)

Supplied per deck via `inputs.brand.primary_hex`. When no client hex is given it defaults to **deep pine `12564A`** — not the old burgundy, and deliberately not the purple/violet/cyan "AI palette." The accent is client-variable; everything else is locked.

Derived values computed from primary:

| Token | How it's derived | Purpose |
|-------|------------------|---------|
| `accent` | input hex (default pine `12564A`) | The one emphasis colour: active states, key labels, the single element the eye should hit first |
| `accentDark` | accent × ~0.7 luminance (`0C3D34` for pine) | Deep fills, accent-on-accent layering |
| `tint` | accent at ~8% on white (`E6EFEA` for pine) | Soft callout fills — destination panels, gentle highlights |

### Vetted accent schemes (the Step 1 colour question)

The accent is asked per deck in the Step 1 brief; pick by intent. The bright-white ground and the cool neutrals never change — only the accent and its derived `accentDark` / `tint` / `tint_border`.

| Scheme | accent | accentDark | tint | tint_border | Intent |
|---|---|---|---|---|---|
| **Pine** (default) | `12564A` | `0C3D34` | `E6EFEA` | `C9DBD2` | calm, modern, growth / sustainability |
| **Slate blue** | `1F3A5F` | `13263F` | `E7ECF2` | `CBD5E2` | corporate, finance, conservative / trust |
| **Oxblood** | `6E1423` | `4E0E19` | `F3E7E9` | `E2CCD1` | formal, establishment, classic consulting (tint leans pink — warm it if used) |
| **Client hex** | `inputs.brand.primary_hex` | ~70% luminance | ~8% on white | derived | brand-locked client work, or "match deck X from library" |

Set the four tokens in the build from the chosen row. Default is Pine, but every deck asks.

### Neutrals (always the same — v5 cool)

```
surface  FCFCFA   bright near-white — the page ground (was warm cream; do not reintroduce cream)
ink      1A1A1A   near-black — headlines, dark fills, primary text
body     45474A   cool slate — paragraph and panel body copy
mute     8A8D90   cool grey — footnotes, captions, faded labels, page numbers
line     DADEDC   hairline borders, dividers, the header rule
panel    F2F4F3   faint cool tint — subtle card backgrounds (barely off the ground)
white    FFFFFF   reversed-out text on dark/accent fills
```

### Secondary accents (rare — semantic only)

```
good     2F7A55   positive / on-target (a green distinct from the pine accent)
amber    B07D2B   brass — attention, secondary direction marks, "borderline"
risk     B23A2E   clay-red — below-target, negative, severity
tint_border  C9DBD2   border for the tint callout panel (per scheme; C9DBD2 for pine)
```

Rule: **One accent per slide for emphasis.** If three things are the accent colour, two should be neutral. The accent focuses; it does not decorate. Pine + a single brass mark is the only two-colour combination the system reaches for, and only when a direction or attention cue genuinely needs to read apart from the pine.

### Two callout-strip treatments

Callout strips come in exactly two styles; never mixed arbitrarily:

- **INK-emphasis strip** — `ink` fill, `accent` or `white` label, white body text. For **primary takeaways**: "SO WHAT", "BENCHMARK", milestones, "THE SHIFT".
- **Pine-tint strip** — `tint` fill, `tint_border` border. For **secondary/contextual callouts**: legends, compared dimensions, data caveats, destination panels.

Rule: *primary takeaway = INK-emphasis; secondary context = pine-tint.* Never place a light pine-tint strip directly below heavy dark content (e.g. gantt bars) — it reads washed-out. Convert it to INK-emphasis there.

These are **full fills**, not one-side bars. A filled strip is fine; a thin coloured border down one edge of a card is the side-tab tell and is banned (§7).

### Table and grid colour separation rule (palette-agnostic)

In any table, matrix, or multi-column grid, two colour jobs must never share one token:

| Element | Colour job | Use |
|---|---|---|
| Column / tier headers | **Structural** — always `ink` | Identifies the dimension, not the value |
| Row labels | **Role** — accent assigned to that role (one role = pine, another = amber) | Identifies the actor |
| Cell fills | **Role colour of the row** (full fill, not a left bar) | Carries the row's identity into the cell |
| Cell text on dark fill | **white** | Contrast |

Structural headers always use `ink`, never a role colour, regardless of palette. When the palette changes, role colours change; the structural/role separation does not.

---

## 2. Typography

### Two families — display serif + body sans

v5 pairs a display serif with a sans body. A single family for everything is a recognised AI tell; the pairing is the fix, and it also gives the deck a clear editorial voice.

- **Display: per-deck choice, set in the Step 1 brief.** The face is not locked to one serif; it is chosen for the deck and recorded in the token line. The vetted set — all installed, render-tested, and off the overused list — is: **Charter** (DEFAULT; editorial serif, renders clean everywhere including LibreOffice), **Palatino** (warm serif), **Iowan Old Style** (quiet serif), **Baskerville** (formal serif; renders best in PowerPoint/Google Slides, weaker in LibreOffice), and **Manrope Bold** (all-sans, modern — no serif). When a serif is chosen, set it **roman** for headlines, slide titles, section identity, and large pull-figures where elegance suits; never set the hero as oversized italic serif (that is its own tell). When the all-sans pick is chosen, the display face is Manrope set bold, leaning on weight rather than a serif for editorial contrast.
- **Body: always Manrope** (300–800) — context lines, body copy, every tracked-caps label, table text, data numerals, footers. Body never changes; only the display face is the per-deck choice.

Token convention at the top of every build:

```js
const DISPLAY = "Charter", DISPLAY_BOLD = false, FONT = "Manrope";
// headline face set per Step 1 brief, default Charter; all-sans pick: DISPLAY = "Manrope", DISPLAY_BOLD = true
```

The title helper sets its headline with `bold: DISPLAY_BOLD` so a serif pick renders roman and the all-sans pick renders bold from the same code path.

Both are installed and render in LibreOffice/PowerPoint. Avoid the overused faces that read as AI-generated: Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk. Override the display or body via `inputs.brand.font*` only with a face that has genuine character and is installed locally, or the renderer falls back.

If the display face is a serif, keep data numerals (stat cards, chart values, KPI figures) in **Manrope**, not the serif — old-style serif figures hurt scannability in dense data; the serif carries prose only: titles, section names, the occasional large editorial numeral. If the display face is the all-sans Manrope Bold pick (`DISPLAY_BOLD = true`), this split is moot — everything is already Manrope, and weight alone separates headline from data.

### Hierarchy

| Role | Family | Size | Weight | Tracking | Colour |
|------|--------|------|--------|----------|--------|
| Slide title | display font (default Charter) | 28–32 | regular if serif, bold if all-sans (`DISPLAY_BOLD`) | 0 | ink |
| Section identity (divider) | display font (default Charter) | 40–54 | regular if serif, bold if all-sans (`DISPLAY_BOLD`) | 0 | ink |
| Breadcrumb (plain, no pill) | Manrope | 10–11 | 700 | 3 | accent |
| Page number (plain, no circle) | Manrope | 10–11 | 400 | 0 | mute |
| Context line | Manrope | 13–14 | italic | 0 | accent |
| Body text | Manrope | 10–12 | 400 | 0 | body |
| Label (small cap) | Manrope | 8–10 | 700 | 3 | accent or ink |
| Footnote / footer | Manrope | 9–11 | italic / 400 | 0 | mute |

Rule: **Tracked caps for SHORT labels only.** A label that is small, bold, and uppercase gets tracked 2–3 units. Never track body text, and never set long passages in uppercase — both are legibility tells.

---

## 3. Layout anatomy — the universal slide grid

Every content slide shares the same anatomy. The reader learns it by slide 3 and reads content, not orientation. v5 strips the v4 chrome (the breadcrumb pill, the pagination circle, one-side accent bars, the headline underscore) down to plain type and one hairline.

```
┌────────────────────────────────────────────────────────────────┐
│ BREADCRUMB · SECTION                                  15 / 61  │  ← plain tracked breadcrumb (accent) + plain page number (mute)
│ ─────────────────────────────────────────────────────────────  │  ← single header hairline (line), y = 0.8
│ Context: one italic sentence framing before data (accent).      │  ← context line, y = 1.0
│                                                                  │
│ Slide title — display font (default Charter), 28–32pt            │  ← headline, y = 1.4 (no underscore bar)
│                                                                  │
│  [ main content zone — varies by layout pattern ]               │  ← content start y = 2.55 (diagrams 2.60)
│                                                                  │
│ ─────────────────────────────────────────────────────────────  │  ← footer divider, y = 7.05
│ italic footnote, source/caveat              Client | N of total │  ← footer (mute), y = 7.067
└────────────────────────────────────────────────────────────────┘
```

### Key coordinates (landscape 13.333 × 7.5 inches)

| Element | Value | Note |
|---|---|---|
| Left margin | x = 0.533 | content and frame share it |
| Breadcrumb / page number | y = 0.42 | plain text, no pill, no circle |
| Header hairline | y = 0.8 | the only rule at the top; replaces the pill chrome |
| Context line | y = 1.0 | italic, accent |
| Headline | y = 1.4 | display font (default Charter); no accent underscore |
| Content start | y = 2.55 (diagrams 2.60) | not 2.8 — that leaves a loose gap and risks overflow |
| Content right edge | ≤ 12.8 | symmetric with the left margin; never bleed to the slide edge |
| Footer divider | y = 7.05 | hairline above the footer |
| Bottom safe edge | y + h ≤ 6.97 | no element above the footer crosses this |

Helper bodies (`header()`, `title()`, `footer()`) are in the pattern library — copy them verbatim.

### Title slide

A bright `surface` ground (no dark rail, no cream). Brand/client name as a plain tracked label (not a pill), a large display-font title, author/date in Manrope italic, and a thesis statement in a `tint` panel — a full fill with a `tint_border`, not a one-side accent bar. No floating eyebrow chip above the title.

### Section divider

A worded section title in large display font plus a full-width hairline and a one-line preview. **No oversized numeral** (the 01/02/03 tell). The phase the section belongs to may sit as a small tracked label; the section's name carries it, not a giant digit.

---

## 4. Spacing system

pptxgenjs has no real grid, so enforce one by convention — and vary it (uniform spacing everywhere is a tell):

- **Gutters:** 0.18–0.25" between adjacent panels
- **Group vs. section spacing:** tight within a group, generous between groups — do not use one spacing value everywhere
- **Callout padding:** ≥ 0.18" inner padding inside any bordered, tinted, or filled box; text never sits flush to an edge
- **Row height in tables:** 0.21" minimum for legibility
- **Gantt bar height:** 0.21"

Every y-coordinate sits on a logical baseline. No element above the footer has `y + h > 6.97`.

---

## 5. Design principles

**1. One idea per slide.** Two titles means two slides.

**2. Context before data.** Every slide opens with a context line so the reader knows why they are looking before their eye lands on a number.

**3. Accent sparingly.** The eye should land on one accent element first. More than one means something is wrong.

**4. Austerity signals confidence.** Whitespace is not wasted. Dense slides read as insecure.

**5. Footer discipline.** Every content slide: italic footnote (source/method/caveat) left, `Client | N of total` right.

**6. Display font for prose, Manrope for everything else.** Display-font titles and section names (default Charter; chosen per deck in the Step 1 brief); Manrope for labels, body, and all data. When the display face is a serif, the serif/sans contrast is half of what makes the deck read editorial rather than generated. When the all-sans Manrope Bold pick is chosen, the same job is carried by weight hierarchy instead of a serif — an allowed conscious choice, not a single-font slip.

**7. Emphasis by weight and space, not bars.** No one-side accent bars on cards or panels. Carry emphasis with type weight, a full-width hairline, a full fill, or whitespace.

**8. Every visible band carries information.** A band, strip, or column that holds no data is decoration — delete it.

**9. The closing band earns its full accent fill.** The last content slide is the one place a full-bleed accent fill belongs. It is the punctuation mark.

**10. Structural colour and role colour never share a token.** Column/tier headers use `ink`; row labels and cell fills use the role colour. Holds regardless of palette.

---

## 6. What to change vs. what to lock

### Change per deck (flexible, via inputs.json)

- Primary accent colour (defaults to pine `12564A`)
- Display / body face — only a characterful, installed alternative off the overused list
- Content, slide plan, pattern selection
- Inclusion of appendix and briefing
- Client / presenter / audience / date

### Lock (the v5 signature)

- Bright `surface` ground — never reintroduce a cream/beige default
- The two-family pairing (display serif + body sans) — never collapse to one family
- The stripped anatomy: plain breadcrumb + hairline, plain page number, no one-side accent bars, no eyebrow pill, no oversized section numeral
- The cool neutral palette and the one-accent principle
- The two callout-strip treatments (INK-emphasis, pine-tint)
- The footer structure

If you want to change something locked, ask whether a variant skill is warranted instead.

---

## 7. Anti-slop posture

v5 was rebuilt against the impeccable "slop" catalogue (46 AI-design tells). The full mapping — every finding, whether it applies to static decks, and the deliberate v5 response — lives in `references/anti-slop.md`, and the statically-checkable rules run in `scripts/deck_qa.js`. The headline reversals from v4:

- **No cream/beige ground** → bright `surface` instead.
- **No single font** → a display font (default Charter, chosen per deck) paired with Manrope; an all-sans Manrope-Bold pick is an allowed conscious choice, mitigated by weight hierarchy.
- **No one-side accent bars** (the side-tab tell) → emphasis by weight, hairline, fill, space.
- **No eyebrow/kicker pills, no repeated tracked-label scaffolding** → a plain breadcrumb is the only top-left label.
- **No oversized section numerals (01/02/03)** → worded section identity.
- **No gradient text, no purple/violet/cyan palette, no dark-mode glow.**
- Copy tells (em-dash overuse, marketing buzzwords, aphoristic "Not X. Just Y." cadence) were already barred by the voice gate; anti-slop.md keeps them in one place.

The point is not to chase a detector. It is that a deck which reads as generated loses the room. v5 spends its restraint on looking deliberate.
