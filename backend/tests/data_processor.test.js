import test from "node:test";
import assert from "node:assert/strict";
import { extractSkillsFromText } from "../data_processor/skill_extraction/extractor.js";
import { parseResume } from "../data_processor/resume_parser/parser.js";
import { generateLearningRecommendations } from "../data_processor/recommendation/engine.js";
import { analyzeMatch, rankCandidates } from "../data_processor/matching/matcher.js";

test("Skill Extraction detects technical and Ayush informatics competencies", () => {
  const sample = "Experienced with React, JavaScript, Node.js and Docker. Built Ayush Health Informatics EHR portal.";
  const skills = extractSkillsFromText(sample);
  const names = skills.map((s) => s.name);

  assert.ok(names.includes("React"));
  assert.ok(names.includes("JavaScript"));
  assert.ok(names.includes("Node.js"));
  assert.ok(names.includes("Docker"));
  assert.ok(names.includes("Ayush Health Informatics"));
});

test("Resume Parser extracts contact, degree, CGPA and structured skills", () => {
  const resumeText = `
    Aarav Patel
    aarav@example.com | +91 98765 43210
    B.Tech in Computer Science & Engineering | CGPA: 8.5
    
    Skills: React, Node.js, MongoDB, Docker, Python
    
    Projects:
    - Ayush Telecare: Built full-stack EHR portal using React and Node.js with MongoDB storage.
  `;

  const parsed = parseResume(resumeText);
  assert.equal(parsed.name, "Aarav Patel");
  assert.equal(parsed.email, "aarav@example.com");
  assert.equal(parsed.cgpa, 8.5);
  assert.ok(parsed.education.length > 0);
  assert.ok(parsed.skills.some((s) => s.name === "React"));
  assert.ok(parsed.skills.some((s) => s.name === "MongoDB"));
});

test("Learning Recommendation Engine generates prioritized pathways for gaps", () => {
  const currentSkills = [
    { name: "React", proficiency: 80 },
    { name: "JavaScript", proficiency: 85 },
    { name: "Docker", proficiency: 20 },
  ];
  const targetReqs = ["React", "JavaScript", "Docker", "AWS"];

  const recs = generateLearningRecommendations(currentSkills, targetReqs);
  const skillNames = recs.map((r) => r.skill);

  assert.ok(skillNames.includes("Docker"));
  assert.ok(skillNames.includes("AWS"));
  assert.equal(recs[0].phase, "NOW");
  assert.ok(recs[0].projectIdea.length > 0);
});

test("Matching Engine calculates explainable match score and handles eligibility", () => {
  const studentSkills = [
    { name: "React", proficiency: 90 },
    { name: "JavaScript", proficiency: 85 },
  ];
  const required = ["React", "JavaScript", "Docker", "AWS"];

  const match = analyzeMatch(studentSkills, required, {
    studentCgpa: 8.2,
    minimumCgpa: 7.5,
  });

  assert.equal(match.score, 50); // 2 out of 4
  assert.equal(match.fitLevel, "Moderate match");
  assert.deepEqual(match.coveredSkills, ["React", "JavaScript"]);
  assert.deepEqual(match.missingSkills, ["Docker", "AWS"]);
  assert.equal(match.eligible, true);
});

test("Candidate Ranking ranks strongest skill alignments first", () => {
  const candidates = [
    { name: "Candidate A", skills: ["React", "JavaScript"] },
    { name: "Candidate B", skills: ["React", "JavaScript", "Node.js", "Docker"] },
    { name: "Candidate C", skills: ["Python"] },
  ];

  const opportunity = {
    requiredSkills: ["React", "JavaScript", "Docker"],
  };

  const ranked = rankCandidates(candidates, opportunity);
  assert.equal(ranked[0].name, "Candidate B"); // Has all 3
  assert.equal(ranked[0].matchScore, 100);
  assert.equal(ranked[1].name, "Candidate A"); // Has 2 of 3
});
