# Pattern 01 — Horizontal bar chart (with optional delta column)

## When to use

- Ranking categorical items by a single metric (sectors, regions, segments, deal types, etc.)
- The story is about *order* — who's biggest, who's smallest, who moved up or down.
- Use this when the categories have meaningful labels (not abstract bins). 5–12 bars typically.

## Catalog examples

- "Better than business as usual" (2025-11-04) — horizontal dot variant, business processes ranked by likelihood multiplier
- "FDI fuels chip shift" (2025-11-13) — bar pair showing flow direction
- Most "ranked categorical" charts in the catalog use this pattern

## Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ Better than business as usual                            │  ← headline 36pt
│ The processes most worth changing                        │  ← optional subhead 20pt italic
│                                                          │
│   Executive briefings         ████████████████  72%      │  ← data label inline
│   Performance reviews         ████████████   58%         │
│   Business objectives         ████████████   58%         │
│   Performance dialogues       ██████████   51%           │
│   Annual planning             █████████   48%            │
│   ─── 5 more rows ───                                    │
│                                                          │
│   Source: McKinsey Global Survey, 2024                   │  ← 9pt gray italic
└──────────────────────────────────────────────────────────┘
```

## Variants

1. **Single bar**: just the bar with a data label. Simplest case.
2. **With delta column** (very McKinsey): a second numeric column to the right of the bar showing change-from-baseline. e.g. "+1.5x" or "+12pp YoY".
3. **Dot variant**: replace bars with a single dot, useful when the visual weight of long bars feels heavy and the number is small.
4. **Comparison pair** (two adjacent bars per category, different colors) — see pattern 02 if comparison dominates.

## Sort order

- Almost always **sorted descending by the metric**, top = largest.
- Exception: time-based or natural-order categories (months, age brackets) keep their natural order.

## Color rule

- Single color across all bars (the McKinsey deep blue, or your brand primary).
- If one bar is the punchline, render *that* bar in the accent color. All others stay primary. Never use rainbow per bar.

## python-pptx recipe

```python
from pptx.util import Inches, Pt
from pptx.chart.data import CategoryChartData
from pptx.enum.chart import XL_CHART_TYPE, XL_LABEL_POSITION
from pptx.dml.color import RGBColor

# Data
chart_data = CategoryChartData()
chart_data.categories = [
    'Executive briefings', 'Performance reviews', 'Business objectives',
    'Performance dialogues', 'Annual planning',
]
chart_data.add_series('Likelihood multiplier', (2.0, 1.6, 1.5, 1.5, 1.4))

# Insert as horizontal bar chart
chart = slide.shapes.add_chart(
    XL_CHART_TYPE.BAR_CLUSTERED,
    Inches(1.0), Inches(1.6), Inches(11.0), Inches(5.0),
    chart_data,
).chart

# Style
chart.has_title = False              # we render headline as a separate textbox
chart.has_legend = False             # single series — no legend needed

plot = chart.plots[0]
plot.has_data_labels = True
plot.data_labels.position = XL_LABEL_POSITION.OUTSIDE_END
plot.data_labels.font.size = Pt(11)
plot.data_labels.font.bold = True
plot.data_labels.number_format = '0.0"x"'  # for multipliers; '0%' for percentages

# Bar fill — single color
fill = plot.series[0].format.fill
fill.solid()
fill.fore_color.rgb = RGBColor(0x05, 0x1C, 0x2C)  # deep blue

# Hide chart title and value axis (we want labels on bars instead)
chart.value_axis.visible = False
chart.category_axis.format.line.fill.background()  # remove axis line
chart.category_axis.tick_labels.font.size = Pt(11)

# (The headline, subhead, and source are added separately as textboxes
#  for type control — don't use chart.has_title.)
```

## Headline templates

Pick the verb-led pattern, not the noun-led one.
- "What [thing] tells us about [implication]"
- "Where [trend] is heading"
- "How [intervention] changes [outcome]"

Don't write: "Top 10 business processes" (label, not insight).

## Source line example

`Source: McKinsey Global Survey on Transformations, January 2024 (n=1,232 respondents).`

## When NOT to use this pattern

- If the data is a time series → use line chart (pattern 04).
- If you have two metrics per category → use pattern 02 (dual-panel).
- If you have a part-of-whole story → use pattern 03 (stacked bar).
