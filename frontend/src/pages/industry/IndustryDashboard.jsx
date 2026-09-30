import { useState } from "react";
import { Plus, Search, SlidersHorizontal, UsersRound, Building2, Briefcase, Eye, CheckCircle2, UserCheck } from "lucide-react";
import { studentSeed } from "../../data/demo";
import PostOpportunityModal from "../../components/opportunities/PostOpportunityModal";
import CandidateDetailModal from "../../components/candidates/CandidateDetailModal";

export default function IndustryDashboard({ onPost, applications = [], onUpdateApplicationStatus }) {
  const [skill, setSkill] = useState("");
  const [shortlisted, setShortlisted] = useState(["Aarav Patel"]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [activeTab, setActiveTab] = useState("candidates"); // "candidates" | "applicants"

  const filteredCandidates = studentSeed.filter((student) => {
    if (!skill) return true;
    const s = skill.toLowerCase();
    return (
      student.name.toLowerCase().includes(s) ||
      student.program.toLowerCase().includes(s) ||
      student.skills.some((item) => item.toLowerCase().includes(s))
    );
  });

  const toggleShortlist = (name) => {
    setShortlisted((items) =>
      items.includes(name) ? items.filter((item) => item !== name) : [...items, name]
    );
  };

  const handlePostOpportunity = (newOpp) => {
    onPost(newOpp);
  };

  return (
    <div className="content role-page">
      <section className="welcome">
        <div>
          <p className="eyebrow">Industry workspace / Northstar Labs & Ayush Partners</p>
          <h1>Find people ready to build.</h1>
          <p className="subcopy">
            Turn your requirements into transparent, skill-based candidate matches with explainable gap analysis.
          </p>
        </div>
        <button className="primary-button" onClick={() => setIsPostModalOpen(true)}>
          <Plus size={16} /> Post opportunity
        </button>
      </section>

      <section className="stat-grid">
        <Stat label="Active opportunities" value="4" note="2 internships, 1 placement, 1 fellowship" />
        <Stat label="Qualified candidates" value="37" note="Across institutional cohorts" />
        <Stat label="Shortlisted talent" value={shortlisted.length.toString()} note="Ready for technical interview" />
      </section>

      <div className="workspace-tabs">
        <button
          className={`tab-btn ${activeTab === "candidates" ? "active" : ""}`}
          onClick={() => setActiveTab("candidates")}
        >
          <UsersRound size={16} /> Candidate Discovery & Skill Ranking
        </button>
        <button
          className={`tab-btn ${activeTab === "applicants" ? "active" : ""}`}
          onClick={() => setActiveTab("applicants")}
        >
          <Briefcase size={16} /> Application Pipeline ({applications.length})
        </button>
      </div>

      {activeTab === "candidates" ? (
        <section className="split-panel">
          <article className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Candidate discovery</p>
                <h2>Role-ready candidates ({filteredCandidates.length})</h2>
              </div>
              <button className="icon-outline" onClick={() => setSkill("")}>
                <SlidersHorizontal size={16} />
              </button>
            </div>

            <div className="candidate-filter">
              <Search size={16} />
              <input
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                aria-label="Filter candidate skills"
                placeholder="Filter by skill (e.g. React, Docker, Ayush Health Informatics)..."
              />
            </div>

            <div className="candidate-list">
              {filteredCandidates.map((student) => {
                const isShort = shortlisted.includes(student.name);
                return (
                  <div className="candidate-row" key={student.name}>
                    <span
                      className="avatar cursor-pointer"
                      onClick={() => setSelectedCandidate(student)}
                    >
                      {student.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <div
                      className="candidate-info cursor-pointer"
                      onClick={() => setSelectedCandidate(student)}
                    >
                      <strong>{student.name}</strong>
                      <small>
                        {student.program} · CGPA {student.cgpa || 8.4} · <b className="text-lime">{student.fit || 85}% match</b>
                      </small>
                    </div>
                    <div className="candidate-skills">
                      {student.skills.slice(0, 3).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                    <div className="action-buttons">
                      <button
                        className="icon-outline"
                        title="View Full Profile"
                        onClick={() => setSelectedCandidate(student)}
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        className={isShort ? "shortlisted" : "outline-button"}
                        onClick={() => toggleShortlist(student.name)}
                      >
                        {isShort ? "Shortlisted ✓" : "Shortlist"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="panel requirement-panel">
            <p className="eyebrow">Smart automation brief builder</p>
            <h2>Create & match instantly.</h2>
            <p className="quiet">
              Required skills are the weighted signal that powers autonomous candidate ranking and gap discovery.
            </p>
            <div className="quick-brief-box">
              <label>
                Role title
                <input defaultValue="Frontend & Ayush Health Informatics Intern" />
              </label>
              <label>
                Required competencies
                <input defaultValue="React, JavaScript, Ayush Health Informatics, Docker" />
              </label>
              <label>
                Target academic eligibility
                <input defaultValue="2026-2027 graduating batch · 7.0+ CGPA" />
              </label>
              <button
                className="primary-button full mt-12"
                onClick={() => setIsPostModalOpen(true)}
              >
                Open Full Brief Creator
              </button>
            </div>
          </article>
        </section>
      ) : (
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Application Management</p>
              <h2>Applicant Review Pipeline</h2>
            </div>
          </div>
          <div className="applicant-table">
            <div className="table-header">
              <span>Candidate</span>
              <span>Opportunity Role</span>
              <span>Match Score</span>
              <span>Applied Date</span>
              <span>Hiring Decision</span>
            </div>
            {applications.map((app) => (
              <div className="table-row" key={app.id}>
                <div className="applicant-cell">
                  <span className="avatar small">
                    {(app.studentName || "Aarav Patel").split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <strong>{app.studentName || "Aarav Patel"}</strong>
                    <small>{app.program || "B.Tech CSE"}</small>
                  </div>
                </div>
                <span>{app.role}</span>
                <span className="match-pill">{app.matchScore || 85}%</span>
                <span className="quiet">{app.appliedDate || "Recent"}</span>
                <div className="decision-actions">
                  {["Reviewing", "Shortlisted", "Selected"].map((status) => (
                    <button
                      key={status}
                      className={`status-chip-btn ${
                        (app.status || "").toLowerCase() === status.toLowerCase() ? "active" : ""
                      }`}
                      onClick={() => onUpdateApplicationStatus && onUpdateApplicationStatus(app.id, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modals */}
      <PostOpportunityModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onPost={handlePostOpportunity}
      />

      <CandidateDetailModal
        isOpen={Boolean(selectedCandidate)}
        onClose={() => setSelectedCandidate(null)}
        candidate={selectedCandidate}
        onShortlist={(name) => toggleShortlist(name)}
        isShortlisted={selectedCandidate ? shortlisted.includes(selectedCandidate.name) : false}
      />
    </div>
  );
}

function Stat({ label, value, note }) {
  return (
    <article className="stat-card">
      <small>{label}</small>
      <strong>{value}</strong>
      <span>{note}</span>
    </article>
  );
}
