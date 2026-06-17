# Design Pattern Knowledge Base — v5 Bright White & Pine

# For: strategy-deck-builder skill

# v5 (June 2026): rebuilt off v4 to remove AI-design tells — bright surface, serif+sans pairing, no one-side accent bars/pills/section numerals. See design_system.md and anti-slop.md.

# Source: Deck build session, May 2026 (v4, Burgundy & Brass palette update — May 19 2026)

# Scope: All visual components, chart types, layout patterns, and pptxgenjs

# implementation decisions used in the 24-slide canonical v2 deck PLUS

# 4 supplementary standalone slides (PM/GM/CTO targets, behavior cascade,

# combined targets × behaviors view, data foundation) PLUS

# 10 supplementary stress-test slides (ROI economics, sensitivity, scenarios,

# decision tree, dashboard mockups, threshold tables, cascade math, stress tests).

# Updates in June 2026 v5 (Bright White & Pine):

# - Palette reskinned: pine accent (default 12564A), cool neutrals, bright FCFCFA surface

# - Typography: a configurable display font (DISPLAY, default Charter; set per Step 1 brief) + Manrope (FONT) body pairing replaces single-family

# - Anatomy stripped: plain breadcrumb + header hairline, plain page number, no pill/circle, display-font titles, no underscore

# - One-side accent bars removed throughout (the side-tab tell); emphasis by weight/fill/hairline/space

# - Section divider: worded display-font section name + full-width hairline, no oversized 01/02/03 numeral

# - TINT is now a cool pine wash (E6EFEA / border C9DBD2); destination/reader strips use full fill, no left bar

# Updates in May 2026 v3:

# - New Section 1.6: pattern library as floor not ceiling

# - New Section 4 canvas-defect rule: never use reserved layout names

# - 10 new patterns 2.21–2.30 (chart-first patterns from stress-test deck)

# - Section 7: three new design decisions (canvas defect, floor-not-ceiling, slide-1 density)

# - New Section 8: build process checklist (ghost deck → canvas verify → build → measure → iterate → voice check → ship)

# - New Section 9: pattern capture protocol (when/how to grow this library)

# Updates in May 2026 v2:

# - New colours TINT and TINT_BORDER for destination panels

# - New Section 1.5 colour rules: two-axis grid rule + destination panel rule

# - Pattern 2.19 (slide 27) updated: tier headers INK, cell accents ROLE colour

# - New Pattern 2.20 (slide 28): source-to-destination diagram

# - New Section 5.1: deck delivery format (pptx only, no PDF)

# Load this file at Step 2 alongside design_system.md and slide_patterns.md.

---

## 1. Design System (v5 Bright White & Pine)

### 1.1 Palette (locked — Bright White & Pine, v5 June 2026)

```js
// Primary (accent is client-variable; defaults to pine when no brand hex is supplied)
const ACCENT       = "12564A";   // Deep pine — the one emphasis colour: key labels, the eye-landing element
const ACCENT_DK    = "0C3D34";   // Darker pine — deep fills, accent-on-accent layering

// Neutrals (cool — replaces the warm espresso family)
const INK          = "1A1A1A";   // Near-black — headlines, dark card backgrounds, primary text
const BODY         = "45474A";   // Cool slate — body text, table content
const MUTE         = "8A8D90";   // Cool grey — secondary labels, footnotes, source lines, page numbers
const LINE         = "DADEDC";   // Hairline borders, grid lines, table dividers, the header rule
const LINE_SOFT    = "E8E3D6";   // Soft dividers, card borders

// Backgrounds
const SURFACE      = "FCFCFA";   // Bright near-white — the page ground (was warm cream; do not reintroduce cream)
const PANEL        = "F2F4F3";   // Faint cool tint — card backgrounds, soft fills (barely off the ground)
const BG_3         = "F0EBE0";   // Deeper warm fill — section header rows, alternating rows
const WH           = "FFFFFF";   // Active fills, contrast text on dark

// Semantic
const G            = "2F7A55";   // Positive deltas, paid/success states (a green distinct from the pine accent)
const A            = "B07D2B";   // Brass — warning, secondary direction marks, intermediate values, "borderline"
const R            = "B23A2E";   // Clay-red — negative deltas, below-target, High risk severity

// Role colours (lifecycle / swimlane grids)
const NAVY         = "2B3540";   // Cool slate-blue — secondary role lane
const TEAL         = "0E7490";   // Legacy — Training Mentors path; still usable but not in core palette

// Surface accents (the pine-tint callout strip)
const TINT         = "E6EFEA";   // Pine tint at ~8% on white — soft callout fills, destination panels
const TINT_BORDER  = "C9DBD2";   // Subtle border for TINT surfaces

// Type families (the v5 display + body pairing)
const DISPLAY = "Charter", DISPLAY_BOLD = false, FONT = "Manrope";
// headline face — set per Step 1 brief (default Charter). All-sans pick: DISPLAY="Manrope", DISPLAY_BOLD=true.
// DISPLAY carries titles, section identity, large editorial numerals. FONT (Manrope) carries
// labels, body copy, tracked-caps, all data numerals.
```

**Scalpel rule:** ACCENT used sparingly — one element per slide as the eye-landing point. Never fill large card areas with ACCENT. Use INK for dark cards. Use PANEL for light cards.

**v5 palette (June 2026):** the Bright White & Pine system replaces the v4 Burgundy & Brass family. The accent is now **client-variable**: it defaults to deep pine `12564A` when no `inputs.brand.primary_hex` is supplied (deliberately not the old burgundy, and not the purple/violet/cyan "AI palette"). Everything else is locked: a bright near-white ground, a single pine accent, and a configurable display font (default Charter) paired with Manrope body. Build.js constant names are unchanged for backward compatibility — only the hex values change. See `design_system.md` for the authoritative spec and `anti-slop.md` for the design-tell reversals.

### 1.2 Typography

v5 pairs a **configurable display font (`DISPLAY`)** with a **body sans (Manrope, `FONT`)**. The display face is a per-deck choice set in the skill's Step 1 brief, not a single locked face. The body is always Manrope. A single family for everything is an AI tell; the display+body pairing is the default fix and gives the deck an editorial voice.

The vetted display set (all installed, render-tested, off the overused list): **Charter** (DEFAULT — editorial serif, renders clean everywhere including LibreOffice), **Palatino** (warm serif), **Iowan Old Style** (quiet serif), **Baskerville** (formal serif; renders best in PowerPoint/Google Slides, weaker in LibreOffice preview), **Manrope Bold** (all-sans, modern — no serif).

DISPLAY carries prose — titles, section identity, the occasional large editorial numeral. If the display is a serif, set it roman (never an oversized italic serif) and keep data numerals in Manrope. If the pick is all-sans (Manrope Bold), set `DISPLAY_BOLD = true` so the headlines render bold for weight contrast. Manrope carries everything else — labels, body copy, every tracked-caps label, and all data numerals (stat cards, chart values, KPI figures stay in Manrope; old-style serif figures hurt scannability in dense data).

Choosing the display+body pairing is the default anti-slop fix. Choosing Manrope Bold (all-sans) is an allowed intent option: it consciously accepts the single-family advisory, mitigated by a strong weight and size hierarchy. Default is Charter, but every deck asks via Step 1 — the font is configurable, not locked.

| Role | Family | Size | Weight | Colour |
| :---- | :---- | :---- | :---- | :---- |
| Slide title (headline) | DISPLAY (Step 1 brief; default Charter) | 28–32pt | Regular (DISPLAY_BOLD if all-sans) | INK |
| Section identity (divider) | DISPLAY (Step 1 brief; default Charter) | 40–54pt | Regular (DISPLAY_BOLD if all-sans) | INK |
| Context line | Manrope | 13–14pt | Italic | ACCENT |
| Section label | Manrope | 16pt | Bold | INK |
| Table header | Manrope | 12–13.3pt | Bold | WH on INK fill |
| Body text | Manrope | 10–12pt | Regular | BODY |
| Breadcrumb (plain, tracked-caps) | Manrope | 10–11pt | Bold | ACCENT; charSpacing: 3 |
| Page number (plain) | Manrope | 10–11pt | Regular | MUTE |
| Footnote / source | Manrope | 9–11pt | Italic | MUTE |
| Footer right ("Client | N of M") | Manrope | 10–11pt | Regular | MUTE |

**Fonts:** a configurable display font (default Charter; set per Step 1 brief from the vetted set above) + Manrope body sans. All vetted picks are installed and render in LibreOffice/PowerPoint (Baskerville renders best in PowerPoint/Google Slides, weaker in LibreOffice preview). Avoid the overused AI-flagged faces (Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk). Tracked caps for SHORT labels only — never track body text or set long passages in uppercase.

### 1.3 Slide Anatomy (every content slide)

v5 strips the v4 chrome (breadcrumb pill, pagination circle, one-side accent bars, headline underscore) down to plain type and a single hairline. The reader learns the grid by slide 3 and reads content, not orientation. Headlines and section identity use the deck's display font (Step 1 brief; default Charter).

y=0.4   Breadcrumb (top-left, **plain tracked-caps ACCENT text, no pill**, 10.7pt, charSpacing 3)

y=0.4   Page number (top-right, **plain MUTE text, no circle**, 10.7pt, `N / total`, right-aligned)

y=0.8   Header hairline (full-width LINE rule, 0.013" — the only rule at the top; replaces the pill chrome)

y=1.0   Context line (italic ACCENT, 13.7pt, left-aligned)

y=1.4   Headline (**the display font, regular — or DISPLAY_BOLD if all-sans**, 30pt, INK — no accent underscore bar)

y=2.55–7.05   Content zone (diagrams start 2.60)

y=7.05   Footer divider (hairline above the footer)

y=7.067   Footer zone (italic MUTE source left; "Client | N of total" right)

**Breadcrumb examples used:** `THE MATH` · `TARGET LADDER` · `PROVEN ENGINE` · `THE CONSTRAINT` · `CORRELATION` · `PRICING MODEL` · `SF 1: TRAINING` · `SF 2: ACTIVATION` · `SF 3: ACQUISITION` · `SF 4: FOUNDATION` · `OPERATING FLOW` · `LIFECYCLE` · `ACCOUNTABILITY` · `RISKS` · `USAGE 1: FREQUENCY` · `USAGE 2: DEPTH` · `USAGE 3: COMMITMENT`

### 1.4 Background variants

No one-side accent bars anywhere. Title, closing, and divider slides share the bright `SURFACE` ground; emphasis comes from the display font, a full-width hairline, a full-fill `TINT` panel, or whitespace — never a coloured stripe down one edge.

| Slide type | Background | Edge treatment |
| :---- | :---- | :---- |
| Content slide | `#FCFCFA` SURFACE | None (header hairline only) |
| Title slide | `#FCFCFA` SURFACE | None — plain tracked brand label + display-font title + TINT thesis panel |
| Closing slide | `#FCFCFA` SURFACE (or full ACCENT fill — the one place a full-bleed accent belongs) | None — full fill is fine, no one-side bar |
| Section divider | `#FCFCFA` SURFACE | Full-width hairline + worded display-font section name (no giant numeral) |
| Hidden appendix | `#FCFCFA` SURFACE | Badge, not a bar |

### 1.5 Color rules (in addition to scalpel rule)

**Two-axis grid rule.** In any grid where one axis is swimlanes (roles, owners, teams) and another is categorical columns (tiers, phases, stages), colour must encode ONE axis only. The other stays neutral (INK fill, WH text). Doubling up creates false ownership claims wherever a swimlane colour happens to match a column colour. Pick the axis where misreading is most expensive, and give it the colour budget.

Examples this rule catches:

- Phase × role grid where AMBER = "Scale phase" AND AMBER = "GM role" → reads as "GM only matters in Scale"
- Persona × channel grid where NAVY = "high-value persona" AND NAVY = "email channel" → reads as "high-value users only respond to email"
- Capability × team grid where ACCENT = "critical capability" AND ACCENT = "PM team" → reads as "PM team owns all critical capabilities"
- Tier × role grid where AMBER = "Tier 2 impact" AND AMBER = "GM role" → reads as "GM owns Tier 2 entirely" (the slide 27 case that surfaced this rule)

The fix: pick the axis where reader inference matters more (usually swimlanes), give it the colour, keep the other neutral. The neutral axis still reads as categorical because of position, label, and numbering — it just doesn't make colour-based claims.

**Destination panel rule.** Full-width "destination" or "consolidation" panels in source-to-destination diagrams must NOT use INK or NAVY fill. The dark slab against the surrounding light source cards reads as a contrast jolt, not as anchoring weight. Use the **pine-tint strip** — `TINT` (#E6EFEA) fill with a full `TINT_BORDER` (#C9DBD2) hairline, no one-side accent bar — instead. The soft pine wash differentiates the destination from the white source cards without harsh contrast or a side-tab stripe. Sub-element pills inside the tint panel should use WH fill with LINE border to read as proper nested cards.

This rule applies specifically to full-width panels in source-to-destination layouts. Smaller dark elements (table headers, tier labels in grids) can still use INK — surface area is the issue, not the colour itself.

---

### 1.6 Pattern library as floor, not ceiling

**The documented patterns below are a starting point, not a cage.** When a slide brief calls for visual density that the existing patterns produce sparsely, invent a new pattern. When content is quantitative, default to chart-driven layouts even when a stat-row or table pattern would be the closest documented match. The library's job is to encode safety and consistency for repeat patterns; it does NOT impose a fixed vocabulary on novel content.

**When to break out of documented patterns:**

- **Quantitative content, multiple data points.** Default to chart (line, bar, scatter, heatmap, waterfall, cascade) over stat cards. Slide 1 of every deck especially: the action title plus a workhorse chart pattern (small-multiples, dual-axis, three-trajectory) trains the reader's density expectation for the rest of the deck.
- **Stat-row / big-numeral patterns (e.g. 2.3 "Stat row") are condiments, not main course.** Use them as section bridges or summary slides at most 1-2 times per deck. Never as opening workhorses. A sparse slide 1 trains the reader to expect filler.
- **The visual encoding has to earn the canvas.** If content density is genuinely thin (e.g. a single insight, a section divider), the layout can be thin — but then the slide should be styled as a bridge, not as a content slide. Mid-deck slides should fill ~95% of vertical canvas with information.
- **Reference imagery overrides documented patterns.** If a reference image the user provides (e.g. a competitor deck or a slide they like) shows a layout that fits the content better than anything in this library, use the reference. Inventing a new pattern entry afterwards is fine; treating the library as exhaustive is not.

**Six patterns invented during the May 2026 stress-test session** (slides 1-10 of `stress-test-10.pptx`): see Patterns 2.21 through 2.30 below. These were not in the v2 library but emerged when the content called for them. Their existence is the rule, not the exception.

---

---

## 2. Slide Patterns Used (with pptxgenjs implementation notes)

### 2.1 Title / Closing bookend slide

**When:** Opening and closing slides only. Bright SURFACE ground — no one-side accent bar, no eyebrow pill.

```js
s.background = { color: SURFACE };
// v5: no full-height left bar. The brand name is a plain tracked label; the title is in the display font (DISPLAY).
s.addText("STRATEGIC REVIEW", { x: 0.533, y: 1.733, w: 11.467, h: 0.467,
  fontSize: 11, bold: true, color: ACCENT, charSpacing: 3, fontFace: FONT });
s.addText("Main title here", { x: 0.5, y: 2.333, w: 12.3, h: 1.2,
  fontSize: 44, color: INK, fontFace: DISPLAY });
// Thesis statement (optional): a TINT panel — full fill + TINT_BORDER hairline, NOT a one-side bar.
```

**Closing slide text:** INK headlines on SURFACE — or the one full-bleed ACCENT fill the system allows (the closing band earns it). Numbered conclusion points use an ACCENT OVAL badge (0.667" × 1.04") + icon (24pt emoji) + display-font title + Manrope body. No one-side accent bar.

---

### 2.2 Section divider slide (Act 1–4)

**When:** Between major narrative acts. Bright SURFACE ground. **Worded section identity in the display font — no oversized numeral (the 01/02/03 tell), no one-side accent bar.** The phase the section belongs to sits as a small tracked label; the section's name carries it, not a giant digit.

```js
s.background = { color: SURFACE };
// v5: no full-height left bar, no 160pt numeral, no vertical separator.
// Phase label (small tracked caps) — the worded name does the work, not a digit.
s.addText("ACT 1", { x: 0.533, y: 2.6, w: 11.467, h: 0.4,
  fontSize: 11, bold: true, color: ACCENT, charSpacing: 3, fontFace: FONT });
// Worded section title in the display font (DISPLAY), large
s.addText("The Commitment", { x: 0.5, y: 3.0, w: 12.3, h: 1.0,
  fontSize: 52, color: INK, fontFace: DISPLAY });
// Full-width hairline under the title (replaces the vertical separator + numeral chrome)
s.addShape(pres.shapes.RECTANGLE, { x: 0.533, y: 4.1, w: 12.267, h: 0.013,
  fill: { color: LINE }, line: { color: LINE } });
// One-line preview of what the section covers (Manrope italic, MUTE)
s.addText("One sentence framing the act.", { x: 0.533, y: 4.25, w: 11.467, h: 0.5,
  fontSize: 14, italic: true, color: MUTE, fontFace: FONT });
```

**Acts used:**

- 01 The Commitment (slides 3–4)  
- 02 The Diagnosis (slides 6–12)  
- 03 The Plan (slides 14–21)  
- 04 The Asks (slides 23–24)

---

### 2.3 Stat row (4 key numbers)

**When:** Opening summary of the main commitment numbers.

```js
// 4 cards side-by-side, 2.8" × 2.2", x positions: 0.533 / 3.667 / 6.8 / 9.933
const stats = [
  { val: "467",  label: "Active today\\n(Apr 2026)",  col: INK     },
  { val: "3,000",label: "Target\\n(Mar 2027)",      col: ACCENT },
  { val: "11",   label: "Months\\nremaining",        col: INK     },
  { val: "+230", label: "Required net adds\\nper month (avg)", col: A },
];
// Each card: PANEL fill, LINE 0.8pt border, 50.7pt bold number, 14.7pt label
```

---

### 2.4 Bar chart — trajectory (slide 2)

**When:** Showing a progression toward a target over time. No vertical axis.

```js
s.addChart(pres.charts.BAR, [{
  name: "Active accounts",
  labels: ["Oct '25","Apr '26","Aug '26","Nov '26","Jan '27","Mar '27"],
  values: [484, 467, 700, 1500, 2300, 3000]
}], {
  barDir: "col",
  chartColors: [MUTE, MUTE, A, A, A, ACCENT],  // grey = past, amber = projection, crimson = target
  valAxisHidden: true,             // remove vertical axis — let data labels do the work
  showValue: true, dataLabelFontSize: 21.3, dataLabelFontBold: true,
  catAxisLabelFontBold: true, catAxisLabelFontSize: 18.7,
  valAxisMinVal: 0, valAxisMaxVal: 3400,
  showTitle: false, showLegend: false,
});
```

**PNG export note:** Trajectory charts survive PPTX→Google Slides import better than scatter plots. Still safer to export as PNG at 300 DPI for final delivery.

---

### 2.5 Dual-line chart — target ladder (slide 3)

**When:** Two trajectories on one chart (realistic curve + linear target).

```js
s.addChart(pres.charts.LINE, [
  { name: "Realistic projection",      labels: [...], values: [...] },
  { name: "Linear trend (+230/mo avg)",labels: [...], values: [...] },
], {
  chartColors: [ACCENT, MUTE],
  lineSize: 2.5, lineSmooth: false,
  lineDataSymbol: "circle", lineDataSymbolSize: 6,
  showLegend: true, legendPos: "b",
  valAxisMinVal: 0, valAxisMaxVal: 3200,
});
```

Pair with a **3-phase side panel** (right of chart): coloured left-bar cards for Q3 Instrument / Q4 Scale / Q1 Harvest phases.

---

### 2.6 Bar chart — tier comparison (slide 4, Proven Engine)

**When:** Showing directional change (positive vs negative) across categories.

```js
// Single series with per-bar colour coding
chartColors: [R, R, R, G]  // red for declining tiers, green for growing tier
// Show value labels, no legend
// Pair with 2-column narrative panel to the right
```

---

### 2.7 Activation funnel — hex cards (slide 5, The Constraint)

**When:** Showing drop-off through a sequential funnel with a small final cohort.

```js
// 6 cards horizontal, INK → AMBER → ACCENT gradient by depth
// Per card: big number (22.7–24pt bold WH), % of previous step, label, date stamp
// Below all cards: 3-row definition panel (PANEL fill, LINE hairline — no left bar; emphasis from the bold INK title and ACCENT term text)
```

**Definition panel pattern (use when event names need CEO explanation):**

```js
s.addShape(pres.shapes.RECTANGLE, { x: 0.533, y: 4.733, w: 12.267, h: 2.133,
  fill: { color: PANEL }, line: { color: LINE, pt: 0.8 } });
// v5: no one-side accent bar. The panel reads as a callout via its PANEL fill + LINE hairline;
// emphasis is carried by the bold INK title and the ACCENT-coloured term text inside.
s.addText("Key definitions for this CEO briefing", { ... bold, INK });
// Then: term (ACCENT bold) | definition (BODY) — 3 rows
```

---

### 2.8 Correlation / lift table (slide 6)

**When:** Showing multiple behavior signals ranked by predictive power.

```js
// 5-column table: Behavior signal | Period observed | Cohort size | Pay rate | Lift vs install
// Header: INK fill, WH bold text
// Alternating rows: PANEL / WH
// Pay rate column: colour-coded (R for 0.15%, A for ~12%, G for 19.8%)
// Lift column: same colour coding
// Bottom: 3 click-to-reveal callout boxes (WH fill, LINE border, numbered ACCENT badge — no left bar)
```

**Click-to-reveal callout pattern:**

```js
// 3 boxes side-by-side, 3.867" × 1.04", y ≈ 6.6
// Each: WH fill, LINE 0.5pt border, ACCENT OVAL badge (0.373" dia), title + body — no one-side accent bar; the badge carries the accent
// User sets each to "Appear on Click" in PowerPoint: Animations → Appear → On Click
// pptxgenjs cannot generate animations — always disclose this upfront
```

---

### 2.9 Scatter plot — frequency vs pay rate (slide 16)

**When:** Showing non-linear relationship between engagement intensity and conversion.

```js
// X = sessions per user, Y = pay rate %, 5 data points
// Chart type: pres.charts.SCATTER — requires TWO series:
//   Series 1: name "X-Values", values: [1, 3, 8, 25, 75]
//   Series 2: name "Sessions per user", values: [0.05, 0.5, 2.5, 8.0, 14.0]
s.addChart(pres.charts.SCATTER, scatterPayload, {
  catAxisTitle: "Sessions per user (192-day window)",
  valAxisTitle: "Pay rate (%)",
  showCatAxisTitle: true, showValAxisTitle: true,
  lineSize: 0, lineDataSymbol: "circle", lineDataSymbolSize: 18,
  valAxisMinVal: 0, valAxisMaxVal: 16,
  catAxisMinVal: 0, catAxisMaxVal: 80,
});
```

**CRITICAL:** Scatter plots do NOT survive PPTX → Google Slides import. Always export as PNG (300 DPI) and share separately for paste-in.

```bash
pdftoppm -png -r 300 slide.pdf /tmp/chart && python3 -c "
from PIL import Image
img = Image.open('/tmp/chart-1.png')
# Chart at x=0.4, y=0.4, w=12.533, h=6.667 in a 13.333 × 7.5 slide
left  = int(0.4/13.333 * img.width)
top   = int(0.4/7.5 * img.height)
right = int(12.933/13.333 * img.width)
bottom= int(7.067/7.5 * img.height)
img.crop((left,top,right,bottom)).save('scatter-cropped.png','PNG')
"
```

---

### 2.10 Bar chart — depth of action (slide 17)

**When:** Comparing pay rate across discrete ordered categories (not time).

```js
// chartColors: [MUTE, A, ACCENT, A]  — highlight the peak bar in ACCENT
// Required axis labels:
catAxisTitle: "Deepest in-app action taken (per user)"
valAxisTitle: "Pay rate (%)"
showCatAxisTitle: true, showValAxisTitle: true
// dataLabelFormatCode: "0.0\\"%\\""
```

**Also does NOT survive Google Slides import cleanly.** Export as PNG at 300 DPI.

---

### 2.11 Commitment cascade — horizontal funnel (slide 18)

**When:** Showing a strict sequential funnel where each step is a subset of the previous. Replaces 2D quadrant charts which confuse X-axis "events per user" with pay rate.

```js
// 6 horizontal cards: Active → Viewed → Tracked → Added → Created → Paid
// Colors: MUTE → "A89A86" → A → A → ACCENT → G (green = final/success)
// Per card: stage name (18.7pt bold WH), event name (11.3pt italic WH), user count (24pt bold WH),
//           % of active (10.7pt WH), pay rate pill (WH fill, colored text)
// Between cards: RIGHT_TRIANGLE arrows (rotate: 90), fill: ACCENT
// Below cards: drop-off percentage labels ("96.6% drop", "17% drop", etc.)
// Bottom: PANEL insight bar — full LINE hairline, no one-side accent bar (the bold INK lede carries it)
```

**Key numbers:**

- Active → Viewed: 96.6% drop (biggest volume opportunity)  
- Added → Created: 17% drop (highest-impact — 8x closer to paying than viewers)  
- Created → Paid: 86% drop

---

### 2.12 Multi-axis metric table with source column (slides 9, 10, 11)

**When:** Current vs target comparisons where CEO will ask "where does this come from?"

```js
// 5 columns: Metric | Today | Target | Lever the PM owns | Source
const colW = [2.667, 1.333, 1.333, 5.067, 1.867];
// Today column: R (red) bold for bad current state
// Target column: G (green) bold for goal
// Source column: italic MUTE, font size 12, exact date reference
// e.g. "Firebase, Apr '26" / "Firebase, 192d window" / "Est. from Elite uplift"
```

**Rule: every number in a metric table needs a source column or footnote.** Format: `System, Period` e.g. `Firebase, Apr '26` or `GHL CRM, May '26`.

---

### 2.13 RACI matrix with role icons (slide 14)

**When:** Accountability mapping across 5+ roles on 10+ workstreams.

```js
// Column headers: role label + emoji icon above (two rows inside one header cell)
const icons = ["", "👑", "🎯", "🚀", "⚙️", "🎓", "👥"];
// Header height: 0.667" (taller than standard 0.533" to fit icon + text)
// R/A cells: ACCENT fill, WH bold text  ← single-point accountability flag
// A cells:   INK fill, WH bold text
// R cells:   #FEE2E2 fill, ACCENT bold text
// C cells:   #FEF3C7 fill, #78350F bold text
// I cells:   PANEL fill, MUTE text
// — cells:   WH fill, LINE text
```

**Compensation note pattern** (bottom of RACI):

```js
s.addShape(pres.shapes.RECTANGLE, { x: 0.533, y: 6.667, w: 12.267, h: 0.333,
  fill: { color: PANEL }, line: { color: LINE, pt: 0.5 } });
// v5: no one-side accent bar — the strip reads via PANEL fill + LINE hairline; the comp figures sit in ACCENT bold text
// Trainer compensation: PKR 5,000 per portfolio_created in trial
//                       PKR 15,000 per trial-to-paid conversion
```

---

### 2.14 Risk register (slide 15)

**When:** Structured risk tracking for CEO. Severity = likelihood × impact.

```js
// ID column: severity-coded fill (R ≥ 6, A 3–5, G ≤ 2)
// Likelihood / Impact columns: R/A/G color text (not fill)
// 5 columns: # | Risk | Likelihood | Impact | Mitigation
const colW = [0.667, 5.333, 1.2, 1.2, 4.533];
// Risk IDs: R1–R7 as white text on severity-colored ACCENT/A/G background
```

---

### 2.15 Operating flow — 5-stage (slide 12)

**When:** Showing a sequential process where each stage has an owner and a metric.

```js
// 5 INK-gradient cards (shades: INK → "3C3630" → "4E463C" → "605648" → "726654")
// Per card: ACCENT OVAL letter badge (A/B/C/D/E) top-centre, overlapping card top edge
//           24pt emoji icon below badge
//           stage name (18.7pt bold WH)
//           WH owner pill (11.3pt bold, color = card shade, charSpacing: 2)
//           italic metric (11.3pt, #DADEDC)
//           bold target (14pt WH)
// Below all cards: ACCENT-bordered foundation workstream blocks (Event Pipeline, GA4, etc.)
```

**Note:** Slide 12 uses dark INK cards. Slide 20 (Lifecycle) must NOT use the same pattern. Always differentiate a sequential-process slide from a timeline-with-roles slide.

---

### 2.16 Lifecycle swimlane — timeline with role handoffs (slide 20)

**When:** Showing how role responsibility shifts over a day-numbered time axis. **Pattern:** Minimal typographic swimlane — no cards, no pill shapes. Lines, dots, labels.

```js
// Layout: LX = 2.16 (after role labels), RX = 12.867, TW = RX - LX
// Day header bar: INK fill, 0.373" high, spans LX → RX, day labels inside
// 4 role rows (ROW_H = 0.8", GAP = 0.093"):
//   row 0: Growth   (A / amber)    — D0 Install, D1 First session
//   row 1: PM       (ACCENT)      — D7 active, Portfolio created, Trial→Paid, Renew
//   row 2: Head Trainer (NAVY)     — D30 Cohort, D120+ Graduate
//   row 3: Training Mentors (TEAL) — D30 1:1 begins, D60 Check-in, D90 Push to pay
// Per row: role identity carried by the role-coloured label + sub-label (no 0.08" edge stripe), PANEL lane background, grid lines
// Events: OVAL dots (0.24" dia) at (day_x, row_centre_y), label above or below
// Ownership lines: LINE shapes connecting events within a role (solid for active, dash for oversight)
// Handoff arrows: LINE shapes (dashType: "sysDash", endArrowType: "triangle") between rows
// Training graduate path: TEAL dashed arrow entering PM row at D14 from left edge
//   + small TEAL badge "Training graduate path"
// Churn band: PANEL fill, AMBER label + LINE hairline (no one-side bar), below Training Mentors row
```

**Four-row role colour map:** | Role | Colour | Role in lifecycle | |---|---|---| | Growth | AMBER (#B07D2B) | D0–D1 acquisition | | PM | ACCENT (#12564A) | D1–D14 activation, D90–D120+ conversion | | Head Trainer | NAVY (#2B3540) | D30–D120+ cohort oversight | | Training Mentors | TEAL (#0E7490) | D30–D90 1:1 activation |

**Training graduate path** is a SEPARATE colour (TEAL dashed line) that shows course graduates entering the PM row pre-qualified at D14, bypassing the D0–D14 organic onboarding sequence.

---

### 2.17 Side-by-side role targets with support band (slide 25)

**When:** Showing two role-owned monthly target tables side-by-side, with a third "supporting" role (CTO) as a horizontal band underneath. Used for JD-pair accountability slides where two roles share a top-line outcome and a third role enables both.

```js
// Layout: two equal-width blocks (6.0" each) at y=1.8, blockH=4.0"
// Left block (PM, ACCENT header), right block (GM, AMBER header)
// Each block:
//   - Title bar 0.533" high: role + sub + "Total: N" right-aligned
//   - Column header strip 0.32" high: INK fill, Month/Target/Note columns
//   - 11 data rows × 0.315" each: alternating PANEL/WH bg
//   - Per row: Month text (left) + bar visualization + value (centre-left) + note (right)
//   - Bar width scales to max value in that block (cardW * 1.4 max)
// Below blocks: CTO foundation band, 0.867" high, NAVY full fill (no one-side accent bar — the full NAVY fill anchors it)
//   - "CTO" label + sub at left, then 4 horizontal day-pill cards
//   - Each card: 2.533" wide, 0.653" high, INK panel (#1A1A1A) with NAVY border
//   - Per card: ACCENT day pill (0.733" × 0.213") + title + note
// Connector: 2 dashed lines (MUTE) from CTO band up to centre of each role block
//   line: { color: MUTE, pt: 1, dashType: "dash", endArrowType: "triangle", beginArrowType: "triangle" }
```

**Critical layout decisions:**

- Bar visualization uses tier color fill, value text 0.067" to right of bar end  
- Row count of 11 must match months (May'26 → Mar'27 cycle)  
- "PEAK" note on last data row signals max-value month  
- Connector arrows are bidirectional to show two-way dependency

**When NOT to use this:** if you only have one role (use slide 18-style funnel instead), or if the support role does multiple discrete things (use 5-stage operating flow instead).

---

### 2.18 Three-tier behavior cascade with mechanisms (slide 26)

**When:** Showing 9 behaviors across 3 effort-tiers, each with a specific install mechanism. Critical for revenue-driver slides where the audience needs to understand both the data and the lever to pull on each behavior.

```js
// Layout: 3 horizontal tier rows stacked vertically
// Per tier: tierH = 1.467", arranged top-down at y=1.867 / 3.467 / 5.067
// Each tier row has:
//   - LEFT panel (2.267" wide): tier color fill (ACCENT / AMBER / NAVY)
//       - TIER label (10.7pt tracked-caps WH, charSpacing: 3)
//       - Tier title (21.3pt bold WH) — KEEP TO ONE WORD ("Activation", "Habit", "Intent")
//       - Window range (12pt italic WH)
//       - Impact stat (14.7pt bold WH)
//       - Sub-line (8.7pt italic on coloured bar) — describes why this tier matters
//   - RIGHT zone: 3 behavior cards side-by-side, cardGap = 0.107"
//     Each card:
//       - PANEL background with LINE 0.5pt border (no one-side tier bar)
//       - Event name (14pt bold INK) at top
//       - Pay rate + lift line (10.7pt bold tier color) — the tier colour reads here, not on a left stripe
//       - Divider line (LINE color, 0.016" high)
//       - "MECHANISM" label (9.3pt bold MUTE, charSpacing: 2, tracked-caps)
//       - Mechanism description (10.7pt italic BODY, valign: top, max 3-4 lines)
```

**Tier colour assignment by impact level:** | Tier | Colour | Use case | |---|---|---| | Tier 1 (highest impact) | ACCENT | Activation / load-bearing events | | Tier 2 (medium) | AMBER | Habit / repeat usage | | Tier 3 (lowest) | NAVY | Intent / conversion signals |

**Critical layout decision — single-word tier titles:** Multi-word titles ("Conversion intent") cause text wrap inside the left panel and break the 2x4 line stack. Force single-word titles always: "Activation", "Habit", "Intent".

**Mechanism examples (the value of this slide):**

- portfolio_created → "In-app first-session portfolio prompt with 1-tap defaults"  
- 3+ CRM touchpoints → "GM-owned CRM sequence — drip email + WhatsApp + retargeting"  
- trial activated → "Training Mentor 1:1 call — 'set up your portfolio, what's your investment goal'"

---

### 2.19 Combined targets × behaviors matrix (slide 27)

**When:** Synthesis slide combining role-level totals (top) with role × behavior-tier grid (bottom). Used when the audience has seen the targets slide AND the behaviors slide separately and now needs to see "which behaviors each role installs to deliver their share."

```js
// Layout: two-zone vertical stack
// TOP ZONE (y=1.667, h=1.8) — Phase × Role target totals
//   - Left label corner: "PHASE" + 2 role badges stacked (PM crimson, GM amber)
//   - 3 phase columns: INSTRUMENT / SCALE / HARVEST
//   - Each phase column has 2 cells (PM + GM):
//       Big number (29.3pt bold tier color) + unit ("paid retained" / "paid added")
//       Focus line below (11.3pt italic BODY)
// BOTTOM ZONE (y=3.667) — 3 tiers × 2 roles grid (6 cells total)
//   - Left label corner: "BEHAVIORS" + 2 role labels stacked
//   - 3 tier header cells across top: **INK fill, WH text** (NOT tier colors — see decoupling note below)
//   - PM row of 3 cells (gridRowH = 1.4")
//   - GM row of 3 cells (gridRowH = 1.4")
//   - Each cell:
//       **Role identity by FULL cell fill** (a faint role tint), NOT a one-side left bar: pine-tint for PM cells, a faint amber tint for GM cells
//       Behavior name (13.3pt bold INK) at top
//       Stat target (11.3pt bold **role color** — ACCENT in PM cells, AMBER in GM cells)
//       Divider line
//       "MECHANISM" label (8.7pt tracked-caps MUTE)
//       Mechanism text (10.7pt italic BODY, valign: top)
```

**Tier/role colour decoupling (updated May 2026):** Tier column headers use INK fill (not ACCENT / AMBER / NAVY tier colours) and cell accents use the ROLE colour of the row they sit in. Why: with tier colours in column headers AND role colours as the implicit grid axis, AMBER appeared as both "Tier 2 impact" and "GM role." Readers inferred "GM owns Tier 2 entirely." See Section 1.5 Two-axis grid rule. Slide 26 retains the ACCENT / AMBER / NAVY tier panels because it has no role labels and no axis collision is possible there.

**The reconciliation math** that must hold true on this slide:

- PM phase totals sum to PM total in spreadsheet (e.g. 0+50+231 = 281)  
- GM phase totals sum to GM total in spreadsheet (e.g. 244+811+1,601 = 2,656)  
- Total path = 467 baseline + PM + GM + Training (281+2,656+325) − churn = ~3,000

**Critical layout decisions:**

- Phase column widths must be equal (use `(slideW - labelW - margins) / 3`)  
- Top zone phase header is single dark bar with phase name + month range inline  
- Each cell behavior + mechanism follows the same pattern as slide 26 cards for consistency  
- The "installs / these behaviors" hint text under role label connects top totals to bottom behaviors

---

### 2.20 Source-to-destination diagram (slide 28)

**When:** Showing fragmented current state consolidating into a unified destination. Examples: data sources → unified analytics layer, multiple tools → single system of record, distributed inputs → consolidated decision artifact. Used on slide 28 to show three siloed analytics tools (GHL CRM, Firebase mobile, Clarity web) consolidating into GA4.

```js
// Layout: two-zone vertical stack with arrows between
// TOP ZONE (y=2.373, h=2.333) — Source cards row
//   - Section label "TODAY · N SILOED SOURCES" (10.7pt tracked-caps MUTE) at y=2.373
//   - N source cards side by side starting y=2.693, h=2.067, gutter=0.133
//   - Each card (PANEL fill, LINE border at 0.75pt):
//       Tool name (24pt bold INK) top-left
//       Subtype label (10.7pt bold ACCENT tracked-caps, charSpacing: 2) — e.g. "CRM" / "MOBILE" / "WEB"
//       Status pill top-right (1.4" × 0.32", role-of-tool colour):
//         G (#2F7A55) for LIVE / done
//         A (#B07D2B) for LOADING / in progress
//         MUTE (#8A8D90) for PENDING / not started
//       "CAPTURES" label (8.7pt tracked-caps MUTE)
//       Captures description (11.3pt BODY, 2–3 lines)
//       Divider line (LINE, 0.5pt)
//       Stat at bottom (11.3pt bold INK) — e.g. "5,200 engaged leads"
// MIDDLE ZONE (y=4.867, h=0.267) — Arrows
//   - One downward ▼ chevron (18.7pt, MUTE) centered under each source card
// BOTTOM ZONE (y=5.2, h=1.667) — Destination panel
//   - TINT (#E6EFEA) fill, TINT_BORDER (#C9DBD2) border at 0.75pt — full hairline, NO one-side accent bar (the pine tint anchors it)
//   - Title (17.3pt bold INK, tracked-caps via charSpacing: 2) — e.g. "GA4 · UNIFIED ANALYTICS LAYER"
//   - Tagline (13.3pt italic MUTE) — single-line description
//   - Row of capability tag cards: WH fill, LINE border at 0.5pt, INK text (10.7pt centered)
```

**Critical layout decisions:**

- Destination panel must be TINT, never INK or NAVY. See Section 1.5 destination panel rule.
- Status pills are role-of-tool, not column position — no two-axis colour clash. See Section 1.5 two-axis grid rule.
- Capability tag cards should be evenly spaced. Compute spacing as `(panelW - 0.333) / N` where N is number of tags.
- Footer note should reference the rest of the deck explicitly — e.g. "Once GHL upload completes and Firebase joins, every chart on slides 25–27 sources from a single GA4 view." This earns the slide its place in the deck.

**Generalisation:** This pattern works for any "N → 1" consolidation story: tools → platform, teams → org, datasets → warehouse, stakeholders → decision. The source cards carry the heterogeneity (different shapes of inputs); the destination carries the simplification (one shape of output).

---

### 2.21 Dual-axis line chart with crossover annotation

**Source:** stress-test-10.pptx, slide 1 (ROI program economics).

**When to use:** showing the relationship between two cumulative quantities over time where the crossover point is the story (payback, break-even, market overtake). The chart IS the takeaway; a stat table cannot do this work.

**Anatomy:**
- Chart area: 12.667" × 5.6" (left 12.667" of canvas), with right 3.067" reserved for a 3-takeaway panel.
- Two y-axes are conceptually present (different magnitudes) but visually rendered as one because both series are in the same unit (PKR M). Use one shared y-axis when the units allow; only split axes when truly necessary.
- 18 monthly data points along the x-axis. Two line series (AMBER for cost/investment, GREEN for revenue/return). 2.5pt line weight, oval dots at each point — but only LABEL the endpoints, not every point.
- **Crossover band:** a vertical ACCENT shaded strip (0.107" wide, 70% transparency) marking the month where the lines cross. Labelled "Crossover / Month N" above the band in bold ACCENT.
- **Endpoint labels:** at the rightmost point of each line, a bold colored label naming the value (e.g. "Cumulative spend / PKR 6.2M @ M18"). Position label to the LEFT of the endpoint dot so it doesn't run off the canvas.
- **Right panel:** 3 vertically-stacked takeaways (PAYBACK / ROI / RUN-RATE), each with tracked-caps label, big stat, italic context line. Inset by 0.333" from left edge of panel. No one-side accent bar — separate the panel from the chart with whitespace and a single LINE hairline, and let the tracked-caps ACCENT labels carry the emphasis.

**Common defects to avoid:**
- Y-axis tick labels overlap with chart legend if legend is positioned at top-left of chart area. Move legend OUTSIDE the plot area, or position it bottom-left of the chart card.
- "Crossover" annotation collides with legend if both are at the top of the chart. Put the annotation INSIDE the plot area near the band; put the legend at the chart card's outer edge.
- Right-panel stat strings that wrap mid-number (e.g. "PKR 2.5M / mo" wrapping to "PKR 2.5M /" + "mo") need narrower font or wider panel. Pre-test long stat strings.

**Variants:**
- Replace crossover-shaded-band with a single vertical dashed line + label if the crossover is a precise point not a range.
- Use this pattern for any "cumulative A vs cumulative B over time" story: investment vs revenue, sales vs cost, paid users vs trial users, model accuracy vs training data.

---

### 2.22 Unit-economics waterfall (vertical cascading bars)

**Source:** stress-test-10.pptx, slide 2 (Premium account LTV decomposition).

**When to use:** breaking down a final metric (LTV, contribution margin, runway, deal value) into the components that build or erode it. Each component as a bar, chained visually so the reader sees the math.

**Anatomy:**
- Chart area: 11.333" × 4.533" (left side), right 3.067" for an INK summary panel with 4 key stats.
- Each step gets one bar. Three bar types:
  - `neg` (cost, churn, drag): bar drops BELOW baseline. Colour: R (red).
  - `build` (revenue contribution, ARPU year): bar rises ABOVE running cumulative. Colour: G (green).
  - `total` (final LTV): single bar from baseline to final value. Colour: ACCENT.
- Bar width = `(chartW / (numSteps + 1)) * 0.65` to leave gaps between bars.
- **Connectors:** dashed MUTE lines (0.75pt) bridge each bar's EXIT point to the next bar's ENTRY point. For `neg` bar, exit is bottom-right; for `build` bar, exit is top-right. This is what makes it READ as a waterfall, not a bar chart.
- **Value labels:** above each bar's top edge (NOT below the bar for neg bars — the bottom edge often collides with column labels below the baseline). Bold, color-matched to bar.
- **Column labels:** below baseline. Step name (bold INK, 14.7pt), sub-note in italic MUTE 11.3pt.
- **Y-axis label:** "PKR per account" (or relevant unit) — render HORIZONTALLY at top-left of chart area, NOT rotated. Rotated text in pptxgenjs has rendering bugs across LibreOffice/PowerPoint.

**Right INK panel:** four vertically-stacked stats (ARPU, payback, lifetime, LTV/CAC ratio). Same internal layout as 2.21's right panel but on INK background (WH text, ACCENT section label).

**Common defects:**
- If a `neg` bar is short (CAC dropping only ~10% of chart height), the value label below it collides with column labels. Always place value labels above bar's TOP, not below the bar's bottom.
- Chart height must leave 0.667"+ below the baseline for column labels and sub-notes. Don't stretch the chart all the way to the footer.
- Connectors must use the EXIT point that matches the bar type. neg→bottom-right, build→top-right. Getting this wrong makes bars look disconnected.

---

### 2.23 Horizontal tornado bar chart with target line

**Source:** stress-test-10.pptx, slide 3 (D1 retention sensitivity).

**When to use:** showing outcome as a function of one input variable across 5-8 scenarios. The story is the spread (gap between worst and best scenario) and where the target line cuts. More effective than a stat table when the reader needs to feel the magnitude of variance.

**Anatomy:**
- 6 rows, each a scenario. Row height ≈ chartH / numRows (no gaps — bars touch vertically for compactness, since the input label distinguishes them).
- Left column: input label (e.g. "D1 = 7%"), 1.333" wide, INK bold 17.3pt.
- Bar area: ~8.667" wide. Bar height = rowH - 0.48" (small inset for breathing room).
- **Color encoding:** below baseline scenario = R, near baseline = A, target-or-above = G. This is a 3-tier traffic-light gradient.
- Value label INSIDE the bar at the right edge (white text, 16pt bold).
- Scenario label OUTSIDE the bar (italic BODY, 12.7pt) e.g. "Worse than today", "Today's baseline", "Target", "Benchmark".
- **Target line:** vertical ACCENT dashed line cutting through the entire chart at the target value (e.g. 3,000 paid subs). Labelled "3,000 target" above the line in bold ACCENT.
- **Right-side assumptions panel:** TINT 3.067" panel with bullet list of "HOLDING CONSTANT" assumptions. Anchors the reader on what's varied vs what's held.

**Common defects:**
- Long scenario labels ("Benchmark range") get clipped if the bar extends close to the assumptions panel. Either shorten labels or shrink bar area width.
- Target line MUST extend slightly above and below the chart area to read as a complete line, not as a chart-internal mark.

---

### 2.24 2D heatmap with target cell highlight

**Source:** stress-test-10.pptx, slide 4 (D1 retention × Trial-to-paid conversion).

**When to use:** showing how outcome varies across two interacting variables. The 5×5 (or 4×4 or 6×6) grid encodes outcome as cell color + cell value, revealing which combinations work and which don't. This is the densest possible information layout for a 2-variable sensitivity analysis.

**Anatomy:**
- Grid area: ~9.0" × 5.0" (5×5 cells at 1.8" × 1.0" each).
- Top axis (X): variable 1 levels (e.g. D1 = 5%, 10%, 15%, 20%, 25%). INK bold 14.7pt above grid. Caps label "VARIABLE NAME →" above the level row, MUTE 12pt tracked-caps.
- Left axis (Y): variable 2 levels (e.g. T→P = 15%, 20%, 25%, 30%, 35%). INK bold 14.7pt right-aligned. Caps label vertically positioned to the left.
- Cells: outcome value (bold 16pt, center-aligned). Color graded across 5 thresholds (R / R_LITE / A / A_LITE / G), with WH text for dark cells and INK text for light cells.
- **Target cell:** the cell where outcome equals the deck's target metric gets a 3pt ACCENT outline. Calibrate the outcome formula so this cell falls at meaningful coordinates (e.g. for slide 4, formula is `outcome = (d1/15) * (t2p/25) * 3000` so D1=15, T2P=25 = exactly 3000).
- **Legend:** below grid, 5 color swatches with thresholds (e.g. "<1.5K", "1.5–2.5K", etc.).
- **Right reader panel:** 3 stacked sections (HOW TO READ / THE TARGET CELL / WHAT THIS RULES OUT). Same panel format as 2.23.

**Common defects:**
- Calibrate the outcome formula BEFORE picking the target cell — otherwise the crimson outline points at the wrong cell. Math first, layout second.
- Rotated y-axis label often renders badly. Use a horizontal label positioned to the left of the row labels instead.
- Cell-text contrast: green-on-green can be hard to read. Use WH text for R, R_LITE, A, G fills; INK text for A_LITE.

---

### 2.25 Triptych trajectory (3 scenario line charts side-by-side)

**Source:** stress-test-10.pptx, slide 5 (BASE / STRETCH / WORST paths); also Monday Read slide 1 (3 surface trajectories).

**When to use:** comparing 3 plausible futures or 3 parallel entities over time. Each scenario gets its own mini-chart in its own card; cards are read side-by-side to compare shapes.

**Anatomy:**
- 3 cards horizontal, each 5.333" wide, 5.6" tall, with 0.2" gaps.
- Each card: top header strip (0.667" tall) with scenario name (tracked-caps WH bold) and sub-description (italic WH 12pt). Header color = scenario category (A for base, G for stretch/good, R for worst).
- Mini-chart inside: ~4.267" wide × 2.467" tall. 9 data points along the x-axis.
- **Target line:** dashed ACCENT horizontal line at the target value, cutting through every chart at the same y-position. Labelled "3,000" at the right edge in 10pt bold ACCENT.
- Plot trajectory with 2.2pt line + 0.16" oval dots at each data point.
- X-axis labels at start and end of period (e.g. "Apr '26" / "Mar '27"), 10pt MUTE.
- **Endpoint stat:** below the chart, the final value in 37.3pt bold scenario color, centered.
- **Delta annotation:** below the stat, italic bold 13.3pt BODY, e.g. "Below 3,000 target" / "Hits target" / "Loses ground".
- **Read-line:** at bottom of card, 2-3 sentence narrative explaining what would have to be true for this scenario. 12pt BODY. Separated from stat by a 0.5pt LINE divider.

**Common defects:**
- Read-line gets clipped at the bottom of the card if it runs longer than 3 lines. Either shorten the prose or lengthen the card. Test with the longest scenario's read-line.
- The same target line on all three charts uses the same y-position regardless of chart's individual y-scale. This is intentional — all three charts must share a y-scale to be comparable. Don't auto-scale per chart.

---

### 2.26 Decision tree with probability branches

**Source:** stress-test-10.pptx, slide 6 (5 decisions × YES/NO branches with joint probability).

**When to use:** showing a sequence of strategic decisions where each has a binary or trinary outcome, and the joint probability is the punchline. Different from a flowchart (process) — this is decisions and outcomes, not steps.

**Anatomy:**
- N decision nodes in horizontal sequence. Each node ≈ 2.933" wide × 1.267" tall, full INK fill (no one-side accent bar — the full INK fill carries the node).
- Inside each decision node: caps label (tracked-caps WH 12pt, e.g. "Q2 hire") + decision question (WH bold 16pt, e.g. "Hire PM Fintech?").
- Connector arrows between decisions: MUTE line with triangle endpoint, horizontal midline-to-midline.
- Below each decision node: TWO branch cards stacked vertically:
  - YES branch: G_LITE fill, G border. "YES" tracked-caps label top-left in G. Probability percentage top-right in G bold. Outcome description (e.g. "PM in seat Q3") below.
  - NO branch: R_LITE fill, R border. Same structure.
- **Reader band at bottom:** TINT, full-width, with the joint-probability multiplication explained (e.g. "P(STRETCH) ≈ 4%. P(BASE) ≈ 28%. P(WORST) ≈ 68%").

**Common defects:**
- ACCENT tracked-caps labels on INK backgrounds (the decision-node sub-labels) have low contrast. Set the sub-label in WH at 12pt instead; reserve ACCENT for the node's stat text and the YES/NO branch accents, not for an edge stripe.
- Branch cards need consistent vertical alignment across decisions. If one decision's YES card is taller (longer outcome text), all NO cards in the row should match that height for visual symmetry.

---

### 2.27 12-cell dashboard mockup (KPIs + sparklines + alerts)

**Source:** stress-test-10.pptx, slide 7 ("Six numbers, four trajectories, one alert").

**When to use:** showing what a real operating dashboard would look like, mid-deck, to anchor a discussion of "what should we be tracking weekly." High-density slide that visually mimics a production dashboard rather than describing one.

**Anatomy:**
- Grid: 4 columns × 3 rows = 12 cells. Cell dimensions ≈ 4.0" × 1.933" with 0.133" gaps.
- **Row 1 — 4 KPI cells:** each cell has a colored status bar at top (G/A/R), tracked-caps label, big stat (37.3pt bold INK), and delta annotation (italic bold 14.7pt status-color).
- **Row 2 — 4 sparkline cells:** each cell has a tracked-caps label and a sparkline below. Sparklines use 1.8pt lines, only the start and end points get dots (don't dot every data point — 12 weeks of dots looks like a chickenpox rash).
- **Row 3 — 1 wide alert + 2 status cells:**
  - Alert cell spans 2 columns. R_LITE fill with R border (no one-side accent bar). "⚠ ALERT" header in R bold carries the urgency. 2-3 line description of the trigger.
  - Two status cells (each 1 column): tracked-caps label, rounded status pill (G/A/R fill), italic sub-note.

**Common defects:**
- Sparklines render very small inside their cells; data shape gets lost. Either shorten the time series to fewer points (8 weeks vs 12) or make sparkline cells taller (2 rows × 2.0 height instead of 3 rows × 1.333).
- Status bars at the top of KPI cells must be the FIRST shape drawn, before the cell background, or they get covered.
- The wide alert cell looks weird if the alert text is short. Pre-write longer alert prose (2-3 sentences) so the cell looks substantive.

---

### 2.28 Escalation threshold table

**Source:** stress-test-10.pptx, slide 8 (3 thresholds: acquisition / D1 retention / T→P conversion).

**When to use:** defining when a metric movement should trigger CEO attention vs operating-layer triage. Differentiates dashboard noise (everyday fluctuation) from signal (action required).

**Anatomy:**
- Table with 5 columns: METRIC (with sub-context) / CURRENT / THRESHOLD / STATUS / AUTO-ACTION.
- Header row: INK fill, WH bold tracked-caps, 0.6" tall.
- Data rows: alternating PANEL / WH backgrounds, ~1.533" tall each. 3-5 rows max (more than 5 dilutes the "these are the rare ones" framing).
- Metric cell: bold INK 14.7pt name + italic MUTE 12pt sub-note (e.g. "Mar→Apr collapsed −71%").
- Current cell: bold INK 24pt, center-aligned.
- Threshold cell: bold MUTE 18.7pt, center-aligned (smaller than current — visual hierarchy says "this is the rule, not the data").
- Status cell: rounded pill, color = status (R for BREACH, A for WATCH, G for CLEAR). WH text on color fill.
- Auto-action cell: 13.3pt BODY, left-aligned, describes the specific procedural response.
- **Reader band below table:** the pine-tint strip — TINT fill + TINT_BORDER hairline, no one-side accent bar — with "HOW THIS WORKS" explainer.

**Common defects:**
- If the table has more than 5 rows, the reader band gets pushed past the footer. Either cap rows at 5 or remove the reader band.

---

### 2.29 Building-block cascade with cumulative tracker

**Source:** stress-test-10.pptx, slide 9 ("The math behind 3,000: building blocks add up").

**When to use:** showing how an end-state target is built from a baseline plus components. Different from waterfall (2.22): waterfall is one bar per component with chain logic; cascade is **horizontal stacked bars per row with a running cumulative shown on the right**.

**Anatomy:**
- N rows (one per building block). Each row: left label cell (~3.2" wide), bar area in the middle, value label slot, cumulative label on right.
- Bar area: 7.6" wide. Bars start at the **previous cumulative** position and extend to the **new cumulative** position. So a "+580" block bar starts at x=467/maxCum and ends at x=1047/maxCum.
- For `add` blocks: G fill. For `sub` blocks: R fill, bar extends LEFTWARD from previous cumulative.
- Value label: in a FIXED right-side slot (x ≈ 12.667"), right-aligned, color-matched. NOT floating after the bar — that creates collisions when bar end is close to cumulative.
- Cumulative label: "= 1,047" format, INK bold, in a fixed slot to the right of the value label.
- **Goal bar:** full-width ACCENT bar at the bottom showing the target. Label center-aligned ("3,000 ACTIVE ACCOUNTS · Q1 2027") with "Target hit" italic bold on the right.
- X-axis tick labels (0, 1K, 2K, 3K) above the first row, in MUTE 11.3pt.

**Common defects:**
- Without the fixed value-label slot, the last row's bar end collides with the cumulative column. Always reserve a fixed slot for value labels at a specific x-coordinate.
- All numeric values must use `toLocaleString()` for thousands separators. "+1100" without comma looks rough.
- Row height matters: 6 rows × 0.867" + 0.267" gap above goal bar = needs ~6.0" of vertical space. Goal bar must fit above footer.

---

### 2.30 Stress-test signal grid (scenario × dimension cards)

**Source:** stress-test-10.pptx, slide 10 (3 break scenarios × TRIGGER/SIGNAL/MITIGATION).

**When to use:** defensive analysis showing 2-4 scenarios that could break the plan, with the trigger, the earliest detectable signal, and the mitigation. Closing slide pattern that gives the audience comfort that downside is named.

**Anatomy:**
- 3 cards horizontal, each ~5.467" wide × 5.867" tall.
- **Card header:** 0.8" tall, scenario-color fill (R for black swan, A for medium-probability risks). Inside: tracked-caps WH bold scenario name + italic WH sub-description.
- **Probability pill:** white-on-color pill in the top-right of header, e.g. "Low (5%)", "Medium (35%)".
- **Body:** 3 vertically-stacked sections, each ~1.533" tall:
  - TRIGGER (tracked-caps scenario-color label + 12.7pt BODY prose)
  - EARLIEST SIGNAL (same structure)
  - MITIGATION (same structure)
- Section dividers: 0.5pt LINE between each section.

**Common defects:**
- Body text must fit in ~1.333" tall after subtracting section label height. Pre-write prose at 2 sentences max per section.

---

### 2.31 Phased agenda rail (extended)

Catalogued as `phased-agenda-rail` (role `frame`, arrangement `row`).

**When to use:** the contents page of a layered or spine deck, and again at each section break. A left phase rail groups the agenda rows by macro-phase; the live section reads in accent fill with bold rows while the rest grey out, so the reader always sees the whole arc and where they sit in it. Use `section-divider` instead for a single act break that needs no map.

**Anatomy:** plain display-font title (no breadcrumb header — this is a frame slide), full-width ACCENT hairline under it, three column labels (ITEM / DESCRIPTION / PG). Each macro-phase is one rail block whose height spans its item rows. The live block is a full ACCENT fill (not a one-side bar); inactive phases get no container at all — just a greyed label, a flatter hierarchy with no nested cards. The agenda number is a plain right-aligned numeral, no circle tile. A LINE hairline sits under each item row. Set `ACTIVE` to the live section index.

```js
// assumes the token block + DISPLAY/FONT from Section 3 are defined
const a = pres.addSlide();
a.background = { color: SURFACE };
a.addText("Table of contents", { x: 0.533, y: 0.4, w: 9, h: 0.6, fontSize: 30, color: INK, fontFace: DISPLAY });
a.addShape(pres.ShapeType.rect, { x: 0.533, y: 1.12, w: 12.267, h: 0.02, fill: { color: ACCENT }, line: { color: ACCENT } });

const colItemX = 2.55, colDescX = 6.4, colPageX = 12.0;
a.addText("ITEM", { x: colItemX, y: 1.22, w: 3.6, h: 0.3, fontSize: 10.5, bold: true, color: ACCENT, charSpacing: 2, fontFace: FONT });
a.addText("DESCRIPTION", { x: colDescX, y: 1.22, w: 5.2, h: 0.3, fontSize: 10.5, bold: true, color: ACCENT, charSpacing: 2, fontFace: FONT });
a.addText("PG", { x: colPageX - 0.2, y: 1.22, w: 0.8, h: 0.3, fontSize: 10.5, bold: true, color: ACCENT, charSpacing: 2, fontFace: FONT, align: "right" });

const phases = [ /* { name:"DEFINING", items:[ {n:0,t:"…",d:"…",pg:6}, … ] }, … one per macro-phase */ ];
const ACTIVE = 1;            // live section index
const rowH = 0.515, railX = 0.533, railW = 1.85, gap = 0.05;
let ry = 1.62;
phases.forEach((ph, pi) => {
  const top = ry, h = ph.items.length * rowH - gap, on = pi === ACTIVE;
  // active = full ACCENT fill block; inactive = no container, just a label (flatter hierarchy, no nested cards)
  if (on) a.addShape(pres.ShapeType.rect, { x: railX, y: top, w: railW, h, fill: { color: ACCENT }, line: { color: ACCENT } });
  a.addText(ph.name, { x: railX, y: top, w: railW, h, fontSize: 11.5, bold: true, color: on ? WH : MUTE, charSpacing: 2, fontFace: FONT, align: on ? "center" : "left", valign: "middle" });
  ph.items.forEach((it) => {
    const txtCol = on ? INK : "9CA0A2", dCol = on ? BODY : "AEB2B3";
    // plain right-aligned numeral, no circle tile
    a.addText(`${it.n}`, { x: colItemX - 0.55, y: ry, w: 0.36, h: rowH, fontSize: 12, bold: true, color: on ? ACCENT : "C2C6C7", fontFace: FONT, align: "right", valign: "middle" });
    a.addText(it.t, { x: colItemX, y: ry, w: 3.7, h: rowH, fontSize: 13, bold: on, color: txtCol, fontFace: FONT, valign: "middle" });
    a.addText(it.d, { x: colDescX, y: ry, w: 5.3, h: rowH, fontSize: 12, color: dCol, fontFace: FONT, valign: "middle" });
    a.addText(`${it.pg}`, { x: colPageX - 0.4, y: ry, w: 0.8, h: rowH, fontSize: 12, color: txtCol, fontFace: FONT, align: "right", valign: "middle" });
    a.addShape(pres.ShapeType.rect, { x: colItemX, y: ry + rowH - 0.01, w: 9.85, h: 0.008, fill: { color: LINE }, line: { color: LINE } });
    ry += rowH;
  });
  ry += gap;
});
```

**Common defects:** keep total rows ≤ 11 so the last row clears the footer (`ry` ends below 6.97). Inactive rows use the greyed text colours `9CA0A2` / `AEB2B3` (lighter than MUTE) so they recede without vanishing; inactive numerals drop to `C2C6C7`.

---

### 2.32 Iterative cycle flow (extended)

Catalogued as `iterative-cycle-flow` (role `sequence`, arrangement `cycle`).

**When to use:** a process that repeats rather than ends — sprint loops, always-on operating models, continuous-improvement methodologies. The central hub names the cadence; the ring + directional chevrons say "this comes back to the start." Use `operating-flow-5stage` instead for a linear process that terminates.

**Anatomy:** a ring of numbered INK nodes around a filled ACCENT cadence hub. Direction is shown by AMBER `chevron` shapes placed at each chord midpoint and rotated to the chord angle (no curved connectors — they are a render trap). Node labels sit OUTSIDE the ring, aligned away from the node so they never overlap the circle. Coordinates below are tuned for 6 nodes; for other counts the step is `360 / cyc.length`, and the top/bottom label indices shift accordingly.

```js
// assumes token block (incl. DISPLAY/FONT) + header()/title()/footer() from Section 3
const b = pres.addSlide();
header(b, "OPERATING MODEL", 15);
title(b, "<context line>", "<action headline>");

const cx = 6.667, cy = 4.5, Rr = 1.5, nodeD = 0.72;
const cyc = [ /* { t:"STAGE", s:"qualifier" } × 4–6, clockwise from top */ ];
const step = 360 / cyc.length;
const pts = cyc.map((_, i) => {
  const ang = (-90 + i * step) * Math.PI / 180;
  return { x: cx + Rr * Math.cos(ang), y: cy + Rr * Math.sin(ang) };
});
b.addShape(pres.ShapeType.ellipse, { x: cx - Rr, y: cy - Rr, w: 2 * Rr, h: 2 * Rr, fill: { type: "none" }, line: { color: LINE, pt: 1 } });
for (let i = 0; i < pts.length; i++) {                 // directional chevrons = the loop runs one way
  const p = pts[i], q = pts[(i + 1) % pts.length];
  const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
  const ang = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;
  b.addShape(pres.ShapeType.chevron, { x: mx - 0.18, y: my - 0.15, w: 0.36, h: 0.3, fill: { color: A }, line: { color: A }, rotate: ang });
}
b.addShape(pres.ShapeType.ellipse, { x: cx - 0.85, y: cy - 0.85, w: 1.7, h: 1.7, fill: { color: ACCENT }, line: { color: ACCENT } });
b.addText("2-WEEK\nSPRINT", { x: cx - 0.85, y: cy - 0.46, w: 1.7, h: 0.66, fontSize: 14.5, bold: true, color: WH, fontFace: FONT, align: "center", valign: "middle", lineSpacingMultiple: 0.95 });
b.addText("CONTINUOUS LOOP", { x: cx - 0.85, y: cy + 0.2, w: 1.7, h: 0.28, fontSize: 8, color: "C9DBD2", charSpacing: 1, fontFace: FONT, align: "center" });
cyc.forEach((st, i) => {
  const p = pts[i];
  b.addShape(pres.ShapeType.ellipse, { x: p.x - nodeD / 2, y: p.y - nodeD / 2, w: nodeD, h: nodeD, fill: { color: INK }, line: { color: WH, pt: 1.5 } });
  b.addText(`${i + 1}`, { x: p.x - nodeD / 2, y: p.y - nodeD / 2, w: nodeD, h: nodeD, fontSize: 16, bold: true, color: WH, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  // zone-based label placement so labels never collide with their node (indices below assume 6 nodes)
  let mx, my, sy, mw, al;
  if (i === 0) { mw = 2.0; mx = p.x - 1.0; al = "center"; my = p.y - nodeD / 2 - 0.60; sy = p.y - nodeD / 2 - 0.32; }
  else if (i === 3) { mw = 2.0; mx = p.x - 1.0; al = "center"; my = p.y + nodeD / 2 + 0.06; sy = p.y + nodeD / 2 + 0.34; }
  else if (Math.cos((-90 + i * step) * Math.PI / 180) > 0) { mw = 1.95; mx = p.x + nodeD / 2 + 0.14; al = "left"; my = p.y - 0.30; sy = p.y + 0.02; }
  else { mw = 1.95; mx = p.x - nodeD / 2 - 0.14 - mw; al = "right"; my = p.y - 0.30; sy = p.y + 0.02; }
  b.addText(st.t, { x: mx, y: my, w: mw, h: 0.30, fontSize: 12.5, bold: true, color: INK, fontFace: FONT, align: al });
  b.addText(st.s, { x: mx, y: sy, w: mw, h: 0.26, fontSize: 10, italic: true, color: MUTE, fontFace: FONT, align: al });
});
```

**Common defects:** the bottom node's sub-label is the element most likely to cross the footer — with `cy = 4.5, Rr = 1.5` it lands at ~6.94, just inside the 6.97 limit; raise `cy` or shrink `Rr` if you add a longer qualifier. Keep stage names to one word so side labels fit the 1.95" box.

---

### 2.33 Dot / lollipop ranking (render-safe bar alternative)

**Why it exists:** to break a run of adjacent horizontal-bar slides. Coverage tag `{role: rank, arrangement: axis}` — this is a deliberate **restyle** of the filled `rank × axis` cell (`prioritisation-matrix`), not a new Pattern Index entry. It exists so the "Vary the bar idiom across adjacent slides" convention (`slide_patterns.md`) has a copy-able recipe, not to inflate the catalogue.

**When to use:** a ranking of 4–8 items by a single value, when an adjacent slide already uses a filled horizontal bar. A dot on a stem reads as the same ranking with much less ink, so two ranking slides stop looking identical. Keep the highest (or focus) row in `ACCENT`; mute the rest. Hand-drawn from rects + ellipses only, so it survives the PPTX→Google Slides import (unlike native `addChart` bars).

```js
// rows sorted biggest-to-smallest; one focus row carries the accent
const rows = [ /* { sig:"label", val:"≈25% pay", x:167, focus:true } … */ ];
const vMax = 167, axX = 4.6, axMaxW = 5.0, rowY = 2.7, rowH = 0.6;
const firstYc = rowY + 0.28, lastYc = rowY + (rows.length - 1) * rowH + 0.28;
// 1. baseline axis (thin vertical hairline at the zero point)
s.addShape(rect, { x: axX, y: firstYc - 0.26, w: 0.015, h: (lastYc - firstYc) + 0.52, fill: { color: LINE }, line: { color: LINE } });
rows.forEach((d, i) => {
  const yc = rowY + i * rowH + 0.28;                       // row centre-line
  s.addText(d.sig, { x: 0.533, y: yc - 0.21, w: 3.9, h: 0.42, fontSize: 12, bold: d.focus, color: d.focus ? INK : BODY, fontFace: FONT, valign: "middle" });
  const dotX = axX + axMaxW * d.x / vMax;
  const dotD = d.focus ? 0.30 : 0.24;
  // 2. stem (thin rect from axis to dot) — drawn before the dot so the dot sits on top
  s.addShape(rect, { x: axX, y: yc - 0.022, w: Math.max(0, dotX - axX), h: 0.045, fill: { color: "C7D2CD" }, line: { color: "C7D2CD" } });
  // 3. dot (ellipse), focus row larger + accent
  s.addShape(ellipse, { x: dotX - dotD / 2, y: yc - dotD / 2, w: dotD, h: dotD, fill: { color: d.focus ? ACCENT : "6E8B81" }, line: { color: d.focus ? ACCENT : "6E8B81" } });
  s.addText(`${d.x}x`, { x: dotX + dotD / 2 + 0.1, y: yc - 0.2, w: 1.2, h: 0.4, fontSize: 13.5, bold: true, color: d.focus ? ACCENT : INK, fontFace: FONT, valign: "middle" });
});
```

**Common defects:** dot value label collides with the next row's dot when two values are close — keep `axMaxW ≤ 5.0` so labels have right-margin room. The stem must be drawn before the dot (draw order = z-order in pptxgenjs) or the dot's edge is clipped by the stem. Stems use a lighter tint (`C7D2CD`) than the dots so the dots stay the focal mark.

---

### 2.34 Monoline icons (Lucide → recolored PNG)

**What it is:** an optional restraint-bound device, not a layout — icons attach to existing card/node/heading elements to aid scanning.

**When to use:** to signpost the elements a reader scans first — section headings, stage nodes, KPI/lever cards. Icons earn their place when they are *monoline, one accent, consistent stroke, and sparing*. They become a slop tell the moment they go multicolor, filled/duotone, clip-arty, or appear on every text run. The anti-slop layer (`references/anti-slop.md`) bans "corporate clip art"; this recipe is how to add icons without tripping it.

**Why not Noun Project / SVG-direct:** Noun Project needs OAuth API auth and CC-BY attribution on free icons, and its filled glyphs read clip-arty. Lucide (ISC, no attribution) is monoline and matches the v5 hairline system. pptxgenjs `addImage` with an SVG data URI renders unreliably through the LibreOffice PDF conversion, so **rasterize to PNG** — do not embed SVG.

**Pipeline (build-time, no system deps):**

```bash
npm install lucide-static @resvg/resvg-js   # ISC icons + prebuilt Rust rasterizer (no cairo/system libs)
```

```js
// gen-icons.js — run once before build.js; writes icons/<label>.png
const fs = require("fs"), path = require("path");
const { Resvg } = require("@resvg/resvg-js");
const LUCIDE = path.join(path.dirname(require.resolve("lucide-static/package.json")), "icons");
const RES = 256, STROKE = 2.0;                       // one raster size + one stroke weight for ALL icons
function makeIcon(lucideName, hex, label) {          // hex = no leading '#'
  const svg = fs.readFileSync(path.join(LUCIDE, `${lucideName}.svg`), "utf8")
    .replace(/currentColor/g, `#${hex}`)             // Lucide strokes are stroke="currentColor"
    .replace(/stroke-width="[\d.]+"/g, `stroke-width="${STROKE}"`);
  fs.writeFileSync(path.join("icons", `${label}.png`),
    new Resvg(svg, { fitTo: { mode: "width", value: RES } }).render().asPng());
}
// white icons for dark nodes/chips, ACCENT icons for light cards — only those two colours
```

```js
// in build.js — addImage the PNG; keep every icon the SAME on-slide size
s.addImage({ path: `icons/${name}.png`, x, y, w: 0.34, h: 0.34 });   // light card heading: pine icon left of label
s.addImage({ path: `icons/${name}.png`, x: p.x - 0.21, y: p.y - 0.21, w: 0.42, h: 0.42 }); // centered in a dark node
```

**Locked rules:** (1) two colours only — `WH` on dark fills, `ACCENT` on light fills; never multicolor. (2) one stroke weight + one raster size across the whole deck. (3) square on-slide box (`w === h`) so nothing distorts. (4) a meaningful glyph, not decoration — `target` for activation, `refresh-cw` for renew, `credit-card` for convert; a generic dot would be noise. (5) icons replace or sit beside existing labels; they do not add a new column or band.

**Common defects:** SVG embedded directly renders blank or black through LibreOffice — always rasterize to PNG. A non-square `w/h` stretches the glyph. Recoloring by post-tinting the PNG muddies the stroke; recolor the SVG *before* rasterizing (swap `currentColor`). The deck dir's `node_modules` must be a real local install, not a symlink to the global — the symlink breaks `require.resolve` mid-build.

---

## 3. Reusable Helper Functions

```js
// Every deck should implement these 3 helpers before building slides
function header(s, breadcrumb, num, total) {
  s.background = { color: SURFACE };
  s.addText(breadcrumb.toUpperCase(), { x:0.533, y:0.4, w:9, h:0.3, fontSize:10.7, bold:true, color:ACCENT, fontFace:FONT, charSpacing:3 });
  s.addText(total ? `${num} / ${total}` : `${num}`, { x:10.533, y:0.4, w:2.267, h:0.3, fontSize:10.7, color:MUTE, fontFace:FONT, align:"right" });
  s.addShape(pres.ShapeType.rect, { x:0.533, y:0.8, w:12.267, h:0.013, fill:{color:LINE}, line:{color:LINE} });
}
function title(s, context, headline) {
  s.addText(context, { x:0.533, y:1.0, w:12.267, h:0.4, fontSize:13.7, italic:true, color:ACCENT, fontFace:FONT });
  s.addText(headline, { x:0.5, y:1.4, w:12.3, h:0.95, fontSize:30, bold:DISPLAY_BOLD, color:INK, fontFace:DISPLAY });
}
function footer(s, note, label) {
  s.addText(note, { x:0.533, y:7.067, w:9.333, h:0.333, fontSize:11, italic:true, color:MUTE, fontFace:FONT });
  s.addText(label, { x:10.0, y:7.067, w:2.8, h:0.333, fontSize:11, color:MUTE, fontFace:FONT, align:"right" });
}
// RACI cell colour helper
function rciColor(code) {
  if (code === "R/A") return { fill: "12564A", text: "FFFFFF" };
  if (code === "A")   return { fill: "1A1A1A", text: "FFFFFF" };
  if (code === "R")   return { fill: "FEE2E2", text: "12564A" };
  if (code === "C")   return { fill: "FEF3C7", text: "78350F" };
  if (code === "I")   return { fill: "F2F4F3", text: "8A8D90" };
  return { fill: "FFFFFF", text: "DADEDC" };   // "—" empty cell
}
// Risk severity scorer
function sev(likelihood, impact) {
  const L = likelihood === "High" ? 3 : likelihood === "Med" ? 2 : 1;
  const I = impact    === "High" ? 3 : impact    === "Med" ? 2 : 1;
  const score = L * I;
  if (score >= 6) return "B23A2E";   // red
  if (score >= 3) return "B07D2B";   // amber
  return "2F7A55";                   // green
}
// Callout box (click-to-reveal pattern) — v5: no one-side accent bar; the numbered pine badge carries the accent
function addCallout(s, x, y, num, title, body) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 3.867, h: 1.04, fill: { color: "FFFFFF" }, line: { color: "DADEDC", pt: 0.5 }
  });
  s.addShape(pres.shapes.OVAL, {
    x: x+0.24, y: y+0.093, w: 0.373, h: 0.373, fill: { color: "12564A" }, line: { color: "12564A" }
  });
  s.addText(`${num}`, {
    x: x+0.24, y: y+0.093, w: 0.373, h: 0.373, fontSize: 14.7, bold: true, color: "FFFFFF",
    fontFace: "Manrope", align: "center", valign: "middle", margin: 0
  });
  s.addText(title, { x: x+0.733, y: y+0.053, w: 3.067, h: 0.333, fontSize: 13.3, bold: true, color: "1A1A1A", fontFace: "Manrope" });
  s.addText(body,  { x: x+0.24, y: y+0.427, w: 3.533, h: 0.573, fontSize: 10.7, color: "45474A", fontFace: "Manrope" });
}
```

---

## 4. pptxgenjs Gotchas (do not re-discover)

**Canvas / layout (most important — discovered May 2026 the hard way):**

The pptxgenjs default canvas is **13.33" × 7.5"** (PowerPoint native widescreen, 16:9). Custom layouts via `pres.defineLayout()` are supported, but you MUST use a unique layout name. **`LAYOUT_WIDE` is a built-in reserved name** — passing it to `defineLayout()` silently fails: pptxgenjs ignores the override and keeps the default 13.33 × 7.5. Your content positioned for, say, 10 × 5.625 will render into a 13.33 × 7.5 canvas, leaving ~26% of the slide as dead space below. Symptom: every slide looks "too small" inside the PowerPoint window with empty bottom margins.

Fix: use a unique layout name. Either keep PowerPoint default (recommended — easiest cross-application rendering):
```js
// Don't redefine, just use defaults — canvas is 13.33 x 7.5
const pres = new pptxgen();
```
Or define explicitly with a unique name:
```js
pres.defineLayout({ name: "MY_DECK_16x9", width: 13.333, height: 7.5 });
pres.layout = "MY_DECK_16x9";
```

Reserved names to AVOID for the `name` parameter: `LAYOUT_WIDE`, `LAYOUT_16x9`, `LAYOUT_16x10`, `LAYOUT_4x3`, `LAYOUT_WIDESCREEN`. Use anything else.

Verification: after build, run `unzip -p file.pptx ppt/presentation.xml | grep sldSz` and confirm `cx="12192000" cy="6858000"` (those EMU units = 13.33 × 7.5 inches). A different `cy` means the layout override silently failed.

**Other gotchas:**

| Gotcha | Fix |
| :---- | :---- |
| `pres.shapes.TRIANGLE` doesn't exist | Use `RIGHT_TRIANGLE` with `rotate: 0/90/180/270` |
| Table `h` parameter is ignored | Tables auto-expand. Leave 0.667"+ buffer below every table |
| Scatter plot needs 2 series | Series 1 = X values (`name: "X-Values"`), Series 2 = Y values |
| Data labels break at sub-1 decimal values | Use `dataLabelFormatCode: "0.0\"%\""` or render custom bars |
| Charts don't survive PPTX → Google Slides | Export as PNG (300 DPI), paste as image |
| `s.hidden = true` | Hides from PDF (LibreOffice skips). Visible in PowerPoint editor (slide 7 shows as greyed) |
| Emoji render B&W | ⚙️ renders monochrome on some systems. Use text alternatives for mission-critical icons |
| Animations impossible | `p:timing` XML not exposed by pptxgenjs. Always disclose upfront. Manual PowerPoint setup only |
| Dark panel + small text = faded in LibreOffice | Bump font to 14.7pt minimum on dark fills, or lighten fill |
| `rectRadius` works for rounded pills | `pres.shapes.RECTANGLE` + `rectRadius: 0.08` |
| Cross-deck slide copy (python-pptx 1.0.x) | Use `src_part._element` not `src_part.element` (breaking change) |
| Slide reorder | Manipulate `prs.slides._sldIdLst` XML; collect list, clear, re-append in new order |
| Chart `chartColors` per-bar | Only works in single-series BAR charts. Multi-series: one color per series |

---

## 5. Chart Export Workflow (for Google Slides)

Charts that do NOT survive PPTX → Google Slides import:

- Scatter plots (always fails)  
- Bar charts with per-bar coloring (sometimes fails)  
- LINE charts with custom markers (sometimes fails)

**PNG export workflow:**

```bash
# 1. Build standalone single-slide pptx with just the chart
node build-chart-only.js  # outputs /tmp/chart.pptx
# 2. Convert to PDF
python soffice.py --headless --convert-to pdf /tmp/chart.pptx
# 3. Render to PNG at 300 DPI
pdftoppm -png -r 300 /tmp/chart.pdf /tmp/chart
# 4. Crop to chart area only (Python)
python3 -c "
from PIL import Image
img = Image.open('/tmp/chart-1.png')
# Chart position: x=0.4, y=0.4, w=12.533, h=6.667 on 13.333 × 7.5 slide
left   = int(0.4/13.333 * img.width)
top    = int(0.4/7.5 * img.height)
right  = int((0.4+12.533)/13.333 * img.width)
bottom = int((0.4+6.667)/7.5 * img.height)
img.crop((left, top, right, bottom)).save('/mnt/user-data/outputs/chart-name.png', 'PNG')
"
```

**Charts produced as standalone PNGs this session:**

- `scatter-frequency.png` — sessions per user vs pay rate (slide 16)  
- `bar-depth.png` — pay rate by deepest action (slide 17)  
- `slide2-trajectory.png` — active account trajectory (slide 2)  
- `slide-16-frequency.png` — full slide 16  
- `slide-17-depth.png` — full slide 17  
- `slide-18-commitment.png` — full slide 18 (commitment cascade)

### 5.1 Deck delivery format (updated May 2026)

**Decks ship as `.pptx` only.** No PDF companion in the outputs folder. Google Slides / Drive renders Manrope and the v4 design system better than a LibreOffice-converted PDF can. Crimson saturation, font weights, and pixel-level kerning all degrade in the PDF intermediate step.

**PDF generation is for internal visual QA only.** Render PDFs in the working directory (`/home/claude/deck-build/` or equivalent) during the build to check rendering, but do not copy them to `/mnt/user-data/outputs/` and do not include them in `present_files`. Ship only the `.pptx`.

**Documents (briefs, rubrics, written deliverables) are an exception.** They can stay as PDFs because they are for distribution (email attachments, written communication) and have no Google Slides equivalent. The rule applies specifically to presentation decks.

---

## 6. Slide Numbering and Structure

### Deck: canonical v2 reference deck (24 slides + 1 hidden)

| # | Breadcrumb | Pattern | Act |
| :---- | :---- | :---- | :---- |
| 1 | — | Title (SURFACE bookend) | — |
| 2 | ACT 1: The Commitment | Section divider | — |
| 3 | THE MATH | Stat row + bar chart | 1 |
| 4 | TARGET LADDER | Dual-line chart + phase panel | 1 |
| 5 | ACT 2: The Diagnosis | Section divider | — |
| 6 | PROVEN ENGINE | Bar chart + narrative panels | 2 |
| 7 | THE CONSTRAINT | Hex-card funnel + definition panel | 2 |
| 8 | CORRELATION | Lift table + 3 click-to-reveal callouts | 2 |
| 9 | CORRELATION V2.0 | Hidden technical appendix | 2 |
| 10 | USAGE 1: FREQUENCY | Scatter plot + event table | 2 |
| 11 | USAGE 2: DEPTH | Bar chart + depth event table | 2 |
| 12 | USAGE 3: COMMITMENT | Commitment cascade (horizontal funnel) | 2 |
| 13 | ACT 3: The Plan | Section divider | — |
| 14 | PRICING MODEL | 3-tier option card (chosen highlighted) | 3 |
| 15 | SF 1: TRAINING | Course cohort table | 3 |
| 16 | SF 2: ACTIVATION | Current/target/lever/source metric table | 3 |
| 17 | SF 3: ACQUISITION | Behaviour comparison table + 3 action cards | 3 |
| 18 | SF 4: FOUNDATION | Prerequisite table with day deadlines | 3 |
| 19 | OPERATING FLOW | 5-stage card sequence | 3 |
| 20 | LIFECYCLE | 4-role swimlane timeline | 3 |
| 21 | ACCOUNTABILITY | RACI matrix with role icons + comp note | 3 |
| 22 | ACT 4: The Asks | Section divider | — |
| 23 | RISKS | Severity-scored risk register | 4 |
| 24 | CONCLUSIONS | Numbered points with icons (SURFACE bookend) | 4 |

### Supplementary standalone slides (not in master deck)

These supplementary slides were built separately for JD-pair conversations, behavior-revenue framing, and data foundation reporting. They share the same design system but are delivered in a single combined file (`slides-25-26-27-28.pptx`) for merge into the master deck.

| # | Breadcrumb | Pattern |
| :---- | :---- | :---- |
| 25 | MONTHLY TARGETS | Side-by-side role targets with CTO support band (Pattern 2.17) |
| 26 | BEHAVIORS | Three-tier behavior cascade with mechanisms (Pattern 2.18) |
| 27 | TARGETS × BEHAVIORS | Combined targets × behaviors matrix (Pattern 2.19, tier/role decoupled) |
| 28 | DATA FOUNDATION | Source-to-destination diagram, three siloed sources → GA4 (Pattern 2.20) |

After merge, master deck reaches 28 visible slides + 1 hidden appendix. All footers auto-update via `TOTAL_SLIDES` constant.

---

## 7. Key Design Decisions (reasoning preserved)

**Why Manrope over Outfit (body sans):** Outfit was the original default font. Manrope has a cleaner geometric structure that renders better at 10–12pt on PANEL backgrounds and has distinct letterforms at small tracked-caps sizes (the plain breadcrumb). (v5: Manrope is now the body sans only, paired with a configurable display font (default Charter; set per Step 1 brief) for display — see §1.2.)

**Why surface bookends:** Title and closing slide share the SURFACE background. Visual symmetry tells the reader the deck is a complete artifact. (v5: SURFACE is now the bright near-white ground, not cream. The closing slide may instead take the one full-bleed ACCENT fill the system allows — see §1.3, principle 9.)

**Why no red border on comment panels:** Bottom "so what" panels initially used ACCENT pt:1 borders. User flagged they dominated the slide — every panel became an emergency. Switched to LINE pt:0.5 (light grey). (v5 reversal: the 0.107" left-bar accent this note once endorsed is now banned as the side-tab tell. Emphasis is carried by type weight, a full-width hairline, a full fill, or whitespace — see §1.3 and anti-slop.md.)

**Why commitment cascade instead of 2D quadrant:** The quadrant had "events per user" on the X-axis. portfolio_created (the highest-converting event) fires 1.4 times per user — which plotted it near the origin (bottom-left = low frequency). This contradicted the story. The cascade makes the hierarchy explicit: each step is a strict subset of the previous one. No X-axis confusion. Pay rate visible at each step.

**Why 4 swimlane rows on slide 20:** Head Trainer and Training Mentors were originally merged. Splitting them makes the role distinction visible: Head Trainer = cohort strategy and delivery (institutional); Training Mentors = 1:1 activation per student (relational). The PKR compensation structure (PKR 5K per portfolio_created, PKR 15K per conversion) only makes sense if Mentors have their own accountability row.

**Why teal for the training graduate path:** Teal (#0E7490) is the only colour not used for any other role. Growth = amber, PM = crimson, Head Trainer = navy, Training Mentors = teal. The training graduate path line must be visually distinct from the Training Mentors row — it enters the PM row, not the Trainer row. Using a fifth distinct colour prevents misreading.

**Why the "Direct channel" finding was NOT made a headline slide:** Firebase "Direct" = absence of attribution, not an acquisition channel. 95% of active accounts were classified Direct, but this is downstream of training, referrals, and brand — not a lever the Growth person can pull directly. Making it a headline slide would have set the wrong strategic direction. Decision: captured in design-decisions.md and spreadsheet as a caveat, not promoted to the deck.

**Why the CTO band uses NAVY not ACCENT (slide 25):** ACCENT is reserved for the primary accent role per the scalpel rule. Two role blocks (PM, GM) already use high-saturation colours. NAVY for the support band reads as "infrastructure underneath" without visually competing with the primary roles. (v5 reversal: the 0.107" ACCENT left bar this note once put on the NAVY band is dropped — the full NAVY fill anchors the band on its own; one-side accent bars are banned. See §1.3.)

**Why bidirectional dashed arrows from CTO to PM/GM (slide 25):** Single-direction arrows (CTO → PM and CTO → GM) suggested one-way enablement. The reality is two-way: CTO foundation enables both roles, and both roles' data needs drive what CTO must build. Bidirectional dashed arrows (beginArrowType + endArrowType: triangle) capture this dependency without making it look like a process flow.

**Why single-word tier titles on behavior cascade (slide 26):** First version used "Conversion intent" as the Tier 3 title. The two-word title wrapped inside the left coloured panel and collided with the window range and sub-line. Forced single-word ("Intent") to keep the 4-line stack inside the panel readable.

**Why the bottom-half is a 6-cell grid not a stacked list (slide 27):** A vertical stack of 6 behaviors (one per row) would have lost the role × tier relationship — the reader couldn't see "what does PM do in Tier 1 vs GM does in Tier 1" at a glance. The 2 × 3 grid forces the comparison: every column is a tier, every row is a role, every cell is a behavior + mechanism. Visual symmetry with the top half (also 2 × 3) reinforces the structural pattern.

**Why the combined slide uses phases not months (slide 27):** Slide 25 already shows month-by-month detail. Slide 27 is a synthesis — its job is to compress the time axis into 3 phases that map to the deck's existing narrative (Instrument / Scale / Harvest from slide 4 Target Ladder). Showing all 11 months would dilute the pattern recognition.  

**Why slide 27 tier headers became INK not tier colours (decoupling decision, May 2026):** First version used ACCENT / AMBER / NAVY tier headers AND ACCENT-coloured PM cells / AMBER-coloured GM cells. Because AMBER appeared as both a tier colour (Tier 2 impact) AND a role colour (GM lane), readers inferred "GM owns Tier 2 entirely." False. The fix: tier headers became neutral INK fill; cell accents bind to ROLE (ACCENT for PM row, AMBER for GM row). The grid reads row-first — PM row all pine-accented, GM row all amber-accented. Tier priority is encoded by column position and the "TIER N" numbering. This decision generalised into Section 1.5's two-axis grid rule. (v5 update: the role accent is now a full faint cell fill, not a one-side left bar — one-side accent bars are banned. See §1.3 and the table colour rule in design_system.md.)

**Why the GA4 destination panel on slide 28 became TINT not NAVY (May 2026):** Two earlier iterations: first INK fill (read as a heavy black bar dominating a mostly-light slide), then NAVY (softer but still contrasting against the source cards above). User flagged both as too contrasting. Switched to the TINT strip. The destination now reads as a soft distinct surface, not a dark slab. Capability tags inside became WH fill with LINE border to read as nested cards. This decision generalised into Section 1.5's destination panel rule. (v5 update: TINT is now a cool pine wash, `#E6EFEA`, with a full `TINT_BORDER` hairline — and no ACCENT left accent bar, which the v4 version of this note added; one-side accent bars are banned. See §1.5.)

**Why decks ship as .pptx only, no PDF (May 2026):** Originally produced both `.pptx` and `.pdf` for every deck delivery. User feedback: Google Slides / Drive renders the `.pptx` directly with better font rendering (Manrope), better colour saturation, and no kerning artifacts than the LibreOffice-converted PDF. The PDF was actually a worse viewing experience. Decision: ship `.pptx` only, keep PDF rendering as an internal QA step in working directory. Documents (briefs, rubrics) are unaffected — they remain PDF for distribution. See Section 5.1.

**Why we no longer redefine `LAYOUT_WIDE` (May 2026 — canvas defect):** Pptxgenjs treats `LAYOUT_WIDE` as a reserved built-in name. Passing it to `pres.defineLayout({name: "LAYOUT_WIDE", width: 10, height: 5.625})` silently does nothing; the canvas stays at default 13.33 × 7.5. Every slide we built positioning content for a 5.625" canvas rendered into a 7.5" canvas, leaving ~26% of every slide as empty white space at the bottom. The defect persisted across multiple decks (Monday Read, prior supplementaries) before being root-caused. New rule: never use `LAYOUT_WIDE`, `LAYOUT_16x9`, `LAYOUT_4x3`, `LAYOUT_WIDESCREEN`, or `LAYOUT_16x10` as `defineLayout` names. Either accept the default 13.33 × 7.5 or use a unique name like `MY_DECK_16x9`. Verify the canvas is what you expect by inspecting the pptx XML (`unzip -p file.pptx ppt/presentation.xml | grep sldSz` — `cx="12192000" cy="6858000"` = 13.33 × 7.5). See Section 4. This is why the stress-test-10 deck and all decks built afterward use `STRESS_16x9` / `MASTER_16x9` / similar unique names.

**Why the pattern library is now floor not ceiling (May 2026 — variety stress test):** The v2 library catalogued 20 named patterns. When used as a fixed vocabulary, Claude defaulted to the closest documented pattern even when the slide content called for something different — most visibly the stat-row pattern (2.3) being selected as a slide-1 workhorse, where it produced ~50% canvas coverage. The stress-test-10 deck deliberately invented six new patterns (2.21–2.30, including dual-axis chart, unit-economics waterfall, 2D heatmap, decision tree, dashboard mockup, building-block cascade) for content that didn't fit existing entries. All six filled 98-100% of the canvas. New rule (Section 1.6): when content is quantitative, default to chart-driven layouts; when the closest documented pattern produces sparse output, invent. The library encodes safety for repeated patterns; it does not enumerate the full vocabulary.

**Why slide 1 has the highest density bar of any slide in any deck (May 2026):** Slide 1 trains the reader's density expectation for the entire deck. A sparse opening slide (stat-row, big-numeral findings, generic title card) cues the reader to skim. A dense opening slide (chart-driven workhorse, small-multiples trajectory, executive-summary three-column) cues the reader to look closely. The decision: slide 1 of every deck must use a workhorse pattern (2.3 stat-row explicitly forbidden as slide 1). Sparse patterns are condiments, used at most as section bridges or transitions, never as openings or main-course content slides.

---

## 8. Build Process Checklist

Every deck — small or large, exploratory or production — should be built in this order. Most quality misses in this library came from skipping a step, not from making creative mistakes. The discipline is cheap; the rework from skipping is expensive.

### Step 1 — Ghost deck before code

Before writing any pptxgenjs, write a ghost-deck table with one row per slide, columns: `# | breadcrumb | action title | layout pattern | why this one`. The "why this one" column forces a justification per slide. If you can't justify the layout choice in one sentence, the slide isn't ready to build.

**Hard rule:** no slide gets a `stat-hero`, `big-numeral-findings`, or other sparse-condiment pattern as slide 1. Pre-flight the ghost deck against Section 1.6 (floor-not-ceiling) and reject slide 1 candidates that don't fill the canvas.

**Soft rule:** vary patterns across the deck. If two consecutive slides use the same documented pattern, ask whether one of them should be a chart instead. Visual rhythm matters in a 10+ slide deck.

### Step 2 — Canvas verification before content

Define the layout with a unique name (Section 4 — never `LAYOUT_WIDE` or other reserved names). Default to PowerPoint native 13.33 × 7.5 unless there's a specific reason to use letterbox aspects. Build a one-slide test deck, render to PDF, inspect the XML:

```bash
unzip -p deck.pptx ppt/presentation.xml | grep sldSz
```

Confirm `cx="12192000" cy="6858000"` (or whatever your custom dimensions are in EMU — 1 inch = 914400 EMU). Any silent fallback to default 13.33 × 7.5 when you wanted something else is a canvas defect that will affect every slide. Fix before building further.

### Step 3 — Build with measurable density targets

Position content with the assumption that every slide should hit **95% vertical fill or higher**. The footer band sits at y=7.10 on a 7.5" canvas — content should reach y≈7.05 with a small breathing gap, not stop at y=5.0 and leave 2.5" of dead space.

For each slide, after building:
- Render to PDF
- Convert to image (pdftoppm at 110-150 DPI)
- Run vertical-fill measurement (scan for non-white pixels, find bottom-most content row)
- If < 90% vertical fill, the layout is wrong. Either invent a denser pattern or move to a different layout choice.

### Step 4 — Iterate against defect priority

After first build, audit per slide:
- **Critical defects** (logic errors, wrong math, misplaced annotations) — fix first, in this order: math errors, color collisions, label-on-data overlaps
- **High defects** (readability issues, text wrap, label clipping) — fix next
- **Medium defects** (typography polish, rotation artifacts, sparkline sizing) — fix if time permits

The iteration is not "make it pretty." It's "remove every visual lie." A slide where the target outline is on the wrong cell, or the value label says "+1100" instead of "+1,100", or the bars don't visually chain — those are visual lies. They erode reader trust. Fix them.

### Step 5 — Voice check before ship

Before final ship, scan slide copy for:
- Banned vocabulary (leverage, robust, seamless, unlock, etc — Section TBD or external voice-check skill)
- Em-dash count (target: zero in user-facing copy, replace with colons, periods, semicolons)
- Negative parallelisms ("not X, but Y" constructions)
- Closing summary tells ("In conclusion", "To wrap up")

This is a 30-second grep, not a re-read. Voice check is a gate, not a discussion.

### Step 6 — Ship pptx only

Per Section 5.1, ship `.pptx` only, no PDF companion. Keep PDF rendering as an internal QA step in your working directory. The pptx renders better in Google Slides (Manrope, color saturation, kerning) than the LibreOffice-converted PDF.

---

## 9. Pattern Capture Protocol (when a deck invents something new)

This library grows when decks invent patterns the library doesn't already document. The capture protocol exists so growth is deliberate, not accidental.

### When to add a new pattern entry

Trigger: a deck contains a layout that fills 90%+ canvas, communicates effectively, and isn't a near-duplicate of an existing pattern. Even if it's used only once, document it — the next session will benefit.

NOT triggers:
- One-off variants of existing patterns (e.g., slide 27 changed the colour assignment of pattern 2.18 — that became a *modification note* on 2.18, not a new entry)
- Patterns that didn't work (file as a "rejected approach" in Section 7 with reasoning)
- Patterns from external references that haven't been adapted to this design system

### What to record per pattern entry

Use the structure established in Patterns 2.21–2.30:

```
### 2.N Pattern name

**Source:** which deck, which slide(s).

**When to use:** one-paragraph description of the content shape that calls for this pattern.

**Anatomy:**
- Geometry (dimensions, gutters, gaps)
- Layout structure (rows, columns, anchor positions)
- Typography choices specific to this pattern
- Color encoding (which axis, which gradient)
- Reader-band / annotation conventions

**Common defects to avoid:**
- 2-4 things that broke during first build and got fixed

**Variants:**
- Adjacent patterns or substitutions for different content shapes
- Generalisation: what other "X" stories this pattern works for
```

The "Common defects" section is the most valuable part of an entry. It captures what the build process actually learned: what works and what breaks.

### Where new patterns live

The canonical home is THIS file (`references/build-helpers.md`). Make edits here. A capture session is best run in an environment with filesystem write access and git versioning, so a new pattern can be committed alongside the deck that produced it.

### Versioning

- Patch updates (typo fixes, minor clarifications): same version, edit in place
- Minor updates (new pattern entries, new gotchas): bump v3.0 → v3.1
- Major updates (structural reorganisation, removed sections): bump v3 → v4

Always update the front-matter changelog when bumping. Always commit before bumping so the previous version is recoverable.

### When NOT to bother

If a session produces a pattern you're not sure will ever be reused, don't document it yet. Document on the second use. Single-use patterns clutter the library more than they help.

