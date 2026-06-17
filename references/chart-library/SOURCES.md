# Sources & copyright

## Origin

This chart pattern library is distilled from McKinsey & Company's "The Week in Charts" series — a weekly column publishing 4-6 individual chart entries every Saturday. McKinsey publishes each chart as a standalone page at `mckinsey.com/featured-insights/week-in-charts/[slug]`.

41 chart entries from November 2025 to April 2026 were indexed for this catalog. 15 were fully extracted with chart-type taxonomy; 26 are placeholder entries for future top-up extraction.

## Copyright statement

**All chart images, headlines, data, and accompanying text are © McKinsey & Company.** This library:

- References McKinsey chart URLs for pattern study and design-rule extraction.
- Does NOT include downloaded copies of McKinsey's chart images.
- Does NOT redistribute McKinsey's headlines, body text, or data.
- Documents *patterns and conventions* observed across the catalog so original charts can be built in a similar visual language.

Charts produced by `/strategy-deck-builder` using these patterns must be:

1. **Built from the user's own data**, not McKinsey's data.
2. **Original visual artwork**, generated via python-pptx using the pattern recipes — not embedded copies of McKinsey images.
3. **Properly attributed** when the underlying *insight* comes from McKinsey research, with a "Source: McKinsey & Company..." line and link to the source report.

Treat the catalog the way a designer would treat a competitor's portfolio: study the patterns, internalize the rules, build your own work. Never copy.

## Indexed entries

The full URL list is in `url-discovery.json`. Brief summary:

| Date range | Issues indexed | Fully extracted |
|---|---|---|
| Nov 2025 | 8 | 8 |
| Dec 2025 | 7 | 7 |
| Jan 2026 | 9 | 0 |
| Feb 2026 | 5 | 0 |
| Mar 2026 | 5 | 0 |
| Apr 2026 | 7 | 0 (except disease-burden ref) |

The 15 fully extracted entries from Nov-Dec 2025 cover 13 distinct chart types — sufficient pattern diversity to define the v1 catalog. The 26 pending entries are stable URLs and can be top-up extracted in a future session.

## Citation example

When a generated chart uses an insight derived from McKinsey research:

```
Source: McKinsey & Company, "How scaling care can reduce disease burden,"
The Week in Charts, April 2026.
```

When the chart is your own data styled in McKinsey's visual language:

```
Source: [Your data source], [Year].
```

No McKinsey citation is needed if the data is yours — only the *visual style* is borrowed, and visual styles aren't copyrightable.

## Reproducibility

To regenerate or expand this library:

1. URL discovery via `WebSearch` with `site:mckinsey.com/featured-insights/week-in-charts` queries (note: capped at ~10 results per query, so use multiple keyword variations).
2. For each URL, fetch the SSR'd HTML via `web_fetch`. Each page is ~50KB.
3. Parse the `mck-u-sr-only` accessibility description for chart type + dimensions.
4. Parse the `<h1>` for headline, `mdc-o-content-body` for subhead/body, `<picture>` source srcSet for SVGZ image URL.

The structural parser is documented in `inventory.json`'s `extraction_notes` field.
