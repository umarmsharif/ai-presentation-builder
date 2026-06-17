#!/usr/bin/env node
// pattern_filter.js — return eligible slide patterns for a given archetype.
//
// Reads:
//   references/slide_patterns.md  (the Pattern Index table)
//
// CLI:
//   node scripts/pattern_filter.js --archetype=diagnostic
//   node scripts/pattern_filter.js --archetype=recommendation --format=json
//   node scripts/pattern_filter.js --slide-title="..." --density=heavy --archetype=diagnostic
//
// Use during the ghost-deck step (SKILL.md §1.5b): feed the filtered list
// into the AskUserQuestion picker as the LIBRARY option, alongside a
// CLAUDE-synthesised pick for the specific slide.
//
// Density is advisory metadata, not a filter (see note below).

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2).reduce((acc, a) => {
  const m = a.match(/^--([^=]+)=(.*)$/);
  if (m) acc[m[1]] = m[2];
  return acc;
}, {});

// Density is advisory metadata on each pattern. It is NOT a hard filter.
// The 2026-05-15 design decision: the per-slide picker (AskUserQuestion) is
// the filter. Pre-filtering by density created dead zones that didn't reflect
// real taste gaps. Density input is accepted for backward compatibility and
// echoed in the output so Claude's recommendation can weight by it, but the
// returned pattern list is NOT narrowed.

const DENSITY = args.density ? args.density.toLowerCase() : null;
const ARCHETYPE = (args.archetype || "diagnostic").toLowerCase();
const FORMAT = (args.format || "table").toLowerCase();
const SLIDE_TITLE = args["slide-title"] || null;

// --- read slide_patterns.md and parse the Pattern Index table ---
const SKILL_ROOT = path.resolve(__dirname, "..");
const patternsMd = fs.readFileSync(
  path.join(SKILL_ROOT, "references", "slide_patterns.md"), "utf8");

// Parse the markdown table whose first column is `| id |`. Reads cells BY
// HEADER NAME, so added columns (the table now carries id | density | role |
// arrangement | archetypes | source) don't shift parsing. Positional fallbacks
// keep the older 4-column layout (id | density | archetypes | source) working.
function parsePatternIndex(md) {
  const out = [];
  const lines = md.split("\n");
  let inTable = false;
  let cols = null; // header name -> column index
  for (const line of lines) {
    if (/^\|\s*id\s*\|/.test(line)) {                          // header row
      cols = {};
      line.split("|").slice(1, -1).forEach((h, i) => { cols[h.trim().toLowerCase()] = i; });
      inTable = true;
      continue;
    }
    if (inTable && /^\|\s*-+\s*\|/.test(line)) continue;       // header rule
    if (inTable && !line.startsWith("|")) { inTable = false; cols = null; continue; }
    if (!inTable) continue;
    const cells = line.split("|").slice(1, -1).map(s => s.trim());
    if (cells.length < 4) continue;
    const at = (name, fb) => { const i = cols && cols[name] != null ? cols[name] : fb; return cells[i] != null ? cells[i] : ""; };
    const id = at("id", 0).replace(/`/g, "");
    if (!id) continue;
    const density = at("density", 1).toLowerCase();
    const archetypes = at("archetypes", cells.length - 2).split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
    const source = at("source", cells.length - 1);
    out.push({ id, density, archetypes, source, origin: "library" });
  }
  return out;
}

// --- filter ---
function fitsArchetype(pattern, archetype) {
  if (!pattern.archetypes || pattern.archetypes.length === 0) return true;
  if (pattern.archetypes.includes("all")) return true;
  return pattern.archetypes.includes(archetype);
}

// Density is advisory only — surfaced in output but does not filter the list.
const library = parsePatternIndex(patternsMd).filter(p => fitsArchetype(p, ARCHETYPE));

// --- emit ---
if (FORMAT === "json") {
  console.log(JSON.stringify({
    inputs: { archetype: ARCHETYPE, slide_title: SLIDE_TITLE, density_hint: DENSITY },
    notes: "Density is advisory metadata. The returned list is filtered by archetype only; the picker chooses.",
    counts: { library: library.length },
    library,
  }, null, 2));
} else {
  const densityNote = DENSITY ? `  (density=${DENSITY} is advisory, does not filter)` : "";
  console.log(`\nPATTERN FILTER  archetype=${ARCHETYPE}${densityNote}\n`);
  console.log(`  LIBRARY (${library.length} eligible patterns from slide_patterns.md):`);
  library.forEach(p => {
    console.log(`    • ${p.id.padEnd(42)} [${p.density.padEnd(6)}] ${p.source}`);
  });
  console.log("");
  console.log(`  Tip: in the per-slide picker, present the user:`);
  console.log(`    1. LIBRARY recommendation  (best fit from the ${library.length} above)`);
  console.log(`    2. CLAUDE recommendation   (synthesised for the specific slide title + content)`);
  console.log("");
}

process.exit(0);
