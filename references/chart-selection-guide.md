# Chart Selection Guide

Reference for picking the right chart type when building a slide. Adapted from Analyst Academy's "Choosing the Right Chart" cheat sheet (May 2023). The principle holds across every chart entry below: **the chart type fits the message, not the data shape.** Pick the chart that shows the dimension you actually want the reader to see.

## Quick-pick decision

| Message Claude wants the reader to take away | Chart |
|---|---|
| Compare unordered categories against each other | **Bar** |
| Compare categories with natural order (esp. time periods) | **Column** |
| Compare one or more categories to a total share | **Pie** (rare — see warnings) |
| Show change in a single measure over time | **Line** |
| Show relationship between two continuous variables | **Scatter** |
| Show how a starting value becomes an ending value through additions/subtractions | **Waterfall** |
| Show share-within-category AND share-of-total simultaneously | **Mekko** |

If two charts could fit, pick the one with the lower cognitive cost for the reader. The job is communication, not data inventory.

---

## Bar chart

**Purpose:** Compare categories against each other (when category order is not natural — when there's no time, no sequence).

**Variations:**
- **Clustered bar** — compare sub-categories within each category against each other. Good for 2-3 sub-categories per parent; falls apart at 5+.
- **Stacked bar** — compare totals while still showing the sub-category breakdown.
- **100% stacked bar** — emphasize how the proportion of sub-categories shifts across parent categories. Total is normalized; absolute values are lost.

**Tips:**
- Sort bars in logical order, usually biggest to smallest. Alphabetical order is almost always wrong.
- Minimal spacing between bars.
- X-axis at 0. No truncation.
- No gridlines or chart-junk distractions.
- No 3D, no borders. Simple colors.

## Column chart

**Purpose:** Compare categories with natural order — almost always time periods (Q1, Q2, Q3...) or sequences. Reads left-to-right.

**Variations:**
- **Stacked column** — compare total values across time while still showing the sub-component breakdown.
- **Waterfall** — see Waterfall section below; columns showing how a starting value becomes an ending value through additive/subtractive steps.
- **Mekko (Marimekko)** — see Mekko section below; columns where width encodes total size and height encodes share within.

**Tips:** Same as bar chart — logical order (chronological, not alphabetical), minimal spacing, Y-axis at 0, no 3D, no borders, simple colors.

## Pie chart

**Purpose:** Compare one or more slices to the total. Most useful when there is exactly one slice you want to highlight ("20% of autos are trucks").

**Variations:**
- **Donut** — pie with extra data in the center (often the total).
- **Sunburst** — multi-level pie showing nested breakdown of categories.
- **Treemap** — rectangles where area encodes value. Better than pie for many small slices; loses circular metaphor.

**Tips:**
- **Don't use pie charts to compare slices against each other.** Use a bar chart. Reading angle is harder than reading length.
- Limit the number of slices (≤5 is a soft ceiling; beyond that, use bar or treemap).
- Use color to highlight only the slice your message is about. Other slices stay grey.
- Slices should sum to 100%.
- List slices in logical order starting from the 12 o'clock position, clockwise.
- No 3D pie charts. Ever.
- Don't compare two pie charts side by side — readers can't easily compare slice sizes across charts. Use a 100% stacked bar instead.

## Line chart

**Purpose:** Show change in data over time. Highlights trends, patterns, and exceptions in the time series.

**Variations:**
- **Multiple line** — show pattern across several categories sharing one time axis.
- **Area** — emphasize the magnitude of change in a single category (filled below the line).
- **Stacked area** — emphasize the total change in quantity across multiple categories, while showing each category's contribution.

**Tips:**
- **Label categories directly next to the lines themselves**, not in a legend. Legends force the eye to ping-pong.
- Choose measurement intervals deliberately (daily, monthly, quarterly). Wrong interval hides the pattern.
- Call out important periods of the chart inline (annotations, callouts).
- Use contrasting colors when multiple lines are on the same chart.
- Avoid too many lines (>5) on one chart — separate into small multiples.
- Use gridlines only when emphasizing line slope.

## Scatter plot

**Purpose:** Show the relationship between two variables. Easily surfaces correlation, patterns, or outliers.

**Variations:**
- **Bubble chart** — adds a third variable encoded as the size of each point. CRITICAL: **scale bubbles by area, not diameter or radius.** A "2× bigger" bubble has 2× the area, not 2× the diameter.
- **Heatmap** — grid where color intensity encodes value. Works for large datasets where individual points would overlap.
- **Paired bar** — alternative to scatter for small datasets (≤20 points) where you want to show two paired values per category.

**Tips:**
- Don't overcrowd the chart with too many variables.
- Don't overplot with too many points — sample, jitter, or move to heatmap.
- Don't suggest causation where it might not exist. Correlation is not cause.
- Label data points when it's possible and useful — at least the outliers.
- Be careful using different shapes for different categories — color is usually clearer.
- For bubbles: numbers labeled directly on each bubble so the reader doesn't have to estimate.

---

## Waterfall (cross-reference)

See `references/build-helpers.md` (`waterfall-baseline-to-target`) for the full anatomy + rendered seed.

Use waterfall when the question is **"how do we get from A to B?"** through a series of additive/subtractive steps. Conventions to honour:
- Cumulative cascade — each bar starts at the previous running total (NOT a zero-line).
- All bars share one Y-axis scale.
- Math must reconcile — verify summation before render; state the equation in the footer.
- Labels OUTSIDE bars (values above, categories below x-axis, captions further below).
- Axis break only on large anchors (≥1.0" visible height), positioned at the bar's visual midpoint.

## Mekko (cross-reference)

A Mekko (marimekko) is a width-encoded stacked column. No catalogued pptxgenjs recipe yet — build it from rects (column width = total/segment size, segment height = within-column share); treat as `needs-rendering` until a seed passes the render loop.

Use Mekko when **both share-within-category AND share-of-total matter**. Column width encodes the total opportunity / segment size; column height encodes the within-column breakdown. Choose Mekko over bar when you'd lose the total-size dimension; choose Mekko over pie when you need cross-column comparison.

---

## When NOT to use a chart

A chart is overhead. Numbers, names, and short statements can land better as bold text on a clean layout than as a chart. Don't visualize when:

- The data is 2-3 numbers that can be stated directly ("142 customers, $4.8M ARR, 118% NRR").
- The chart would only have 2-3 data points (just say them).
- The relationship is one number (use the number, large, with context underneath).

The reader's question is what determines the visualization, not how much data exists.

---

## Source

Analyst Academy, "Choosing the Right Chart" cheat sheet (May 2023). https://theanalystacademy.com — full courses on Data Visualization, Presentation Storytelling, Advanced PowerPoint.
