// Reproduces the numbers quoted in standard.md § C5.
// Run from the repo root: node evals/coding-standard/measurements.mjs
//
// The float-shuffle line is seeded: it prints the same count on every run.
// The timing ratios are not stable by nature — each size reports the ratio from
// five independent trials, and the spread is the finding, not noise to hide.
import { performance } from "node:perf_hooks";

const SEED = 20261027;
const rng = (() => {
  let a = SEED;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
})();

const median = (fn, reps = 7) => {
  for (let i = 0; i < 5; i++) fn();                       // warmup
  const runs = [];
  for (let i = 0; i < reps; i++) { const t = performance.now(); fn(); runs.push(performance.now() - t); }
  return runs.sort((a, b) => a - b)[Math.floor(reps / 2)];
};

// 1. a hole is undefined to the loop, skipped by reduce
{
  const a = [1, , 3];
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i];
  console.log("sparse [1, , 3]        loop:", s, "| reduce:", a.reduce((x, y) => x + y, 0));
}
// 2. the method has to exist
{
  const arrayLike = (function () { return arguments; })(1, 2, 3);
  let s = 0;
  for (let i = 0; i < arrayLike.length; i++) s += arrayLike[i];
  let err = "none";
  try { arrayLike.reduce((a, b) => a + b, 0); } catch (e) { err = e.constructor.name; }
  console.log("array-like (arguments) loop:", s, "| reduce:", err);
}
// 3. non-associativity: exact, no measurement involved
console.log("(0.1+0.2)+0.3 =", (0.1 + 0.2) + 0.3, "| 0.1+(0.2+0.3) =", 0.1 + (0.2 + 0.3));
// 4. the same multiset, 200 seeded orders — how many distinct totals?
{
  const base = Array.from({ length: 200000 }, () => 0.1 + rng() * 0.7);
  const shuffle = (a) => { const c = a.slice(); for (let i = c.length - 1; i > 0; i--) { const j = (rng() * (i + 1)) | 0; [c[i], c[j]] = [c[j], c[i]]; } return c; };
  const totals = new Set();
  for (let r = 0; r < 200; r++) totals.add(shuffle(base).reduce((a, b) => a + b, 0).toPrecision(17));
  console.log(`200 seeded shuffles of 200k doubles — distinct totals: ${totals.size} (seed ${SEED}; stable)`);
}
// 5. pipeline vs loop. Each measurement runs the same ~10^7 element visits, so the
//    small sizes are timed by repetition instead of by a microsecond-resolution clock.
for (const n of [1000, 10000, 100000, 1000000]) {
  const d = Array.from({ length: n }, (_, i) => i % 97);
  const inner = Math.ceil(1e7 / n);
  const loop = () => { let s = 0; for (let k = 0; k < inner; k++) { let t = 0; for (let i = 0; i < d.length; i++) if (d[i] % 2 === 0) t += d[i] * 2; s += t; } return s; };
  const pipe = () => { let s = 0; for (let k = 0; k < inner; k++) s += d.filter(x => x % 2 === 0).map(x => x * 2).reduce((a, b) => a + b, 0); return s; };
  const ratios = [];
  let l = 0, p = 0;
  for (let t = 0; t < 3; t++) { l = median(loop, 5); p = median(pipe, 5); ratios.push(p / l); }
  const min = Math.min(...ratios), max = Math.max(...ratios);
  console.log(`n=${String(n).padStart(7)}: loop ${(l / inner).toFixed(3)}ms | filter+map+reduce ${(p / inner).toFixed(3)}ms | ratio ${min.toFixed(1)}–${max.toFixed(1)}x | ${inner} reps`);
}
