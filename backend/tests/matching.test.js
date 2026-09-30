import test from "node:test";
import assert from "node:assert/strict";
import { analyzeMatch } from "../src/utils/matching.js";

test("matching returns covered and missing requirements", () => {
  const result = analyzeMatch([{ name: "React", proficiency: 88 }, { name: "Node.js", proficiency: 70 }], ["React", "Node.js", "Docker"]);
  assert.equal(result.score, 67);
  assert.deepEqual(result.coveredSkills, ["React", "Node.js"]);
  assert.deepEqual(result.missingSkills, ["Docker"]);
});
