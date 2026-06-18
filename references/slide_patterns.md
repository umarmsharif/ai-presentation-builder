# Slide Patterns Master Catalog

Authoritative catalog of every layout the skill can render. Each entry carries:

- `id` — the value used in `slides[i].layout` in `inputs.json`
- `density` — metadata only as of 2026-05-15. One of `sparse / light / medium / heavy`. Describes the pattern's visual cognitive load. **Does NOT filter the picker.** Surfaced to Claude's per-slide recommendation step as soft context, alongside slide title, slide_volume, and audience.
- `role` — what the slide *does* with its content. One of `frame / compare / decompose / rank / sequence / show-change / narrow / attribute-ownership`. Half of the coverage grammar (see "Role × arrangement coverage" below).
- `arrangement` — how the slide lays its elements out. One of `none / row / column / grid / cascade / axis / convergence / cycle / timeline`. The other half of the coverage grammar.
- `archetypes` — which deck archetypes the pattern naturally suits. This IS the filter that `pattern_filter.js` uses.
- `source` — informational provenance: `core` (foundational), `legacy` (earlier-generation set), or `extended` (added later). Metadata only; the filter does not read it.
- A short anatomy + when-to-use note
- The implementation reference (which file in `references/` carries the pptxgenjs recipe)

**Why density stopped being a filter (2026-05-15):**

Density was originally a layout-catalog filter. A 2026-05 test run across the 6×4 (archetype × density) matrix surfaced 10 dead zones at low/none density that didn't reflect real taste gaps — they reflected tagging being too coarse to map onto good slide judgment. The picker is per-slide AskUserQuestion (human-driven), so it doesn't need a coarse filter upstream. Filters that protect against picker mistakes don't belong in a skill where the picker is human-driven.

Density tags remain useful as metadata for Claude's recommendation step — knowing a pattern is `heavy` informs whether to recommend it for a 3-slide CEO read-out. But the picker shows everything that matches the archetype.

`scripts/pattern_filter.js` reads this file, filters by archetype only, and returns the full eligible list. The ghost-deck step (SKILL.md §1.5) feeds that list into the per-slide `AskUserQuestion` picker, alongside a Claude-synthesised pick for the specific slide.

---

## Pattern Index

| id | density | role | arrangement | archetypes | source |
|---|---|---|---|---|---|
| `title-bookend` | sparse | frame | none | all | core |
| `section-divider` | sparse | frame | none | all | core |
| `closing-ask` | sparse | frame | column | recommendation, pitch, transformation | legacy |
| `stat-row` | sparse | narrow | row | diagnostic, recommendation | core |
| `big-numeral-findings` | sparse | narrow | none | diagnostic | core |
| `diagnostic-three-panel` | light | decompose | column | diagnostic, recommendation | legacy |
| `numbered-pillars` | light | decompose | row | recommendation, transformation, pitch | legacy |
| `three-col-comparison` | light | compare | row | recommendation, market-entry | legacy |
| `metric-dashboard` | light | show-change | grid | diagnostic, recommendation | legacy |
| `lift-table` | light | rank | grid | diagnostic | core |
| `prioritisation-matrix` | medium | rank | axis | recommendation, diagnostic | legacy |
| `phased-roadmap-gantt` | medium | sequence | timeline | roadmap, transformation | legacy |
| `risk-register` | medium | attribute-ownership | grid | diagnostic, transformation, pitch | legacy |
| `multi-axis-metric-table` | medium | attribute-ownership | grid | diagnostic, recommendation | core |
| `operating-flow-5stage` | medium | sequence | row | roadmap, transformation | core |
| `raci-matrix` | medium | attribute-ownership | grid | transformation, roadmap | core |
| `appendix-unit-economics` | medium | compare | row | market-entry, pitch | legacy |
| `dual-line-chart-with-phase` | medium | show-change | timeline | diagnostic, roadmap | core |
| `activation-hex-funnel` | heavy | narrow | cascade | diagnostic | core |
| `commitment-cascade` | heavy | narrow | cascade | diagnostic, recommendation | core |
| `lifecycle-swimlane` | heavy | attribute-ownership | timeline | transformation, roadmap | core |
| `side-by-side-targets-with-support-band` | heavy | compare | row | recommendation, roadmap | core |
| `tier-behavior-cascade` | heavy | decompose | column | recommendation, diagnostic | core |
| `combined-targets-behaviors-matrix` | heavy | attribute-ownership | grid | recommendation, transformation | core |
| `source-to-destination-diagram` | heavy | narrow | convergence | transformation, recommendation | core |
| `milestone-bucket-funnel` | heavy | narrow | cascade | diagnostic, transformation | extended |
| `input-output-metric-split` | medium | compare | row | diagnostic, recommendation | extended |
| `lever-cards-team-badges` | medium | attribute-ownership | grid | recommendation, transformation | extended |
| `entity-milestone-comparison` | medium | compare | grid | diagnostic, market-entry | extended |
| `problem-lever-owner-arc` | heavy | sequence | row | diagnostic, recommendation, transformation | extended |
| `phased-agenda-rail` | sparse | frame | row | all | extended |
| `iterative-cycle-flow` | medium | sequence | cycle | roadmap, transformation, diagnostic | extended |
| `outcome-band-overlap` | medium | compare | axis | diagnostic, recommendation | extended |
| `layered-pyramid` | light | decompose | pyramid | recommendation, transformation, pitch | extended |
| `venn-overlap` | light | compare | overlap | recommendation, diagnostic, market-entry | extended |
| `concentric-bullseye` | light | decompose | rings | recommendation, transformation | extended |
| `positioning-spectrum` | light | rank | axis | market-entry, recommendation, diagnostic | extended |
| `hub-and-spoke` | medium | decompose | radial | transformation, recommendation | extended |
| `bowtie-flow` | medium | sequence | convergence | diagnostic, transformation | extended |
| `maturity-staircase` | medium | sequence | cascade | roadmap, transformation, diagnostic | extended |
| `nine-box-matrix` | medium | rank | grid | diagnostic, recommendation | extended |
| `radar-profile` | medium | compare | radial | diagnostic, recommendation | extended |
| `pros-cons-ledger` | light | compare | column | recommendation, pitch | extended |
| `nested-containers` | light | decompose | rings | market-entry, diagnostic | extended |

---

## Role × arrangement coverage

Every indexed pattern is tagged on two axes that together form a coverage grammar.

**`role`** — what the slide does with its content:

| role | the slide's job |
|---|---|
| `compare` | hold things side by side to be judged against each other |
| `decompose` | break one thing into its parts |
| `rank` | order items by a metric or by priority |
| `sequence` | show steps in an order — process, narrative arc, stages |
| `show-change` | show the same thing at two or more points in time |
| `narrow` | resolve many into fewer or one — funnels, synthesis, a single dominant number |
| `attribute-ownership` | a table of entities against their attributes or owners |
| `frame` | orient or transition the reader — title, divider, closing ask. Not analytical; excluded from the coverage check. |

**`arrangement`** — how the elements are laid out: `none` · `row` (side by side) · `column` (stacked) · `grid` (2-D matrix) · `cascade` (funnel / nested steps) · `axis` (placed on an x/y field) · `convergence` (many resolving to one) · `cycle` (stages that loop back to the start — iterative or always-on processes) · `timeline` (along a time axis).

**Why the tags exist.** They make "does this pattern fill a real gap?" a decidable question. When a deck needs a structure not in this catalogue, check its `{role, arrangement}` against the matrix: if no catalogued pattern occupies that cell, the new structure fills a genuine gap and is worth naming and adding; if the cell is already filled, the new structure is a restyle of something you already have, so reuse the existing pattern. The matrix turns a judgement call into a lookup.

Scanning the two tag columns shows the empty cells. As of this tagging, `decompose × timeline` (how something breaks apart over time) and `rank × timeline` (rankings shifting across periods) are unfilled — known gaps; candidates that land there are welcome. The `cycle` arrangement currently holds only `iterative-cycle-flow`, so other roles that genuinely loop are welcome there too.

---

## Universal conventions (apply to every pattern)

Cross-pattern rules that hold regardless of layout, codified from consulting-deck house-style conventions and chart-design best practice. Patterns inherit these by default; pattern-specific overrides go in the pattern's anatomy field.

**Action titles, not topic titles.** Slide headlines state the takeaway, not the subject. "India needs 90M more nonfarm jobs by 2030" — not "Employment goals." "Hitting the target is an 11-month execution problem" — not "Growth math." If the headline could fit on a chapter divider, it's not earning its place.

**Bold ties the chart to the title.** When the headline names specific numbers, segments, or categories, those elements get visual emphasis in the chart — bold text, accent color, or both. Cuts the reader's eye to what the title is talking about.

**Selective color for attention-direction.** Only message-critical elements carry the accent colour. Supporting elements stay INK (near-black) or MUTE (grey). Six coloured columns in a single chart cancel each other out; one or two coloured columns tell the eye where to look.

**Optional monoline icons.** Icons may signpost headings, stage nodes, or KPI cards — but only if monoline, single accent (white on dark / accent on light), one stroke weight, and meaningful (not decoration). Multicolor, filled, or clip-arty glyphs are a slop tell. Recipe + render-safe pipeline (Lucide → recolored PNG, never SVG-direct): `build-helpers.md` §2.34.

**No legend when ≤2 colors.** Direct-label segments with the value or category name inline. Legends force the eye to ping-pong between chart and key. Acceptable when colors exceed 3 categories; otherwise drop them. For line charts, label the line itself near its right edge — never use a legend for ≤4 lines.

**Chart honesty rules (non-negotiable).** No 3D charts under any circumstance — they distort proportionality. No borders around bars or columns. No chart-junk gridlines unless emphasizing line slope. Y-axis starts at 0 for any bar/column chart unless there's a documented reason to truncate (and the truncation gets a footer note). No comparing two pie charts side by side — readers can't compare slices across separate pies; use a 100% stacked bar.

**Bar/column ordering: logical, not alphabetical.** For bar charts (unordered categories), sort biggest to smallest unless there's a story-driven reason to break order. For column charts (ordered categories — usually time), keep the natural order (chronological, sequential). Alphabetical order on either is almost always wrong — it gives the reader no signal about magnitude or direction.

**Vary the bar idiom across adjacent slides.** The skill hand-draws bars as rectangles (native `addChart` bars/scatter degrade on the PPTX→Google Slides import — see `build-helpers.md` §2.9–2.10), and horizontal bars are the path of least resistance because they dodge the rotated-axis-label trap. That bias is fine on any one slide but reads as monotony when two or more *adjacent* slides use the same horizontal-bar treatment. These are all equally render-safe (rects + ellipses, no rotation) and break the rhythm: **dot / lollipop plot** (ranking by one value), **slope / connected-pair** (before→after, two periods), **bullet bar** (value vs target), **small-multiples** (same structure across 3–6 categories), **collapsing funnel** (sequential drop-off). When a slide would repeat its neighbour's bar idiom, switch to one of these. Copy-able recipes: dot/lollipop ranking → `build-helpers.md` §2.33; collapsing funnel → §2.7 (hex-funnel) restyled with count-scaled bars.

**Chart type fits the message, not the data shape.** Three rules:
- Mekko (column-with-width) when both share-within-category AND share-of-total matter
- Bar/column when comparing values within ONE dimension is the only message
- Pie only when share-of-a-single-total is the only message (rare in operator decks)
- Waterfall when the question is "how do we get from A to B" (decomposition of change)

**Area-scale proportional shapes.** Circles, bubbles, and any sized-by-value visualization use AREA proportionality, not radius. A "2× bigger" circle has 2× the area (radius × √2), not 2× the radius (which gives 4× area and lies to the eye).

**Number every proportional element.** Don't make the reader estimate size — print the value directly on each bar/bubble/segment. If labels won't fit inside (thin bars, small bubbles), the label goes immediately adjacent. No legends-as-substitute-for-labels.

**Footer carries source + data definitions.** Every chart slide has a footer with source attribution, time window, and any data caveats (axis breaks, exclusions, definitions). Italic MUTE, font size 9. Reader who wants to challenge the chart can locate the data.

**Waterfall-specific (cross-references waterfall-baseline-to-target):**
- Cumulative cascade — each bar starts at the previous running total, not a fixed zero-line
- Math reconciles — verify summation before render; footer states the equation
- Labels OUTSIDE bars — values above, categories below x-axis, captions further below
- Axis break only on big anchors (≥1.0" visible height); small anchors stay uncut

---

## Core v2 patterns

Full pptxgenjs implementations live in `references/build-helpers.md` sections 2.1–2.20. Each pattern below cites the section number. The schema lives in `assets/inputs.example.json`.

### `title-bookend` — sparse
CREAM background, full-height CRIMSON left bar, brand eyebrow + 2-line title. Used as the first and last slide of every deck so the artefact reads as a complete document. Implementation: §2.1.

### `section-divider` — sparse
CREAM background, oversized act number (120pt), vertical CRIMSON rule, section title + preview line. Marks act boundaries inside the narrative. Implementation: §2.2.

### `stat-row` — sparse
Four cards side-by-side, PANEL fill, 38pt bold number, 11pt label. Opens diagnostic decks with the commitment numbers. Implementation: §2.3.

### `big-numeral-findings` — sparse
One number dominates the slide (90pt+), three supporting facts arranged radially. Used when a single statistic carries the whole act.

### `dual-line-chart-with-phase` — medium
Two trajectories (realistic + linear target) on one chart, paired with a 3-phase side panel. Used when the deck argues a curve, not a point. Implementation: §2.5.

### `lift-table` — light
Five-column lift-by-behavior table (signal | window | cohort | pay rate | lift vs install), with three click-to-reveal callouts underneath. Used when the diagnosis is "these N behaviours predict conversion." Implementation: §2.8.

### `multi-axis-metric-table` — medium
Current/target/lever/source table. Today column R-bold, Target column G-bold, Source column italic MUTE. Used to convert one-pager findings into auditable claims. Implementation: §2.12.

### `raci-matrix` — medium
Role-icon column headers, R/A CRIMSON-filled cells, severity-coded supporting cells, optional compensation note bar at base. Implementation: §2.13.

### `operating-flow-5stage` — medium
Five INK-gradient cards left to right, CRIMSON oval letter badges, WH owner pills, italic metric labels, foundation workstream blocks underneath. Used for sequential processes with owners. Implementation: §2.15.

### `activation-hex-funnel` — heavy
Six hex-gradient cards (INK → AMBER → CRIMSON) showing drop-off through a sequential funnel, plus a definition panel for any non-obvious event names. Implementation: §2.7.

### `commitment-cascade` — heavy
Horizontal six-step funnel where each step is a strict subset of the previous. Replaces 2D quadrant charts that confuse frequency with conversion. Implementation: §2.11.

### `lifecycle-swimlane` — heavy
Four role rows × day-numbered timeline. Minimal typographic swimlane: lines, dots, dashed handoff arrows. No cards. Used when the story is who-owns-what-when. Implementation: §2.16.

### `side-by-side-targets-with-support-band` — heavy
Two role-coloured target tables side by side, third support role as a horizontal band underneath, bidirectional dashed connectors. Implementation: §2.17.

### `tier-behavior-cascade` — heavy
Three horizontal tier rows, each with a coloured left panel (single-word title) + three behavior cards with mechanism labels. Implementation: §2.18.

### `combined-targets-behaviors-matrix` — heavy
Top zone: phase × role totals (3 phases × 2 roles). Bottom zone: 6-cell role × tier behavior grid with mechanism text. Tier column headers stay INK; cell accents bind to the row's role colour (two-axis grid rule). Implementation: §2.19.

### `source-to-destination-diagram` — heavy
Top row of N source cards with status pills, downward chevrons, CREAM_WARM destination panel with CRIMSON left accent bar, nested capability tag cards. Used for "N siloed inputs → 1 unified output" stories. Implementation: §2.20.

---

## Extended patterns — operational frameworks

Five patterns for operational and execution-framework decks: funnels, input/output splits, lever-ownership grids, and milestone comparisons. Implementations live alongside the core patterns in the same pptxgenjs idiom (`build-helpers.md`).

### `milestone-bucket-funnel` — heavy
Four-stage activation ladder (Aware → Trial → Active → Power), each stage with current count, target count, and a 2–3 line KPI list. Stages connect with chevron arrows; per-stage current/target comparison is colour-coded against threshold. Use this when the diagnosis is "the funnel exists but the rate cards are bad," not "the funnel is missing steps."

Schema sketch:
```json
{
  "layout": "milestone-bucket-funnel",
  "content": {
    "stages": [
      { "name": "AWARE", "current": "5,200", "target": "12,000", "kpis": ["..."] }
    ]
  }
}
```

### `input-output-metric-split` — medium
NAVY left panel (inputs the team controls) | CRIMSON right arrow | CRIMSON right panel (outputs leadership tracks). Used to make the "we run inputs, we are accountable for outputs" distinction explicit. Replaces the generic 2-column comparison when one side is causal of the other.

Schema sketch:
```json
{
  "layout": "input-output-metric-split",
  "content": {
    "inputs":  { "label": "WHAT THE PM CONTROLS", "rows": [...] },
    "outputs": { "label": "WHAT LEADERSHIP TRACKS", "rows": [...] }
  }
}
```

### `lever-cards-team-badges` — medium
3×2 grid of lever cards. Each card carries a lever title, a one-line mechanism, and a team-ownership pill anchored at the card base (CRIMSON for PM, AMBER for GM, TEAL for Mentors, NAVY for CTO). Used when the deck has 4–6 distinct levers and the reader needs to know who owns each at a glance.

### `entity-milestone-comparison` — medium
Rows = entities (vendors, cohorts, products), columns = milestone tiers (e.g. Bronze / Silver / Gold). Cells colour-coded against threshold: G if entity meets that tier, A if borderline, R if below. Used for benchmark-style "where does each entity sit on the maturity curve" diagnostics.

### `problem-lever-owner-arc` — heavy
Three-slide / three-column diagnostic narrative structure: column 1 frames the problem, column 2 names the lever, column 3 names the owner + deadline. Can be rendered as a single dense slide (heavy) or split across three slides (light). The single-slide version is the heavy variant. Used when the deck needs a "we know the problem, we know the lever, here is who owns it" beat that lands in one read.

---

## Extended patterns — structural

Structural patterns for agenda/navigation, cyclical processes, and overlap comparisons. Implementations live alongside the core patterns in `references/build-helpers.md`.

### `phased-agenda-rail` — sparse
Left phase rail (the deck's macro-phases stacked as labelled blocks, each spanning the agenda rows it owns) beside a numbered agenda table (number · item · description · page). The same page reappears at each section break with the live phase in accent fill and its rows bold, the rest greyed — it serves as both the opening agenda and the running "you are here" divider. Use for layered or spine decks where the reader needs to see the whole arc and where they sit in it; `section-divider` stays the choice for a single act break with no map. Implementation: §2.31.

### `iterative-cycle-flow` — medium
Ring of numbered stage nodes around a central cadence hub, with directional chevrons on the ring showing the loop runs one way and returns to the start. Fills `sequence × cycle` — the first catalogued pattern for a process that repeats rather than ends. Use for operating-model, sprint, and always-on methodology slides; `operating-flow-5stage` stays the choice for a linear process that terminates. Built from render-safe primitives only (unfilled ellipse ring, `chevron` shapes rotated to the chord angle for direction, INK node circles, filled hub — no curved connectors, no rotated text). Implementation: §2.32.

### `outcome-band-overlap` — medium
Two horizontal outcome ranges (per-scenario confidence bands) on one shared x-axis, the overlap zone hatched and labeled. Fills `compare × axis`. Use when the message is indistinguishability: two hypotheses produce overlapping observable outcomes, so the data cannot decide between them — the overlap zone, not either band, is the slide's accent element. Direct-label both bands at their right edge (no legend); axis starts at 0; the footer carries the base rates behind the bands. Boundary: a single-scenario range or a plain ranking belongs to chart-library / `dot-lollipop-ranking`; this pattern earns its slot only when the overlap is the finding. pptxgenjs recipe: none yet — rects plus a dashed-border overlay rectangle are render-safe primitives; treat as `needs-rendering` for PPTX builds until a seed passes the render loop.

## Builder legacy patterns

An earlier-generation set, kept for backward compatibility and still fully supported.

### `diagnostic-three-panel` — light
Three numbered rows, CRIMSON oval numerals + bold headline + body. Use for the diagnostic beat in slide 2–3.

### `numbered-pillars` — light
3–5 parallel ideas, vertical or horizontal layout. Used for methodology pillars or value pillars.

### `prioritisation-matrix` — medium
2×2 with axis labels, dots placed by `(x, y) ∈ [0, 1]`, legend panel right 40%. Axis labels stay horizontal — pptxgenjs rotates per-character on narrow boxes.

### `phased-roadmap-gantt` — medium
Left workstream column (grouped by phase) + right gantt grid + bottom interdependencies bar.

### `three-col-comparison` — light
Three equal columns with coloured headers, label/value rows, optional bottom band. Use for Conservative/Base/Aggressive or A/B/C scenarios.

### `risk-register` — medium
Row-per-risk table, severity-coded ID column, R/A/G text in likelihood/impact columns, mitigation column wide.

### `metric-dashboard` — light
Grid of big-number panels showing before/after. Use sparingly — easy to over-decorate.

### `appendix-unit-economics` — medium
Three columns: baseline (INK fill, WH text) + scenarios (CRIMSON section header + sub-columns) + assumption-that-breaks-this panel (CRIMSON border). Reserve for the appendix.

### `closing-ask` — sparse
CRIMSON CTA band top, 3–4 ask rows below with date pills. Always the last content slide before the title-bookend close.

---

## Visual primitives (extended)

Eleven render-tested visual-grammar primitives (June 2026) distilled from The Grove's Group Graphics keyboard + the consulting primitive grid. Recipes in `build-helpers.md` §2.35–2.45; build + per-primitive previews in `references/visual-primitives/`. Decorative shapes from the same source (honeycomb, infinity loop, 3-D stacked planes, gradient spectrums) were deliberately not promoted — little analysis, and they trip `anti-slop.md`.

### `layered-pyramid` — light
Hierarchy of stacked layers, few-at-apex to many-at-base; the apex carries the accent.
### `venn-overlap` — light
Two or three outlined set circles; the intersection is the highlighted insight.
### `concentric-bullseye` — light
Core + distance rings (innovation horizons / effort allocation); the centre is the accent.
### `positioning-spectrum` — light
A point on a one-axis continuum, with a today marker and a target marker.
### `hub-and-spoke` — medium
One shared centre, N dependents on an ellipse; spokes via `connector()`.
### `bowtie-flow` — medium
Inputs converge on a core decision, then diverge to outcomes.
### `maturity-staircase` — medium
Ordered stages rising left→right; the final tread carries the accent.
### `nine-box-matrix` — medium
3×3 two-axis segmentation; one focus cell carries the accent.
### `radar-profile` — medium
Native radar; subject vs benchmark across 4–8 dimensions.
### `pros-cons-ledger` — light
Two-sided weighing with semantic +/− chips and an INK verdict strip.
### `nested-containers` — light
Concentric rectangles for strict subset / containment (TAM·SAM·SOM).

## Extending the catalog

If a deck needs a layout not listed here, do not invent one inline. Either:

1. **Add a catalogued pattern** — implement it in `references/build-helpers.md` as a new section 2.N, then add a row to the Pattern Index table here, tagged with `role` and `arrangement`.
2. **Build it in the deck, then promote it** — if a deck genuinely needs a structure no catalogued pattern supports, build it in that deck's `build.js`. If it renders clean and fills an empty `{role, arrangement}` cell, give it a name and add it here. This is the sanctioned route for a pattern to enter the catalogue from real deck work — the candidate earns a name and a permanent entry, which is the opposite of inventing one inline.

The discipline: one-off layouts compound visual entropy across decks. Every new pattern earns a name and a permanent entry in this catalog.
