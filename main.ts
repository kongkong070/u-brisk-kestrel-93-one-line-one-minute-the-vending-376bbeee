// One Line, One Minute: The Vending Machine Pickup Line Contest
// Writes a single pickup line, spoken by a vending machine to a passing
// human, to /output/entry.txt. Gate: UTF-8 text, 1-200 characters,
// not only whitespace. Node 22 stdlib only, fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line, written for this contest. It leans on the machine's own world:
// its hum, its buttons, the coil drop, and exact change — with the punch
// landing in the last few words.
const ENTRY =
  "Hey — I've been humming your name all day. Press B7 and I'll drop " +
  "something sweet, because you're the only exact change I need.";

function validate(text) {
  if (typeof text !== "string") throw new Error("entry must be a string");
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main() {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  // Never remove outDir itself: the grader may mount it (bind mount),
  // so only create it if missing and write the file inside it.
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length} chars to ${target}`);
}

main();
