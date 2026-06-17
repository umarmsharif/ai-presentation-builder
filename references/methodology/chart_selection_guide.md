# Chart selection guide (Analyst Academy)

Source: Analyst Academy "Choosing the Right Chart" cheat sheet (v4, May 2023). Use as the canonical guide for picking the right chart pattern.

## The 5 chart types

### 1. Bar chart (horizontal)
- **Purpose:** Compare categories against each other.
- **Benefit:** Easy to read, accurate, reliable.
- **Variations:** Clustered, stacked, 100% stacked.
- **Use when:** "Region A had highest sales" / "Many companies have $1B cash" / ranking categories.
- **Tips:** Order biggest to smallest. X-axis at 0. No 3D, no borders. Simple colours.
- **Our pattern:** Not yet implemented as a true horizontal bar — `waterfall-build-up` is the closest (horizontal bars row-aligned with a table).

### 2. Column chart (vertical)
- **Purpose:** Compare categories with natural order (esp. time).
- **Benefit:** Reads left-to-right, good for time comparisons.
- **Variations:** Stacked, waterfall, mekko.
- **Use when:** "Sales peaked in 2022" / "Operating costs reached new highs in June".
- **Tips:** Distinguish historical vs projected. Call out important periods. Y-axis at 0. Avoid long category labels (use bar chart instead).
- **Our pattern:** `bar-chart` (rendered vertical despite the name) — covers the standard column-chart case. `waterfall-build-up` is the column-waterfall variation.

### 3. Pie chart
- **Purpose:** Compare one or multiple categories to total.
- **Benefit:** Easy to gauge portion of total.
- **Variations:** Donut, sunburst, treemap.
- **Use when:** "20% of autos are trucks" / "materials are majority of costs".
- **Tips:** Limit categories (≤6). Colour the slice you want to highlight. Start at 12 o'clock. Avoid 3D, side-by-side pies.
- **Our pattern:** Not yet implemented. Low priority — pies are out of fashion in consulting.

### 4. Line chart
- **Purpose:** Show change in data over time.
- **Benefit:** Highlights trends, patterns, exceptions.
- **Variations:** Multiple line, area, stacked area.
- **Use when:** "Apple stock has risen for 10 years" / "industry declines, our revenue rises".
- **Tips:** Label lines directly (not via legend). Contrasting colours. Avoid too many lines (≤5). Gridlines for slope emphasis.
- **Our pattern:** Not yet implemented. **Real gap** — McKinsey's gas outlook used 3 stacked-area variations across 8 pages, this is a workhorse pattern.

### 5. Scatter plot
- **Purpose:** Show relationship between two variables.
- **Benefit:** Reveals correlation, patterns, outliers.
- **Variations:** Bubble, heatmap, paired bar.
- **Use when:** "Taller people weigh more" / outlier identification.
- **Tips:** Avoid overcrowding. Don't suggest causation. Label important points. Scale bubbles by area, not diameter.
- **Our pattern:** `prioritisation-matrix` is a constrained scatter (4-quadrant + named dots). General scatter not implemented.

## How to choose

| Question being answered | Chart |
|---|---|
| "Which is biggest?" | Bar (horizontal, sorted) |
| "How did this change over time?" | Line / column |
| "What's the breakdown of a total?" | Stacked bar / pie / mekko |
| "How do these two variables relate?" | Scatter / bubble |
| "Where did the value go from start to end?" | Waterfall |
| "Which two scenarios diverge?" | Multiple line |
| "Where do these items sit on two axes?" | Scatter / 2x2 matrix |

## Tip rules to encode in deck_qa.js

- Y-axis must start at 0 (manually verifiable for now)
- Avoid more than 5 categories on a line chart
- Avoid 3D
- Avoid side-by-side pies
- For column charts comparing time, distinguish historical (solid) from projected (dashed/lighter)

## Gap priorities

1. **Line chart** — highest priority. Used in nearly every market-sizing or trend deck.
2. **Stacked column / mekko** — useful for breakdowns over time.
3. **Pie / donut** — low priority for this skill (consulting moved on).
4. **Scatter (general)** — medium priority; for now, route to `prioritisation-matrix`.
