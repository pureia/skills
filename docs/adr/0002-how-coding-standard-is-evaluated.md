# Evaluating `coding-standard`: no-skill baseline, fixture repository, executable first

The first two evaluation rounds compared a new version of the skill against its previous
version. Round 1 found one discriminating assertion out of six probes; round 2, after
tightening the assertions, ended in an exact tie (68/70 against 68/70). Version-versus-version
comparison had run out of headroom, so round 3 changed what is measured: the baseline is now
**no skill at all**, the probes run against a **small repository fixture** instead of pasted
snippets, and the deterministic half of the grading is done by a **script**, not by a reading
agent.

## Considered options

- **Keep version-versus-version.** Rejected: two rounds showed it saturates. A strong model
  compensates for whatever the skill fails to say, so removing real defects from the skill did
  not move the score — the defects cost improvisation, not answer quality. The question that
  still has an open answer is whether the skill earns its context at all, and that needs a
  no-skill arm.
- **Keep pasted snippets.** Rejected: every probe so far was a five-line function, so the parts
  of the skill that matter in practice — published-API migration, cross-file scope, running a
  real suite before touching it — were never exercised. A fixture with three callers, a green
  suite and a drifted duplicate rule exercises them.
- **Let the reading agent grade everything.** Rejected: round 2's graders had to re-run
  artifacts (git histories, node --test, a JDK harness) to check the runners' claims, which is
  exactly the work a script should do. Claims like "the suite still passes" are cheap to verify
  and expensive to trust.
- **Rely on a prompt instruction to keep the no-skill arm clean.** Rejected: the installed copy
  of the skill is listed in the agent's skill catalog, so "do not use it" would be a promise,
  not a condition. It is staged out of `~/.agents/skills` for the duration and restored after.

## Consequences

- Each run gets a **mutable copy** of the fixture; the master stays read-only. The checker
  works on a further temporary copy when it needs to restore the original tests, so a run's
  delivered tree is never disturbed by grading.
- Restoring the *original* test files before running them is deliberate: it catches a run that
  made the suite pass by editing it. For the probe that legitimately changes the public
  signature, the delivered suite is run instead, because updating callers is the expected work.
- Executable results are merged into each run's `grading.json` as ordinary expectations, so the
  reviewer sees deterministic and judged assertions side by side.
- Eval material stays in `coding-standard-workspace/` (git-ignored). The skill ships
  `test-prompts.json`, which is **evaluation material and named as such** in its file table —
  it contains expected answers and must never shape a reply.
