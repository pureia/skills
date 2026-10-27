// Consistency checker for the coding-standard package.
// Run: node evals/coding-standard/check.mjs   (from the repo root; exit code 1 on any failure)
// It resolves ../../coding-standard from its own location, so it checks the package as it will ship.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const pkg = path.resolve(here, "..", "..", "coding-standard");
const failures = [];
const ok = (cond, msg) => { if (!cond) failures.push(msg); };

const walk = (d) => fs.readdirSync(d, { withFileTypes: true })
  .filter(e => e.name !== ".git")
  .flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(pkg);
const text = Object.fromEntries(files.map(f => [path.relative(pkg, f).replace(/\\/g, "/"), fs.readFileSync(f, "utf8")]));

// 1. inventory: 27 rules + 4 hazards, ids contiguous inside each group
const rules = [...text["standard.md"].matchAll(/^### ([NFDCMITXH])(\d) ·/gm)].map(m => m[1] + m[2]);
const groups = {};
for (const r of rules) (groups[r[0]] ||= []).push(Number(r.slice(1)));
const expected = { N: 3, F: 3, D: 4, C: 5, M: 3, I: 3, T: 4, X: 2, H: 4 };
for (const [g, n] of Object.entries(expected)) {
  ok(groups[g]?.length === n, `group ${g}: expected ${n}, found ${groups[g]?.length ?? 0}`);
  ok(groups[g]?.every((v, i) => v === i + 1), `group ${g}: ids not contiguous (${groups[g]})`);
}
ok(rules.length === 31, `expected 31 rule entries (27 + 4 hazards), found ${rules.length}`);

// 2. every rule id referenced anywhere is defined
const defined = new Set(rules);
for (const [f, t] of Object.entries(text)) {
  if (f === "standard.md") continue;
  for (const m of t.matchAll(/(?<![A-Za-z0-9_])[NFDCMITXH]\d(?![0-9])/g))
    ok(defined.has(m[0]), `${f}: dangling rule id ${m[0]}`);
}

// 3. technique ids: 61, unique, T-chNN.n
const tids = [...text["patterns.md"].matchAll(/T-\d\d\.\d+/g)].map(m => m[0]);
ok(new Set(tids).size === 61, `expected 61 technique ids, found ${new Set(tids).size}`);

// 4. the three smell lists agree; 24 each
const ch03 = [...text["chapters/ch03-bad-smells.md"].matchAll(/^- \*\*([^*（]+)（/gm)].map(m => m[1].trim());
const sheetSmells = [...text["cheatsheet.md"].matchAll(/^\| ([A-Z][A-Za-z ]+) \| [^|]+ \| ch/gm)].map(m => m[1])
  .filter(n => ["Smell", "Popular practice", "Null Object pattern", "Strategy pattern for type dispatch"].indexOf(n) === -1);
ok(ch03.length === 24, `ch03 smells: expected 24, found ${ch03.length}`);
ok(sheetSmells.length === 24, `cheatsheet smells: expected 24, found ${sheetSmells.length}`);
const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, "");
const s3 = new Set(ch03.map(norm)), sc = new Set(sheetSmells.map(norm));
for (const s of s3) ok(sc.has(s), `smell in ch03 but not cheatsheet: ${s}`);
for (const s of sc) ok(s3.has(s), `smell in cheatsheet but not ch03: ${s}`);

// 5. all markdown links resolve
for (const [f, t] of Object.entries(text)) {
  if (!f.endsWith(".md")) continue;
  for (const m of t.matchAll(/\]\(([^)#]+)(#[^)]*)?\)/g)) {
    const target = m[1];
    if (/^https?:/.test(target)) continue;
    ok(fs.existsSync(path.resolve(path.dirname(path.join(pkg, f)), target)), `${f}: broken link -> ${target}`);
  }
}

// 6. glossary: the English entry and the Chinese index must cite the same chapters
const g = text["glossary.md"].split("## 中文索引");
const en = new Map();
for (const line of g[0].split(/\r?\n/)) {
  const m = /^\*\*(.+?)\*\*\s*—.*\((ch\d{2}(?:,\s*ch\d{2})*)\)\.?$/.exec(line);
  if (m) en.set(m[1].replace(/（.*）$/, "").trim(), m[2].replace(/\s+/g, ""));
}
for (const line of g[1].split(/\r?\n/)) {
  const m = /^- \*\*(.+?)\*\* → (.+?) \((ch\d{2}(?:,\s*ch\d{2})*)\)$/.exec(line);
  if (!m) continue;
  const e = en.get(m[2].trim());
  ok(e !== undefined, `glossary: "${m[2]}" has no English entry`);
  if (e !== undefined) ok(e === m[3].replace(/\s+/g, ""), `glossary: "${m[2]}" cites ${e} in English, ${m[3]} in the Chinese index`);
}

// 7. frontmatter: name matches the directory, description fits the catalog window
const desc = /^description:\s*"(.+)"\s*$/m.exec(text["SKILL.md"])?.[1] ?? "";
ok(/^name:\s*coding-standard\s*$/m.test(text["SKILL.md"]), "frontmatter: name must be coding-standard");
ok(desc.length > 0 && desc.length <= 500, `frontmatter: description is ${desc.length} chars (limit 500)`);

// 8. no evaluation material and no eval-artifact ids inside the package.
// CHANGELOG is exempt: a changelog has to be able to name what it removed.
const content = Object.entries(text).filter(([f]) => f !== "CHANGELOG.md");
ok(!files.some(f => /test-prompts|expected|fixtures/i.test(path.basename(f))), "evaluation material found inside the package");
for (const [f, t] of content) {
  ok(!/eval-\d|replication\/run/.test(t), `${f}: cites an eval artifact id`);
}

// 9. no stale references to mechanisms the runtime does not have
for (const [f, t] of content) {
  ok(!t.includes("argument hint"), `${f}: refers to a dropped argument hint`);
  ok(!/review skill's dimension table/.test(t), `${f}: refers to a dimension table that does not exist`);
}

if (failures.length) {
  console.log("FAIL");
  for (const f of failures) console.log("  - " + f);
  process.exit(1);
}
console.log(`OK — ${files.length} files, ${rules.length} rules, 24 smells, 61 techniques, ${desc.length}-char description, 0 dangling ids, 0 broken links`);
