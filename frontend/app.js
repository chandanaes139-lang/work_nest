const skills = [
  { name: "JavaScript", score: 88 },
  { name: "React", score: 81 },
  { name: "Node.js", score: 70 },
  { name: "MongoDB", score: 64 },
  { name: "Docker", score: 24 },
  { name: "AWS", score: 17 }
];

const opportunities = [
  { company: "Northstar Labs", initials: "N", color: "#d8d2f2", role: "Frontend Engineering Intern", type: "Remote · Internship", required: ["React", "JavaScript", "Node.js", "Docker"], date: "Closes in 6 days" },
  { company: "CivicStack", initials: "C", color: "#9ed5da", role: "Junior Full Stack Developer", type: "Bengaluru · Placement", required: ["React", "Node.js", "MongoDB", "AWS"], date: "Closes in 12 days" },
  { company: "Bloomworks", initials: "B", color: "#f6cb74", role: "Product Engineering Fellow", type: "Hybrid · Fellowship", required: ["JavaScript", "React", "MongoDB"], date: "Closes in 18 days" }
];

const learning = [
  { phase: "NOW", title: "Docker foundations", detail: "3 hours" },
  { phase: "NEXT", title: "AWS cloud essentials", detail: "6 hours" },
  { phase: "THEN", title: "Deploy a full-stack project", detail: "Portfolio project" }
];

const $ = (selector) => document.querySelector(selector);
const getScore = (skill) => skills.find((item) => item.name === skill)?.score ?? 0;
const isCovered = (skill) => getScore(skill) >= 55;

function matchFor(opportunity) {
  const covered = opportunity.required.filter(isCovered).length;
  return Math.round((covered / opportunity.required.length) * 100);
}

function renderSkills() {
  $("#skillList").innerHTML = skills.map((skill) => `
    <button class="skill-row" data-skill="${skill.name}" title="Increase ${skill.name} confidence">
      <span class="skill-name"><i class="skill-dot"></i>${skill.name}</span>
      <span class="skill-level"><span style="width:${skill.score}%"></span></span>
      <span class="skill-percent">${skill.score}%</span>
    </button>`).join("");
}

function renderOpportunities() {
  $("#opportunityGrid").innerHTML = opportunities.map((opportunity) => {
    const match = matchFor(opportunity);
    const tags = opportunity.required.map((skill) => `<span class="tag ${isCovered(skill) ? "" : "gap"}">${skill}${isCovered(skill) ? "" : " +"}</span>`).join("");
    return `<article class="opportunity-card">
      <div class="company-row"><span class="company-logo" style="background:${opportunity.color}">${opportunity.initials}</span><span><strong>${opportunity.company}</strong><small>Verified industry partner</small></span><span class="match-pill">${match}% MATCH</span></div>
      <h3>${opportunity.role}</h3><p>${opportunity.type}</p><div class="tags">${tags}</div>
      <div class="card-footer"><small>${opportunity.date}</small><button class="apply-button" data-role="${opportunity.role}">View role →</button></div>
    </article>`;
  }).join("");
}

function renderLearning() {
  $("#learningSteps").innerHTML = learning.map((item) => `<div class="learning-step"><small>${item.phase}</small><strong>${item.title}</strong><span>${item.detail}</span></div>`).join("");
}

function updateInsight() {
  const gaps = skills.filter((skill) => skill.score < 55).sort((a, b) => a.score - b.score);
  const coverage = Math.round((skills.filter((skill) => skill.score >= 55).length / skills.length) * 100);
  const score = Math.min(95, Math.round(48 + coverage * 0.36));
  $("#coverageValue").textContent = `${coverage}%`;
  $("#coverageBar").style.width = `${coverage}%`;
  $("#readinessScore").textContent = score;
  $("#gapTitle").textContent = gaps.length ? `${gaps.length} high-impact gap${gaps.length > 1 ? "s" : ""} found` : "Your core skills are covered";
  $("#gapText").textContent = gaps.length ? `${gaps.map((skill) => skill.name).join(" and ")} appear in your strongest opportunity matches.` : "Keep adding depth with projects and verified work.";
  $("#readinessMessage").textContent = gaps.length ? "You're building strong momentum. Focused practice will unlock more roles." : "Your foundation is looking strong. Projects are now your fastest route forward.";
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function bindEvents() {
  $("#skillList").addEventListener("click", (event) => {
    const row = event.target.closest("[data-skill]");
    if (!row) return;
    const skill = skills.find((item) => item.name === row.dataset.skill);
    skill.score = skill.score >= 95 ? 20 : Math.min(100, skill.score + 10);
    renderSkills(); renderOpportunities(); updateInsight();
    showToast(`${skill.name} confidence updated to ${skill.score}%`);
  });
  $("#opportunityGrid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-role]");
    if (button) showToast(`${button.dataset.role} added to your opportunity shortlist.`);
  });
  $("#assessmentButton").addEventListener("click", () => showToast("Assessment flow is ready for the backend integration."));
  $("#editSkills").addEventListener("click", () => { $("#skills").scrollIntoView({ behavior: "smooth" }); showToast("Select a skill bar to update its confidence."); });
}

renderSkills(); renderOpportunities(); renderLearning(); updateInsight(); bindEvents();
