# Pattern 05 — Combined bar and line chart (two metrics, two scales)

## When to use

- Two related metrics on different scales: a *count* (bar) and a *rate* (line). Or a *volume* and a *share*.
- Story is the relationship between them — the line tells you what's happening to the rate even as the bar volume grows or shrinks.

## Catalog examples

- "Decoding deal delays" (2025-12-03) — bar of deal counts + line of % delayed
- Pattern shows up across "Megadeals propel M&A activity" type stories

## Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ Decoding deal delays                                     │
│                                                          │
│  Deals (count)                       % delayed (RHS)     │
│  500 ┐                                            50%    │
│  400 ┤   ▓▓▓                                      40%    │
│  300 ┤   ▓▓▓ ▓▓▓ ▓▓▓        ___..---◯  35%       30%    │
│  200 ┤   ▓▓▓ ▓▓▓ ▓▓▓ __--""                       20%    │
│  100 ┤   ▓▓▓ ▓▓▓ ▓▓▓ ▓▓▓                          10%    │
│    0 └──────────────────────────────────            0%    │
│       2021  2022  2023  2024  2025                       │
│                                                          │
│  Source: McKinsey M&A Database, October 2025             │
└──────────────────────────────────────────────────────────┘
```

## Critical design rules

1. **Bar = primary metric** (the volume), **line = secondary** (the rate). Bar is in primary color, line in accent.
2. **Two y-axes** — left axis for bars, right axis for line. Always label both.
3. **Right-axis label color matches the line color** so the eye knows which axis pairs with which series.
4. **Don't use this pattern for two things on the same scale** — that's just a regular line chart.
5. **Annotate the line's endpoint or peak** — that's usually the punchline.

## python-pptx recipe

This is the trickiest pattern. python-pptx supports combo charts via the underlying chart XML manipulation:

```python
from pptx.chart.data import CategoryChartData
from pptx.enum.chart import XL_CHART_TYPE
from pptx.oxml.ns import qn

# Step 1 — primary axis bars
chart_data = CategoryChartData()
chart_data.categories = ['2021', '2022', '2023', '2024', '2025']
chart_data.add_series('Deal count', (320, 380, 410, 350, 290))

graphic_frame = slide.shapes.add_chart(
    XL_CHART_TYPE.COLUMN_CLUSTERED,
    Inches(1.0), Inches(2.0), Inches(11.0), Inches(4.5),
    chart_data,
)
chart = graphic_frame.chart

# Step 2 — add the line series on a SECONDARY axis via XML
# (python-pptx's high-level API doesn't expose secondary axes — drop to XML)
chart_xml = chart._chartSpace
plotArea = chart_xml.find('.//' + qn('c:plotArea'))

# Build the line plot XML and append. The c:lineChart element gets
# its own c:secondaryAxId reference. Easiest: build via a template
# and patch with your data values. See python-pptx GitHub issue #1027
# for a worked example.
add_secondary_line_series(
    chart=chart,
    name='% delayed',
    categories=['2021', '2022', '2023', '2024', '2025'],
    values=(15, 22, 28, 32, 35),
    line_color=RGBColor(0xE5, 0x54, 0x6C),  # accent red
)

# Style
chart.value_axis.tick_labels.font.size = Pt(10)
chart.value_axis.tick_labels.font.color.rgb = RGBColor(0x05, 0x1C, 0x2C)
# (Right axis labels are styled within add_secondary_line_series)
```

> **Practical note**: combo charts in python-pptx are messy. If your skill cannot manipulate the chart XML cleanly, an acceptable fallback is to render this pattern with **matplotlib** and embed the PNG as an image — losing edit-ability but keeping fidelity. Flag this trade-off when this pattern is selected and ask whether editability or aesthetic is more important for the specific deck.

## Headline conventions

- Frames the *paradox* between the two metrics.
- "Decoding deal delays" — count is rising AND % delayed is rising, the story is decoding why.
- "Volume up, value down"
- "More [X], fewer [Y]"

## When NOT to use this pattern

- Same-scale metrics → regular grouped bar or line chart.
- One metric only → pattern 01 or 04.
- Three or more metrics with different scales → split into separate charts. Combo charts get ugly fast above 2 series.
