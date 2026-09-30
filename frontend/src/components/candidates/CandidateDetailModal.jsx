import { Award, CheckCircle2, GraduationCap, Sparkles, User, X, Briefcase, AlertCircle } from "lucide-react";

export default function CandidateDetailModal({ isOpen, onClose, candidate, onShortlist, isShortlisted }) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="candidate-header-profile">
            <span className="avatar large">{candidate.name.split(" ").map((n) => n[0]).join("")}</span>
            <div>
              <p className="eyebrow">Candidate Profile & Match Analysis</p>
              <h2>{candidate.name}</h2>
              <p className="subcopy">
                <GraduationCap size={15} /> {candidate.program} · CGPA {candidate.cgpa || 8.4} · Batch {candidate.graduationYear || 2026}
              </p>
            </div>
          </div>
          <button className="icon-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="candidate-metrics-row">
            <div className="metric-box">
              <small>Match Score</small>
              <strong>{candidate.fit || candidate.readiness || 85}%</strong>
              <span>Role Alignment</span>
            </div>
            <div className="metric-box">
              <small>Industry Readiness</small>
              <strong>{candidate.readiness || 78}%</strong>
              <span>Verified Signals</span>
            </div>
            <div className="metric-box">
              <small>CGPA Merit</small>
              <strong>{candidate.cgpa || 8.4}</strong>
              <span>Academic Index</span>
            </div>
          </div>

          <div className="competencies-section">
            <h4>
              <CheckCircle2 size={16} className="text-lime" /> Covered Competencies
            </h4>
            <div className="chips">
              {(candidate.skills || []).map((skill) => {
                const name = typeof skill === "string" ? skill : skill.name;
                return (
                  <span className="skill-chip covered" key={name}>
                    {name}
                  </span>
                );
              })}
            </div>
          </div>

          {candidate.gaps && candidate.gaps.length > 0 && (
            <div className="competencies-section">
              <h4>
                <AlertCircle size={16} className="text-orange" /> Identified Skill Gaps
              </h4>
              <div className="chips">
                {candidate.gaps.map((gap) => (
                  <span className="skill-chip missing" key={gap}>
                    {gap}
                  </span>
                ))}
              </div>
              <small className="quiet">
                Student is currently enrolled in fast-track pathways to bridge these competencies.
              </small>
            </div>
          )}

          <div className="modal-actions">
            <button className="outline-button" onClick={onClose}>
              Close
            </button>
            <button
              className={isShortlisted ? "primary-button shortlisted-btn" : "primary-button"}
              onClick={() => onShortlist(candidate.name)}
            >
              <Sparkles size={16} />
              {isShortlisted ? "Remove from Shortlist" : "Shortlist for Interview"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
