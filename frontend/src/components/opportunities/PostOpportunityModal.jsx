import { useState } from "react";
import { Briefcase, Building, Check, Sparkles, X, UsersRound } from "lucide-react";
import { studentSeed } from "../../data/demo";

export default function PostOpportunityModal({ isOpen, onClose, onPost }) {
  const [role, setRole] = useState("Ayush Digital Health Intern");
  const [company, setCompany] = useState("Northstar Labs");
  const [type, setType] = useState("Internship");
  const [location, setLocation] = useState("Remote / Hybrid");
  const [stipend, setStipend] = useState("₹28,000 / month");
  const [skillsInput, setSkillsInput] = useState("React, JavaScript, Ayush Health Informatics");
  const [eligibility, setEligibility] = useState("2026-2027 batch · 7.0+ CGPA");
  const [deadline, setDeadline] = useState("14 days");
  const [description, setDescription] = useState(
    "Join our multidisciplinary engineering team to create next-generation healthcare platforms."
  );

  if (!isOpen) return null;

  // Real-time candidate matching estimate
  const currentSkills = skillsInput.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  const matchingCandidates = studentSeed.filter((std) => {
    const stdSkills = std.skills.map((s) => s.toLowerCase());
    return currentSkills.some((req) => stdSkills.includes(req));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOpp = {
      id: `opp_${Date.now()}`,
      company,
      initials: company[0].toUpperCase(),
      color: "sky",
      role,
      type,
      location,
      stipend,
      required: skillsInput.split(",").map((s) => s.trim()).filter(Boolean),
      eligibility,
      deadline,
      description,
    };
    onPost(newOpp);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Industry Recruitment Hub</p>
            <h2>Publish New Opportunity</h2>
          </div>
          <button className="icon-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body post-form">
          <div className="form-grid">
            <label>
              Role Title
              <input value={role} onChange={(e) => setRole(e.target.value)} required />
            </label>
            <label>
              Host Organization
              <input value={company} onChange={(e) => setCompany(e.target.value)} required />
            </label>

            <label>
              Opportunity Category
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Internship">Internship</option>
                <option value="Placement">Placement / Full-Time</option>
                <option value="Fellowship">Fellowship / Capstone</option>
                <option value="Project">Sponsored Project</option>
              </select>
            </label>
            <label>
              Location Mode
              <input value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>

            <label>
              Stipend / CTC
              <input value={stipend} onChange={(e) => setStipend(e.target.value)} />
            </label>
            <label>
              Application Deadline
              <input value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </label>

            <label className="full-width">
              Required Skills (comma separated)
              <input
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="e.g. React, Node.js, Docker, Ayush Health Informatics"
                required
              />
            </label>

            <label className="full-width">
              Eligibility Criteria
              <input value={eligibility} onChange={(e) => setEligibility(e.target.value)} />
            </label>

            <label className="full-width">
              Description & Expectations
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>

          <div className="candidate-match-indicator">
            <Sparkles size={18} />
            <div>
              <strong>Smart Matching Preview:</strong>
              <span>
                {" "}
                {matchingCandidates.length} candidate{matchingCandidates.length !== 1 ? "s" : ""} in the current cohort already meet core prerequisites for this brief.
              </span>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="outline-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              <Check size={16} /> Publish & Activate Candidate Matching
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
