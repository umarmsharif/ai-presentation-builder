---
name: ai-presentation-builder
description: Build consulting-grade strategy decks, pitch decks, leadership briefings, and board presentations. Backed by a v5 Bright White & Pine design system (bright-white ground, deep-pine accent, a per-deck display font + Manrope body) built against an anti-slop catalogue, a 30+ pattern library, and chart-design guidance. Trigger for any consulting deliverable, case study, client pitch, roadmap, diagnostic, transformation plan, or market-entry analysis — even when the user does not name the skill. Configurable: slide count, output format (PPTX/HTML/MD), archetype (diagnostic/recommendation/roadmap/market-entry/transformation/pitch/scqa/scr/bluf/inductive/issue-tree/deductive), theme. Pairs with the flight-check sibling skill as the post-build review gate.
compatibility: The deck builds via a Node/pptxgenjs pipeline, so the full build needs a code-execution environment (Claude Code, Cowork, or claude.ai with the analysis tool) plus `pptxgenjs` (npm i pptxgenjs). LibreOffice/soffice enables the render-QA loop; if it is absent, deliver the .pptx without the PNG preview pass. AskUserQuestion is recommended for the brief and ghost-deck gates; where it is unavailable, ask the same questions inline. In an environment with no code execution, the skill degrades gracefully to the ghost-deck outline + per-slide spec, which the user renders in PowerPoint, Google Slides, or Gamma.
---

# ai-presentation-builder

A skill for building consulting-grade decks, anchored on the **v5 Bright White & Pine design system** — a bright near-white ground (`FCFCFA`), one deep-pine accent (`12564A`), espresso-INK (`1A1A1A`) text, a per-deck display font (default Charter) paired with Manrope body, emphasis carried by hairlines and type weight rather than coloured bars, pptx-first delivery. The system was built to strip patterns now widely read as AI-design tells — warm cream grounds, a single font everywhere, one-side accent bars, eyebrow pills, oversized section numerals. The anti-slop posture is part of the DNA: see `references/anti-slop.md` (the "slop" catalogue mapped to deck relevance) and the static checks in `scripts/deck_qa.js`.

The canonical reference implementation is `assets/reference-build.js` — a complete, render-tested pptxgenjs exemplar. Open it to pattern-match slide intent, then copy blocks out. The full recipe library, helper functions, and gotchas table live in `references/build-helpers.md`.

## When to trigger

Use this skill proactively for any of:

- Strategy decks, pitch decks, consulting deliverables, case study responses
- Board presentations, leadership briefings, roadmap decks, transformation plans
- Market-entry analyses, diagnostic decks, recommendation decks, executive summaries
- Anything where the user references "consulting style", "MBB-style", "McKinsey-style", "Bain-style", "BCG", or names a real firm
- Any polished client-facing deck where the user wants brand-grade output with crisp prose

## The workflow

Follow these steps in order. The pre/post-flight anti-slop gates are non-negotiable.

### Step 0 — MANDATORY anti-slop pre-flight

This skill produces prose that has to survive a skeptical reader. Before drafting any slide copy, speaker notes, thesis line, context lines, or briefing text, read `references/anti-slop.md` so the language is calibrated against the AI-tells that make a deck read as machine-written.

After reading, hold these constraints while drafting copy:

- No em-dashes unless one is doing specific work you can defend (one per page maximum)
- Zero filler-buzzword vocabulary (delve, leverage, robust, seamless, transformative, paradigm, cutting-edge, game-changer, and the rest of the catalogue in `anti-slop.md`)
- No negative parallelisms ("it's not X, it's Y"; "not just A, but B")
- Sentences under 30 words; concrete nouns and specific numbers beat abstractions
- Action titles, not topic titles (the single most important rule — see `slide_patterns.md`)

Structural craft can be perfect and the deck still gets discounted the moment the prose reads as generic consulting-AI. This gate exists to stop that.

### Step 1 — Brief the deck

Use `AskUserQuestion` (or ask inline where the tool is unavailable) with two back-to-back calls before writing a single slide or line of build.js:

**Call 1 — Deck setup:**
1. **Audience + goal** — who's reading this, and what decision or action do you want from them?
2. **Deck archetype** — diagnostic / recommendation / roadmap / market-entry / transformation / pitch / scqa / scr / bluf / inductive / issue-tree / deductive. The deck may be **simple** (one archetype throughout) or **layered** (a spine archetype + section-level overrides). If layered, decide which archetype runs which slide range and respect it; do not collapse it back to one shape.
3. **Output format** — pptx / html / md / gamma / briefing (multi-select; default: pptx)

**Call 2 — Brand + visual brief:**
1. **Theme** — pick one of 8 curated, anti-slop themes (each a complete palette: ground, neutrals, accent, default font). Offer: **Bright White & Pine** (default; calm, growth) / **Slate** (corporate, finance) / **Oxblood** (formal, establishment) / **Solarized** (technical, distinctive) / **Paper** (warm editorial) / **Mono** (austere monochrome) / **Ink** (dark, cool charcoal) / **Midnight** (dark navy + gold). The pick sets `inputs.theme`, which populates every token — including the semantic tokens (`STRIP`/`ON_STRIP`/`ON_ACCENT`/`ON_ACCENT_MUTE`) that make the dark themes invert fills and reversed text correctly. For brand-locked work, also supply `inputs.brand.primary_hex` to override the chosen theme's accent. Full per-theme token sets live in `design_system.md` §1.
2. **Header font** — pick one of 8 vetted faces (body always Manrope). Offer: **Charter** (editorial serif, default) / **Palatino** (warm serif) / **Iowan Old Style** (quiet serif) / **Baskerville** (formal serif) / **Hoefler Text** (classic serif) / **Cochin** (elegant serif) / **Optima** (humanist sans) / **Manrope Bold** (all-sans). Each theme ships a sensible default font; this overrides it via `inputs.brand.font_display` (sets `DISPLAY`, with `DISPLAY_BOLD=true` for Manrope Bold). All are macOS-installed and render-tested in the pptxgenjs→LibreOffice pipeline. Stay off the overused list (Inter, Roboto, Fraunces, Geist, Plus Jakarta, Space Grotesk). An all-sans pick consciously accepts the single-family advisory — see `references/anti-slop.md`.
3. **Brand + content brief** — client/company name, presenter, date, and a rough slide-by-slide idea (even bullet notes are fine; Claude structures it).

Schema lives at `assets/inputs.example.json`. Slide count is NOT a required input — let it follow from the content interview and archetype. Default to 8–12 for executive decks, 15–18 for deeper analyses, 26+ for master-deck synthesis.

Write `inputs.json` from the answers before touching any build script. Keeping inputs separate from the build script means the same script handles every future deck.

### Step 1.5 — MANDATORY ghost deck before any content drafting

Before filling in slide bodies, panels, dots, gantt rows, or any prose: emit a **ghost deck** version of `inputs.json` with only:
- `title_slide` filled in
- `slides[i].breadcrumb`, `slides[i].title`, `slides[i].context` filled in (titles must be **action titles** — see Universal Conventions in `slide_patterns.md`)
- `slides[i].layout` chosen (Claude picks decisively from the archetype-filtered pool)
- All `slides[i].content` blocks left empty `{}` or with stub field names only

Present the ghost deck as a **table** with columns: `#` | `Section / archetype` | `Breadcrumb` | `Action title` | `Layout` | `Context line (1 sentence)` | `Main visual / data (5-second test)`.

The `Section / archetype` column makes the layered structure visible at a glance. For simple decks (one archetype throughout), every row carries the same value (e.g. `— / diagnostic`). For layered decks, the column names the section the slide belongs to and the archetype that section runs — e.g. `Build case / inductive`, `Sequence play / roadmap`, `Close ask / bluf`. Section boundaries become visually obvious (adjacent rows share a section label; the change marks the break).

Then use `AskUserQuestion` (or ask inline) with these questions:

1. Does the narrative arc hold across sections? (Approve all / Revise specific slides / Major restructure)
2. Any title that doesn't state a "so what"? (List the slide numbers to fix, or "all good")
3. Any layout choice that feels wrong for its slide's job — including a slide whose layout fights its section's archetype? (List slide numbers, or "all good")
4. Any context line or visual description missing critical detail? (List slide numbers, or "all good")

Wait for explicit sign-off before drafting any body content. If the user requests changes, update the ghost deck table and re-ask — do not proceed to Step 1.6 until the user says "all good" or equivalent.

Why this exists: it is faster to throw away 10 slide titles than 10 finished slides. The Pyramid Principle / SCQA structuring discussion happens here, on the cheap version. Skipping this step is the single most common reason a finished deck has to be rebuilt, and it is also how sparse hero slides leak in where dense workhorse patterns belong.

**Pattern picking inside the ghost deck:** Claude picks layouts decisively from the archetype-filtered pool (`scripts/pattern_filter.js --archetype=<value>`). Only use `AskUserQuestion` to surface a choice when two patterns genuinely tie on content fit or when the user has expressed taste preference earlier. Granular per-slide picking produces 10–12 forced asks per deck with no proportional quality gain; avoid it.

**Monotony guard (opt-in picker):** as you fill the `Layout` column, scan for two or more *adjacent* slides that would share the same visual idiom — most often horizontal bars (see `references/slide_patterns.md` → "Vary the bar idiom across adjacent slides"). When you find a run, either vary the treatment yourself or raise the **preview-picker** for the repeating slide: an `AskUserQuestion` with the recommended layout first (label it `(Recommended)`), then 2 render-safe alternatives, each carrying a short ASCII mini-mockup of the layout in the option's `preview` field so the user picks from pictures, not pattern names. This stays opt-in — it fires on a detected repeat, a genuine tie, or a "what are my options" from the user, not on every slide. It is the cheap counterpart to Step 4.5 Variation mode: nothing is built until the user picks.

Skip Step 1.5 **only** if the user has already supplied a complete `inputs.json` or has explicitly written "skip the ghost deck". Otherwise it is non-negotiable.

### Step 1.6 — Per-slide creation discipline (5-step)

For every slide, fill the schema in this order. Do not jump ahead.

1. **Messaging** — write `slides[i].title` first. It must be an action title (the "so what"). If you can't write the title, you don't yet understand what the slide is for.
2. **Structure** — pick `slides[i].layout` from the catalog that *supports* the title. Default to dense workhorse patterns (`diagnostic-three-panel`, `prioritisation-matrix`, `phased-roadmap-gantt`, `three-col-comparison`, `waterfall-baseline-to-target`). Use sparse condiments (`stat-row`, `big-numeral-findings`) only as section bridges, never as the bulk of the deck.
3. **Graphics / main visuals** — fill `slides[i].content`. The visual should be readable in 5 seconds. For matrices: where do the dots sit? For gantts: which workstreams overlap? For waterfalls: which line item dominates?
4. **Support** — fill `slides[i].context` (one-sentence frame before the data hits) and `slides[i].footer_note` (source + caveat). Both are non-negotiable on data slides.
5. **Polishing** — handled by `scripts/check_titles.js` + Step 7 anti-slop post-flight + Step 8 flight-check delivery gate. Run before delivery.

Picking layout *before* messaging is how sparse hero slides leak in. Picking visuals *before* layout is how charts end up not supporting their titles. Polishing *before* content is wasted work. The order matters.

Full reference: `references/methodology/slide_creation_process.md`.

### Step 2 — Read the design system + patterns

**Always read (every build), in this order:**

1. `references/design_system.md` — locked palette/typography/anatomy. Don't deviate without a reason.
2. `references/slide_patterns.md` — the master pattern catalog + **universal conventions** (action titles, selective color, chart honesty, bar/column ordering, label-direct, area-scale circles, footer discipline, waterfall-specific rules).
3. `references/build-helpers.md` — palette constants, the `header()/title()/footer()` helpers, every pattern recipe (§2.x), and the gotchas table. The implementation reference for every build. `assets/reference-build.js` is the worked example that exercises these.
4. `references/methodology/content-interview.md` — content interview framework (situation → problem → hypothesis → evidence → argument → answer). Run Phase 1 before touching any build script.

**Read on demand (only when the trigger applies):**

- `references/chart-selection-guide.md` + `references/chart-library/` — when a slide needs a chart. Driven by Step 2.5; don't pre-load.
- `references/slide-job-to-layout.md` — when picking layouts in Steps 1.5 and 4.5, to make pattern selection traceable rather than intuitive.
- `references/raci-guidance.md` — when building a RACI or any role-ownership slide.

If the user provides a reference deck or slide to match, mine its thumbnails for layout and its text for section structure. Treat any external reference as structure-only: study how it is built, never copy its words, numbers, or images.

### Step 2.5 — Chart slides: consult the chart library + chart-selection-guide

When a slide needs a chart (bar, line, stacked, dual-panel, combined bar/line, small-multiples, waterfall, mekko), do not improvise. Two references in sequence:

**First, `references/chart-selection-guide.md`** — the quick-pick table at the top maps the slide's intended *message* to the chart type. The principle: chart type fits the message, not the data shape. Apply the chart-specific tips (no 3D, label lines direct, bar logical-order, etc.).

**Then, `references/chart-library/`** for the rendered recipe (one of the 6 distilled patterns):

1. Read `references/chart-library/patterns/00-shared-design-rules.md` once per session.
2. Pick the closest pattern from:

   | Data shape | Pattern file |
   |---|---|
   | Ranking 5–12 categories by one metric | `01-horizontal-bar-with-delta.md` |
   | Same categories shown as absolute AND % | `02-dual-panel-bar.md` |
   | Composition / mix across categories or over time | `03-stacked-bar.md` |
   | Continuous time series with 1–4 lines | `04-line-with-annotations.md` |
   | Two related metrics on different scales | `05-combined-bar-and-line.md` |
   | Same chart structure across 3–6 categories | `06-small-multiples.md` |
   | Baseline → mechanisms → target | `references/build-helpers.md` → `waterfall-baseline-to-target` |

3. Read that pattern's full anatomy before drafting `inputs.json` for the slide. Each file has anatomy diagrams, design rules, headline templates, and "when NOT to use" guardrails.
4. Apply the brand palette via `brand.primary_hex`.
5. **Source line is non-negotiable.** Every chart slide MUST set `slides[i].footer_note` with a real source.

Copyright: the chart-library catalogs *patterns and conventions only* (see `chart-library/SOURCES.md`). Build every chart from the user's own data; never embed a third party's chart images, headlines, or numbers.

### Step 3 — Pick the archetype skeleton

Each archetype maps to a slide skeleton. Pick the one that fits the user's intent, then adapt slide count by adding/removing optional slides marked with `(opt)`.

**For layered decks**, the skeleton below is the **spine** — the overall arc. Section-level archetype overrides shape individual slide groups *within* the spine, not the full deck. A `market-entry` spine deck whose middle runs `inductive` uses the market-entry skeleton overall, but slides 3–5 in that section take the inductive shape (Finding 1 / Finding 2 / Finding 3 / Synthesis / Recommendation) instead of market-entry's competitive-landscape pattern at those positions. Decide the sections, then mix: spine skeleton overall, section skeleton inside each declared section.

**diagnostic** (default) — title · executive-summary · diagnostic-three-panel · prioritisation matrix · phased roadmap · risk register (opt) · early win · closing ask
**recommendation** — title · executive-summary · situation · complication · question · 5C analysis (opt) · 3-col comparison · recommendation matrix · roadmap · closing ask
**roadmap** — title · executive-summary · today's state · target state · gap analysis · phased roadmap (full bleed) · workstream gantt · interdependencies · KPIs · risks · ask
**market-entry** — title · executive-summary · market sizing (TAM/SAM/SOM) · competitive landscape (2x2) · customer segments · entry options (3-col) · recommendation · phased plan · unit economics (opt) · ask
**transformation** — title · executive-summary · burning platform · vision · four-pillar framework (4-column) · phased roadmap · org/people · risks · early win · ask
**pitch** — title · executive-summary · problem · solution · why now · traction · roadmap · ask
**scqa** — title · executive-summary (= the answer line) · situation (diagnostic-three-panel) · complication (diagnostic-three-panel or stat-hero) · question (single bold slide, often big-numeral-findings to enumerate sub-questions) · answer (recommendation slide, three-col-comparison or numbered-pillars) · how (phased-roadmap-gantt) · ask (closing-ask)
**scr** — title · executive-summary (= the resolution) · situation · complication · resolution/recommendation · implications · next-steps · ask. Use when the answer is already agreed and the deck is about presenting the plan, not building to the conclusion.
**bluf** — title · answer/recommendation (slide 2 — the call, stated plainly) · situation (context for those who need it) · supporting evidence (3–5 finding slides) · implications · ask. Use for C-suite or board audiences who want the decision first and evidence second.
**inductive** — title · finding 1 · finding 2 · finding 3 (opt) · finding 4 (opt) · synthesis/convergence slide · recommendation · ask. Use when the audience is skeptical or unfamiliar — credibility must build before the recommendation lands.
**issue-tree** — title · the question (single slide, bold) · Level 1 MECE branches · Level 2 analysis per branch · hypothesis elimination/pruning · synthesis (which branches hold) · answer · ask. Logic-first, no narrative wrapper — the deck IS the analysis. Use for root-cause decomposition, case-interview style strategy questions, or "why is X happening?" frameworks.
**deductive** — title · thesis/statement (the claim, stated plainly) · proof pillar 1 · proof pillar 2 · proof pillar 3 · implication · ask. Statement → proof → implication. Use for thought leadership, academic-style arguments, or when the audience expects rigorous logical proof before accepting a conclusion.

### Step 4 — Apply theme

If the user gave a hex override: use it as `primary_hex`. The build script derives all variants (`ACCENT_DK`, `TINT`, `TINT_BORDER`).

If the user pointed at a reference deck to match: sample its dominant colours and override `inputs.theme.primary_hex` and the font accordingly. Add a line to the appendix noting the inspiration source.

If no theme is given: leave `primary_hex` unset and the build script falls back to the v5 pine default `12564A`.

### Step 4.5 — Component selection (before building)

Before writing any pptxgenjs code, confirm the component for each slide:

1. For each slide: apply the content interview (`references/methodology/content-interview.md`) — if not already done in Steps 1–1.6.
2. Identify `slide_intent` + `data_shape` for each slide.
3. Run `scripts/pattern_filter.js --archetype=<value>` to surface the eligible patterns. Filters by archetype only (density is metadata, not a filter).
4. Claude picks the best fit decisively. Only ask the user via `AskUserQuestion` if two patterns genuinely tie or the user has expressed taste preference earlier. When you do raise that ask, use the **preview-picker form**: recommended option first (labelled `(Recommended)`), then 2 alternatives, each with a short ASCII mini-mockup of the layout in the option's `preview` field — the user picks from pictures, not pattern names. No slides are built until the user picks.
5. **Variation mode** (triggered by user saying "show me variations", "try all options"): build 2–3 layout options as separate slides in a single PPTX — same content, different visual treatment. Label each slide's breadcrumb with the variant (e.g. `VARIANT A · CASCADE`). User picks winner → rebuild only the winner.

### Step 5 — Write build.js (pptxgenjs)

Write a Node.js script that constructs the deck programmatically using pptxgenjs. Open `assets/reference-build.js` as the worked exemplar and use `references/build-helpers.md` as the recipe reference throughout. Install the dependency once: `npm install pptxgenjs`.

**Every build.js must open with the design token constants and the three helper functions:**

```js
const PptxGenJS = require("pptxgenjs");
const pres = new PptxGenJS();
pres.layout = "LAYOUT_WIDE"; // 13.333 × 7.5 inches

const SURFACE = "FCFCFA", INK = "1A1A1A", BODY = "45474A", MUTE = "8A8D90";
const LINE = "DADEDC", PANEL = "F2F4F3", WH = "FFFFFF";
const ACCENT = "12564A", ACCENT_DK = "0C3D34", TINT = "E6EFEA", TINT_BORDER = "C9DBD2";
const G = "2F7A55", A = "B07D2B", R = "B23A2E"; // semantic: good / amber-attention / risk
const DISPLAY = "Charter", DISPLAY_BOLD = false, FONT = "Manrope"; // headline face per Step 1 brief (default Charter). All-sans pick: DISPLAY="Manrope", DISPLAY_BOLD=true

// ACCENT is the one accent. Default pine 12564A; a client hex overrides it (derive ACCENT_DK at ~70% luminance).
// Every slide's ground is SURFACE — set s.background. No cream, no single font, no one-side accent bars.

function header(s, breadcrumb, num, total) { /* §3: plain breadcrumb + hairline + plain N/total — no pill, no circle */ }
function title(s, context, headline)      { /* §3: headline in DISPLAY (bold: DISPLAY_BOLD), accent italic context, no underscore */ }
function footer(s, note, label)           { /* §3 */ }
```

**Layout defaults — use these, not arbitrary values:**

| Token | Correct value | Note |
|---|---|---|
| Left margin `x` | `0.533` | content and frame share it |
| Breadcrumb / page number `y` | `0.42` | plain text; no pill, no circle |
| Header hairline `y` | `0.8` | the only rule at the top |
| `title()` context line `y` | `1.0` | italic, accent |
| `title()` headline `y` | `1.4` | DISPLAY font (default Charter), `bold: DISPLAY_BOLD`; no underscore |
| Content start `y` | `2.55` (diagrams `2.60`) | not `2.8` — that leaves a loose gap and risks bottom overflow |
| Content right edge | `≤ 12.8` | symmetric with the `0.533` left margin |
| Bottom safe edge | `y + h ≤ 6.97` | footer divider sits at `7.05`; any strip above it ends by `6.97` |

**Two callout-strip treatments — never mix arbitrarily:**
- **Pine-tint strip** (`TINT` fill + `TINT_BORDER`) — secondary/contextual callouts: legends, compared dimensions, data caveats, destination panels.
- **INK-emphasis strip** (`INK` fill, accent or white label, white text) — primary takeaways: "SO WHAT", "BENCHMARK", milestones, "THE SHIFT".

Rule: *primary takeaway = INK-emphasis; secondary context = pine-tint*. Never place a light pine-tint strip directly below heavy dark content (e.g. gantt bars); it reads washed-out, so convert to INK-emphasis there. Both are full fills, never one-side bars (the side-tab tell).

**Per-slide rule:** copy the full helper function bodies from `build-helpers.md` section 3 — don't abbreviate. One slide per `pres.addSlide()` call.

**Render-status discipline:** a pattern marked `needs-rendering` in `slide_patterns.md` is a concept without a tested recipe. Do not surface it in a picker as if it were ready. If the user explicitly wants it, build a recipe via the render-iterate loop (Step 6–7) and confirm it renders clean before relying on it.

**Gotchas table** (`build-helpers.md` section 4) — check it before writing any shape or chart. Common traps: `TRIANGLE` doesn't exist (use `RIGHT_TRIANGLE`), scatter needs 2 series, table `h` is ignored.

Save as `build.js` in the working directory.

**Extending the catalog:** if a deck genuinely needs a structure no catalogued pattern supports, build it in that deck's `build.js`, then give it a name and add it to `slide_patterns.md` (see "Extending the catalog" there). Classify it on the two coverage axes (`role`, `arrangement`); if it fills an empty cell, it earns a permanent entry. Do not inflate the catalogue with text-described patterns that have never rendered.

### Step 6 — Render loop

```bash
node build.js                                        # → deck.pptx
soffice --headless --convert-to pdf deck.pptx        # → deck.pdf
pdftoppm -jpeg -r 150 deck.pdf /tmp/qa/slide         # → slide-1.jpg, slide-2.jpg …
```

View each JPEG. If any issue is found, go to Step 7 before fixing — log first, then patch. If LibreOffice/soffice is not available in the environment, skip the PDF/PNG conversion and QA the `.pptx` by opening it directly; deliver without the rendered preview pass.

### Step 7 — Visual QA and patch loop

Run the QA scoring criteria from `references/methodology/qa_checklist.md` (Visual QA Partner section) on every slide JPEG:

1. Log all issues in the fix register format (pattern / issue / category / location / fix / priority) before touching code.
2. Fix all P1s first, then P2s — in `build.js` via targeted edits.
3. Re-run Step 6.
4. Re-score — only close resolved issues.
5. Repeat until zero P1/P2 issues remain.

**Visual QA hard rules (check every slide):**
- `y + h ≤ 6.97` for every element above the footer — arithmetic alone is not enough; render and look.
- Content right edge `≤ 12.8` on every panel, table, and gantt.
- Every visible band or column carries data. Delete pure-decoration dividers.
- **No slop tells:** no one-side accent bars, no cream/beige ground, a serif/sans pairing rather than one font, no gradient text, no purple/violet/cyan palette, no eyebrow pill or oversized section numeral. Full mapping in `references/anti-slop.md`.
- Render at **110–130 DPI** and actually look at each JPEG. Coordinate math passes bugs that the eye catches (gantt overflow, clipped companion boxes, washed-out callout strips).

Run `node scripts/deck_qa.js inputs.json build.js` before Step 8 — it lints the statically-checkable slop tells (em-dashes, marketing buzzwords, retired palette hexes, single-font, all-caps body, tiny text, justified text, gradients) alongside the pre-delivery checks. Fix warnings before the flight-check gate.

**Anti-slop post-flight:** before delivering, scan all **visible slide text** in `build.js` for em-dashes and buzzwords (see Step 0 constraints). Em-dashes in code comments are fine; em-dashes in headline/body text are not — reword grammatically (comma, semicolon, or sentence split). Run the banned-vocabulary grep. Fix in build.js, re-render.

**For convention-laden patterns (waterfall, mekko, source-to-destination, RACI matrix):** the render-iterate loop typically requires 3–5 passes to honour the convention correctly. Plan for it.

### Step 8 — Pre-flight review (delivery gate)

Before declaring the deck ready to ship, run the **flight-check** sibling skill on the rendered output. Flight-check is a standalone Anthropic-format skill (separately installable, MIT-licensed, https://github.com/analystacademy/flight-check) that runs six diagnostic systems against a near-final deck:

1. **AI authorship check** — language tells (triplet adjectives, em-dash as connective tissue, stock openers, empty verbs) + structural tells (every framework exactly three steps, generic "Overview" filler slides, replacement test)
2. **Source check** (3 layers: presence → plausibility → web-verification)
3. **Action title check** — every content slide title states the message, not the topic; a reader scanning only titles should get the full storyline
4. **Specificity check** — numbers/names/mechanisms instead of "significant growth" / "the customer" / "going forward"
5. **Structure check** — top-down logic, no internal contradictions, MECE breakdowns, recommendations trace to findings
6. **Polish pass** — typography, alignment, name spelling, number formatting, chart honesty (no 3D, Y-axis at 0), no leftover `[TBD]`

If flight-check is installed locally (`~/.claude/skills/flight-check`), invoke it on the deck and surface the report to the user before marking the build complete. If not installed, either install it or run the equivalent inline checklist above:

```bash
git clone https://github.com/analystacademy/flight-check.git ~/.claude/skills/flight-check
```

**Do not duplicate flight-check's checklist content inside this skill.** Flight-check is maintained externally; importing its rules invites drift. Reference it, don't fork it.

If the report comes back with critical issues, fix them here — re-render the affected slides with the updated content — and re-run flight-check until it clears.

### Step 9 — Deliver

Share the editable `.pptx`. If a PDF is also needed:

```bash
soffice --headless --convert-to pdf deck.pptx
```

Name the file `<DeckName>-<Date>.pptx`. In the handover note: slide count, flight-check verdict, any open P3 polish items deferred, and whether charts need PNG export for Google Slides (see `build-helpers.md` section 5).

**Delivery format:** decks ship as `.pptx`. Google Slides / Drive renders the `.pptx` directly with better font rendering (the deck's display font + Manrope) and colour saturation than the LibreOffice-converted PDF; serif display faces especially render crisper there than in the LibreOffice preview. Add a PDF companion only if the user asks for one.

## Configuration: what's locked, what's flexible

**Locked (skill DNA — don't change):**

- Layout anatomy: plain tracked breadcrumb + a single header hairline (top), plain `N / total` page number, Context-line opener, display-font title, footer. No breadcrumb pill, no pagination circle, no headline underscore.
- Bright `SURFACE` ground (`FCFCFA`) — never reintroduce a cream/beige default.
- Type: a per-deck display font (Step 1 brief; default Charter) + Manrope body. The serif/sans pairing is the default; an intentional all-sans pick (Manrope Bold) is allowed and consciously accepts the single-family advisory. Tracked caps for short labels only.
- Cool neutral palette: `#1A1A1A` (ink), `#45474A` (body), `#8A8D90` (mute), `#DADEDC` (line), `#F2F4F3` (panel)
- One accent colour (default pine `#12564A`) used sparingly — never fill large areas unless it's a closing CTA band. Emphasis by weight, hairline, fill, or whitespace — never a one-side accent bar.
- Footer anatomy: italic footnote left, `Client | N of total` right
- Pre/post-flight anti-slop gates (`references/anti-slop.md` + `scripts/deck_qa.js`)
- Pre-flight review delivery gate (Step 8 — invoke flight-check)
- Universal conventions in `slide_patterns.md` (action titles, selective color, chart honesty, bar/column ordering, label-direct on lines, area-scale circles, footer-source discipline, waterfall-specific rules)

**Flexible (per invocation via `inputs.json`):**

- Brand primary colour (any hex) OR a reference deck to match
- Brand name, client, audience, presenter, date
- Display + body font (default: Charter + Manrope — must be installed or it falls back)
- Slide count (5–28; sweet spot 8–12 for executive, 26+ for master-deck synthesis)
- Deck archetype (diagnostic / recommendation / roadmap / market-entry / transformation / pitch / scqa / scr / bluf / inductive / issue-tree / deductive)
- Output formats (any combination of pptx, html, md, gamma, briefing)
- Inclusion of appendix
- Slide content, order, and pattern selection

## Common pitfalls

- **Display serif headlines run tall — two-line titles collide with content:** a serif display face (Charter, Palatino, Baskerville…) sits taller than Manrope at the same point size, so a content-slide title that wraps to two lines reaches past the content-start line (`y≈2.55`) and overlaps the first row of cards or panels. Keep titles to one line on dense slides (tighter wording usually sharpens the action title anyway), or drop that slide's diagram content to `y≈2.75`. The all-sans Manrope-Bold pick is body-height, so it is less affected.
- **Rotated text splits per-character:** pptxgenjs rotation on narrow textboxes. Use horizontal text above/below the element instead.
- **Long tracked-caps labels wrap unexpectedly:** `charSpacing` compounds width. Either reduce to 0 or widen the box.
- **Pagination mis-numbered:** the title slide usually has no footer, so content slides should be numbered 2 through N, not 1 through N−1.
- **LibreOffice PDF ≠ PowerPoint rendering:** QA from the LibreOffice PDF when a PDF will be the delivered artefact, since that is what the reader will see; otherwise QA the `.pptx` in PowerPoint/Google Slides.
- **Untested patterns treated as ready:** a `render_status: needs-rendering` pattern is a concept, not a recipe. Block it from the picker until a seed renders clean. For convention-laden patterns (waterfall cascade rule, Mekko axis-break convention), require a visual reference before trusting it.
- **Forking flight-check's checklist into this skill:** flight-check is maintained externally. Reference it as a sibling skill, don't duplicate its diagnostic systems here.
- **Layout-guardrail violations (y-start, bottom overflow, right-edge bleed):** the safe values are in the Step 5 layout-defaults table — content `y≈2.55`, every element `y + h ≤ 6.97` (footer divider sits at `7.05`), right edge `≤ 12.8`. Coordinate arithmetic passes bugs the eye catches, so render and look at every slide rather than trusting the math.
- **Reintroducing a stripped v4 tell:** the most common regression is copying an older recipe snippet that still carries a one-side accent bar, a cream ground, an eyebrow pill, an oversized section numeral, or a single font. v5 removed these as AI-design tells; if a recipe shows one, strip it. `deck_qa.js` flags the retired hexes and single-font; the rest is an eye check. See `references/anti-slop.md`.
- **Decorative bands with no data:** every visible band, strip, or column must carry information. If it is decoration, delete it — a thin coloured divider between two comparison columns reads as an unexplained data column.
- **Floating foundation rows:** a "source of truth" or foundation row with a small gap above it looks disconnected from the stack it belongs to. Bond it: zero gap, same row height as the tier above.
- **Hardcoded companion-box heights:** side boxes (design principles, legends, role descriptions) must derive their height from the adjacent stack element, not a hardcoded value. Inner item spacing = `(boxH - headerSpace) / itemCount`. Hardcoded values clip the last item when the stack changes.
- **Generic RACI grids:** using business-function rows (Mktg / Sales / Network / Care) when the role being described owns specific sub-teams. Get the real reporting structure. Default to full A/R/C/I — the Accountable row is the single most important cell on any role-ownership slide. See `references/raci-guidance.md`.
- **Dead band under one-line titles:** a one-line display title ends near `y≈2.0`, so content starting at the two-line-safe `y≈2.7+` leaves ~0.8" of dead space that reads as a layout bug. With a one-line title, pull content start up to `y≈2.45–2.55` and grow row/card heights so the body fills toward the 6.97 floor. The `y≈2.75` advisory applies only when the title genuinely wraps to two lines.
- **Icon-bare decks:** generating the §2.34 icon set is not the same as using it. If you use icons, use them consistently — a monoline band icon on every content slide and a semantic icon on every card/table row. Icons on 2 of 22 slides read as an unfinished deck.
- **dataTable as the path of least resistance:** at ghost-deck time, route content shapes to their visual idiom instead of defaulting to tables — a cascade-shaped money walk is `waterfall-baseline-to-target`, a likelihood×damage bet list is a 2×2 risk map, a stage flow is an agenda rail. Keep some tables deliberately and vary adjacent idioms, but a deck that is mostly tables with zero charts fails the 5-second test even when every table is individually clean.

## The philosophy

The aesthetic is restrained. One accent colour, a display serif paired with a sans body, heavy typographic hierarchy, generous whitespace. Every slide opens with a Context line so the reader is oriented before any data hits them, and every slide closes with a one-line footnote explaining source/caveat.

Study how senior operators structure 30–60 page documents under time pressure for skeptical readers. Borrow structure, never verbatim copy. The patterns are durable; the visual language stays yours.

The goal: every deck should look like a senior operator made it. Austerity signals confidence. Use the accent colour on exactly one thing per slide: the element you want the reader's eye to hit first.

The flight-check pre-delivery gate exists because audiences spot AI-tells fast; once they do, they discount everything that follows. The deck-building skill and the deck-reviewing skill are kept separate and run in sequence: build here, review there, ship after both pass.
