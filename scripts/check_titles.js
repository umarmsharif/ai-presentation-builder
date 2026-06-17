#!/usr/bin/env node
// check_titles.js — action-title lint for inputs.json.
//
// Flags slide titles that read as topic-only nouns ("Revenue analysis",
// "Roadmap", "Three findings", "Ask") instead of insight assertions
// ("Revenue grew 15%", "Phase 1 ships in 4 weeks", "The funnel breaks
// in three places"). Runs as part of the voice pre-flight before building.
//
// Exit code: 0 clean, 1 warnings present.
//
// Usage:
//   node scripts/check_titles.js path/to/inputs.json
//
// The heuristic: a title is flagged unless it contains at least one verb
// from a small consulting verb list, OR uses an em-dash/colon construction
// that promises a follow-on insight ("Revenue: a 15% beat"). Numbers in
// the title also count as a strong signal of an action title because
// numbers usually quantify a claim.
//
// This is a *gate*, not a hard rule — sometimes a topic title is right
// (e.g., on a section divider). The lint surfaces the candidates so the
// author can review and either rewrite or accept.

const fs = require("fs");
const path = require("path");

const inputsPath = process.argv[2];
if (!inputsPath) {
  console.error("Usage: node check_titles.js <inputs.json>");
  process.exit(2);
}
const I = JSON.parse(fs.readFileSync(inputsPath, "utf8"));

// Small whitelist of action verbs common in consulting prose. Lowercased
// matching against title tokens.
const ACTION_VERBS = new Set([
  // generic
  "is","are","was","were","be","been","being","has","have","had","does","do","did",
  "will","won","loses","lost","beats","beat","ships","ship","shipped","ships",
  "grows","grew","grow","drops","dropped","drop","rises","rose","rise","falls","fell",
  "fall","kills","kill","killed","sits","sat","lives","lived","tied","tie","tying",
  "lands","landed","drives","drove","drive","gates","gate","blocks","blocked","block",
  "leads","led","captures","captured","capture","covers","covered","cover","signs","signed",
  "names","named","name","owns","owned","runs","ran","run","stops","stopped","stop",
  "slips","slipped","slip","slows","slowed","slow","scales","scaled","scale","trains","trained",
  "train","builds","built","build","earns","earned","earn","loses","lost","lose","needs",
  "needed","need","owes","owed","owe","pays","paid","pay","fixes","fixed","fix","breaks",
  "broke","break","broken","says","said","say","tells","told","tell","misses","missed","miss",
  "hits","hit","slips","wins","won","matters","mattered","matter","spans","spanned","span",
  "enters","entered","enter","exits","exited","exit","picks","picked","pick","ignores",
  "ignored","ignore","starts","started","start","ends","ended","end","keeps","kept","keep",
  "makes","made","make","gets","got","get","puts","put","sets","set","gives","gave","give",
  "works","worked","work","fails","failed","fail","helps","helped","help","saves","saved","save",
  "frees","freed","free","fits","fit","reads","read","calls","called","call","shows","showed","show",
  // structure-y / consulting-specific
  "gates","ranks","ranked","frames","framed","frame","cuts","cut","sequences","sequenced",
  "sequence","unblocks","unblocked","unblock","compounds","compounded","compound","earns",
  "stalls","stalled","stall","ships","slips","peaks","peaked","peak","outpaces","outpace",
  "outpaced","triples","triple","tripled","doubles","double","doubled","quadruples"
]);

// Topic-only red-flag words (titles consisting mostly of these are noun-stacks)
const TOPIC_RED_FLAGS = new Set([
  "analysis","findings","roadmap","ask","summary","overview","review","results",
  "approach","plan","strategy","methodology","background","appendix","next steps",
  "introduction","conclusion","agenda","outlook","considerations","issues","risks",
  "opportunities","themes","key points","highlights","breakdown","comparison"
]);

// Titles from the inputs to check
const titles = [];
if (I.title_slide && Array.isArray(I.title_slide.title_lines)) {
  // Title slide is allowed to be poetic; only lint body slides.
}
(I.slides || []).forEach((s, i) => {
  if (s.title) titles.push({ i: i + 1, layout: s.layout, title: s.title });
});

function lintTitle(title) {
  const t = title.trim();
  const tokens = t.toLowerCase().replace(/[—–\-:.,;!?]/g, " ").split(/\s+/).filter(Boolean);
  if (!tokens.length) return { ok: true, reason: "empty" };

  // Numbers in the title are a strong signal it makes a quantitative claim
  if (/\d/.test(t)) return { ok: true, reason: "contains-number" };

  // Em-dash, colon, or "and why" / "but" markers signal a two-clause assertion
  if (/—|–|:|\bbut\b|\band why\b/i.test(t)) return { ok: true, reason: "two-clause-construction" };

  // If it contains an action verb, it's an assertion
  const hasVerb = tokens.some((tok) => ACTION_VERBS.has(tok));
  if (hasVerb) return { ok: true, reason: "has-action-verb" };

  // Short noun-stack with a topic red-flag is the failure mode
  if (tokens.length <= 4) {
    const allTopic = tokens.every((tok) => TOPIC_RED_FLAGS.has(tok)) ||
                     tokens.some((tok) => TOPIC_RED_FLAGS.has(tok));
    if (allTopic) {
      return { ok: false, reason: "noun-stack-with-topic-word" };
    }
    return { ok: false, reason: "short-no-verb-no-number" };
  }

  // Longer titles without verbs are also suspicious but less so
  return { ok: false, reason: "no-verb-no-number" };
}

const flagged = [];
titles.forEach(({ i, layout, title }) => {
  const r = lintTitle(title);
  if (!r.ok) flagged.push({ i, layout, title, reason: r.reason });
});

console.log("ACTION-TITLE LINT");
console.log(`  Slides checked: ${titles.length}`);
console.log(`  Flagged: ${flagged.length}`);
console.log("");
if (flagged.length === 0) {
  console.log("  ✓ All slide titles read as assertions.");
  process.exit(0);
}
flagged.forEach((f) => {
  console.log(`  ⚠ slide ${f.i} [${f.layout || "?"}]: "${f.title}"`);
  console.log(`    reason: ${f.reason}`);
  console.log(`    fix: rewrite as an insight statement (verb + specific claim).`);
  console.log(`         e.g., not "Three findings" but "The funnel breaks in three places."`);
  console.log(`         not "Roadmap" but "From MVP to enterprise in 18 weeks."`);
  console.log("");
});
process.exit(1);
