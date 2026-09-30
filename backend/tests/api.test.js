import test from "node:test";
import assert from "node:assert/strict";
import app from "../src/app.js";

test("API Integration Tests", async (t) => {
  let server;
  let baseUrl;

  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      resolve();
    });
  });

  t.after(() => {
    server.close();
  });

  await t.test("GET /health returns ok", async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, "ok");
    assert.equal(body.theme, "Smart Automation - Ministry of Ayush");
  });

  await t.test("GET /api/v1/students/profile returns demo student", async () => {
    const res = await fetch(`${baseUrl}/api/v1/students/profile`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.name, "Aarav Patel");
    assert.ok(body.skills.length >= 4);
  });

  await t.test("POST /api/v1/students/parse-resume extracts skills accurately", async () => {
    const res = await fetch(`${baseUrl}/api/v1/students/parse-resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeText: "B.Tech student skilled in React, Node.js, Docker, and Ayush Health Informatics.",
      }),
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(body.parsed.skills.some((s) => s.name === "React"));
    assert.ok(body.parsed.skills.some((s) => s.name === "Ayush Health Informatics"));
  });

  await t.test("GET /api/v1/assessments and submit quiz", async () => {
    const listRes = await fetch(`${baseUrl}/api/v1/assessments`);
    assert.equal(listRes.status, 200);
    const list = await listRes.json();
    assert.ok(list.length > 0);

    const submitRes = await fetch(`${baseUrl}/api/v1/assessments/asm_docker/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: { q1: 1, q2: 2, q3: 0 } }),
    });
    assert.equal(submitRes.status, 200);
    const result = await submitRes.json();
    assert.equal(result.score, 100);
    assert.ok(result.newProficiency >= 85);
  });

  await t.test("POST /api/v1/opportunities and candidate ranking", async () => {
    const oppRes = await fetch(`${baseUrl}/api/v1/opportunities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "Ayush AI Research Fellow",
        company: "Central Ayush Informatics Lab",
        requiredSkills: ["React", "JavaScript", "Python"],
      }),
    });
    assert.equal(oppRes.status, 201);
    const oppBody = await oppRes.json();
    assert.ok(oppBody.opportunity.id);

    const candRes = await fetch(`${baseUrl}/api/v1/opportunities/${oppBody.opportunity.id}/candidates`);
    assert.equal(candRes.status, 200);
    const candBody = await candRes.json();
    assert.ok(candBody.candidates.length > 0);
  });

  await t.test("POST /api/v1/collaboration and GET /api/v1/institution/analytics", async () => {
    const colRes = await fetch(`${baseUrl}/api/v1/collaboration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Ayush Pharmacovigilance AI Bot",
        description: "Adverse event reporting system for traditional formulations.",
      }),
    });
    assert.equal(colRes.status, 201);

    const instRes = await fetch(`${baseUrl}/api/v1/institution/analytics`);
    assert.equal(instRes.status, 200);
    const instBody = await instRes.json();
    assert.ok(instBody.skillGaps.length > 0);
  });
});
