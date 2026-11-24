// "The Loop" — entry for make.fun's "Make the AI Judge Laugh: The Office Joke Open".
// Holds a field of candidate one-line office jokes, scores each against the
// judge's published criteria, writes the winner to /output/entry.txt and
// validates the gate (exactly one line, 1-200 chars, non-blank).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The judge's five criteria, most important first, with weights 5/4/3/2/1:
//  1. office  — about office life and works as a joke, not a complaint
//  2. payoff  — the laugh is earned: a turn that pays off in the last words
//  3. detail  — specific office detail (meeting, reply-all, printer, calendar)
//  4. fresh   — a familiar setup taken somewhere unexpected
//  5. tight   — reads cleanly in one pass, no word cuttable
// Each criterion is scored 0-2; the weighted total decides the winner.
const WEIGHTS = [5, 4, 3, 2, 1];

const ENTRY_LINE =
  "The meeting could have been an email, the email could have been a Slack message, and the Slack message is now a meeting.";

const CANDIDATES = [
  {
    title: "The Loop",
    line: ENTRY_LINE,
    // The canonical complaint escalated until it loops back on itself:
    // top marks on every criterion, payoff lands on the final word.
    scores: [2, 2, 2, 2, 2],
  },
  {
    title: "Reply All",
    line: "I replied-all to say 'please don't reply all', and 400 people replied-all to agree with me.",
    scores: [2, 2, 2, 1, 1],
  },
  {
    title: "Seniority",
    line: "The printer on the third floor has been 'almost fixed' since 2019; at this point it has seniority over me.",
    scores: [2, 1, 2, 1, 2],
  },
  {
    title: "Recurring Event",
    line: "My calendar has so many meetings that my actual job is now listed as a recurring event with no attendees.",
    scores: [2, 1, 2, 1, 1],
  },
  {
    title: "Standup",
    line: "Our standup is fifteen minutes long, which is impressive, because nobody in it has stood up since March.",
    scores: [2, 1, 1, 2, 1],
  },
  {
    title: "Open Plan",
    line: "HR says my door is always open, which is true: the office is open-plan and nobody has a door.",
    scores: [2, 1, 1, 1, 2],
  },
  {
    title: "Family",
    line: "The boss said 'we're a family here', and honestly that explains the unpaid overtime and the arguing at lunch.",
    scores: [2, 1, 1, 1, 1],
  },
  {
    title: "Status",
    line: "I set my status to 'in a meeting' to get work done; it is the only meeting that has ever produced anything.",
    scores: [2, 2, 2, 1, 1],
  },
  {
    title: "Wi-Fi",
    line: "The Wi-Fi went down for ten minutes and the whole office briefly remembered how to talk to each other, then it came back.",
    scores: [2, 1, 2, 1, 1],
  },
  {
    title: "Review",
    line: "My performance review said 'exceeds expectations', which is easy when the expectations were set by last year's me.",
    scores: [1, 2, 1, 2, 1],
  },
];

function total(candidate) {
  return candidate.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(candidates) {
  let best = null;
  for (const candidate of candidates) {
    const score = total(candidate);
    if (best === null || score > best.score) best = { ...candidate, score };
  }
  return best;
}

function main() {
  const winner = pickWinner(CANDIDATES);
  for (const candidate of CANDIDATES) {
    const mark = candidate === CANDIDATES.find((c) => c.title === winner.title) ? "*" : " ";
    console.log(`${mark} ${candidate.title}: ${total(candidate)}/30`);
  }
  console.log(`winner: "${winner.title}" (${winner.score}/30)`);

  if (winner.line !== ENTRY_LINE) {
    throw new Error(`scored winner is not the entry line: ${winner.line}`);
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.line, "utf8");

  const text = readFileSync("/output/entry.txt", "utf8");
  const lines = text.split("\n").filter((l) => l.length > 0);
  if (lines.length !== 1) throw new Error(`gate: expected exactly 1 line, got ${lines.length}`);
  if (text.length < 1 || text.length > 200) throw new Error(`gate: ${text.length} chars out of 1-200`);
  if (text.trim().length === 0) throw new Error("gate: blank entry");
  if (text !== winner.line) throw new Error("gate: file content differs from winner line");
  console.log(`gate OK: one line, ${text.length} chars, title "${winner.title}"`);
}

main();
