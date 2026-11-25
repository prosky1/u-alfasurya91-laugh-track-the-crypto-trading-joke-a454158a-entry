import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const JOKE =
  "I finally timed the bottom perfectly: my stop-loss sold everything four seconds before the pump.";

const OUTPUT_PATH = "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function assertGate(text: string): void {
  const chars = [...text];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    throw new Error(
      `entry text must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry text must not be only whitespace");
  }
}

assertGate(JOKE);

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, JOKE, "utf8");

const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== JOKE) {
  throw new Error("output file does not match the entry text byte for byte");
}
assertGate(written);
