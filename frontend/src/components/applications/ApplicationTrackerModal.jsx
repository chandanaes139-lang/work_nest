import { CheckCircle2, Clock, Sparkles, X, Building, ArrowUpRight } from "lucide-react";

const STAGES = ["Submitted", "Reviewing", "Shortlisted", "Selected"];

export default function ApplicationTrackerModal({ isOpen, onClose, applications }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Student Applications & Status Tracker</p>
            <h2>My Opportunity Applications ({applications.length})</h2>
          </div>
          <button className="icon-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {applications.length === 0 ? (
            <p className="quiet text-center py-6">You haven't applied to any opportunities yet.</p>
          ) : (
            <div className="app-tracker-list">
              {applications.map((app) => {
                const currentStageIdx = STAGES.findIndex(
                  (s) => s.toLowerCase() === (app.status || "").toLowerCase()
                );
                const activeIdx = currentStageIdx >= 0 ? currentStageIdx : 0;

                return (
                  <div className="app-tracker-card" key={app.id}>
                    <div className="app-card-top">
                      <div>
                        <h3>{app.role}</h3>
                        <p className="app-org">
                          <Building size={14} /> {app.company} · {app.type || "Opportunity"}
                        </p>
                      </div>
                      <div className="app-status-badge">
                        <span className={`status-pill ${app.status.toLowerCase()}`}>
                          {app.status}
                        </span>
                        <b className="match-tag">{app.matchScore || 85}% Match</b>
                      </div>
                    </div>

                    {/* Progress Pipeline */}
                    <div className="pipeline-stepper">
                      {STAGES.map((stage, idx) => {
                        const isDone = idx <= activeIdx;
                        const isCurrent = idx === activeIdx;
                        return (
                          <div
                            className={`stepper-node ${isDone ? "done" : ""} ${
                              isCurrent ? "current" : ""
                            }`}
                            key={stage}
                          >
                            <span className="node-dot">
                              {isDone ? <CheckCircle2 size={13} /> : idx + 1}
                            </span>
                            <small className="node-label">{stage}</small>
                          </div>
                        );
                      })}
                    </div>

                    <div className="app-card-foot">
                      <div className="app-skills-covered">
                        <small>Covered Skills:</small>
                        <div className="chips">
                          {(app.covered || []).map((s) => (
                            <span className="skill-chip covered" key={s}>
                              {s}
                            </span>
                          ))}
                          {(app.missing || []).map((s) => (
                            <span className="skill-chip missing" key={s}>
                              {s} (Gap)
                            </span>
                          ))}
                        </div>
                      </div>
                      <small className="quiet">Applied on {app.appliedDate || "Recent"}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
