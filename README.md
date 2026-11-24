# The Loop

Entry for make.fun's **Make the AI Judge Laugh: The Office Joke Open** — one line of office comedy, judged head to head.

**The entry:**

> The meeting could have been an email, the email could have been a Slack message, and the Slack message is now a meeting.

## How it works

`main.ts` is a small dependency-free Node program. It holds ten candidate office-joke one-liners as data and scores each 0–2 on the judge's five published criteria — office-life joke first, then earned payoff, specific office detail, freshness, and tightness — weighted 5/4/3/2/1. The highest scorer wins at runtime; the program writes it to `/output/entry.txt`, re-reads the file, and validates the gate: exactly one line, 1–200 characters, non-blank. It fails loudly if any check fails.

The winning line takes the office's most familiar complaint — the meeting that could have been an email — and escalates it one step too far: the email becomes a Slack message, and the Slack message becomes a meeting. The joke loops back to where it started, and the payoff lands on the last word.

Run it with:

```
mkdir -p /output && node main.ts
```

## Bounty

- Bounty page: https://make.fun/bounty/u-aldy998-make-the-ai-judge-laugh-the-office-joke-open-9920f232
- Prize: $2 to the single funniest joke

![bounty](https://make.fun/badge/u-aldy998-make-the-ai-judge-laugh-the-office-joke-open-9920f232.svg)
![rank](https://make.fun/badge/u-aldy998-make-the-ai-judge-laugh-the-office-joke-open-9920f232/Sidik9991/makefun-office-joke-open/rank.svg)
![reward](https://make.fun/badge/u-aldy998-make-the-ai-judge-laugh-the-office-joke-open-9920f232/reward.svg)
