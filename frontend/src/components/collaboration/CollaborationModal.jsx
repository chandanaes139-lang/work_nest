import { useState } from "react";
import { Building2, Handshake, Plus, Sparkles, Users, X, Check } from "lucide-react";
import { collaborationSeed } from "../../data/demo";

export default function CollaborationModal({ isOpen, onClose, onPropose, onJoin }) {
  const [collaborations, setCollaborations] = useState(collaborationSeed);
  const [showProposeForm, setShowProposeForm] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Research Collaboration");
  const [partner, setPartner] = useState("Ministry of Ayush & Northstar Labs");
  const [description, setDescription] = useState("");
  const [joinedProjects, setJoinedProjects] = useState([]);

  if (!isOpen) return null;

  const handleProposeSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    const newCollab = {
      id: `collab_${Date.now()}`,
      title,
      type,
      partner,
      leadFaculty: "Prof. Sunita Rao",
      studentsCount: 1,
      status: "Proposals Open",
      description,
    };
    setCollaborations([newCollab, ...collaborations]);
    if (onPropose) onPropose(newCollab);
    setShowProposeForm(false);
    setTitle("");
    setDescription("");
  };

  const handleJoinClick = (id) => {
    setJoinedProjects((prev) => (prev.includes(id) ? prev : [...prev, id]));
    if (onJoin) onJoin(id);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Academia – Industry Collaboration Portal</p>
            <h2>Joint Research, Projects & Innovation Hub</h2>
          </div>
          <button className="icon-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="collab-actions-bar">
            <p className="quiet">
              Connecting universities, Ayush research centers, and industry tech partners for high-impact innovation.
            </p>
            <button
              className="primary-button"
              onClick={() => setShowProposeForm(!showProposeForm)}
            >
              <Plus size={16} /> {showProposeForm ? "View Active Projects" : "Propose Initiative"}
            </button>
          </div>

          {showProposeForm ? (
            <form onSubmit={handleProposeSubmit} className="collab-propose-form">
              <h3>Launch New Collaborative Initiative</h3>
              <div className="form-grid">
                <label className="full-width">
                  Project Title
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. AI-Driven Herbal Metabolomics & Clinical Safety Platform"
                    required
                  />
                </label>
                <label>
                  Collaboration Type
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Research Collaboration">Research Collaboration</option>
                    <option value="Industry Project">Industry Project</option>
                    <option value="National Digital Mission Capstone">National Digital Mission Capstone</option>
                    <option value="Faculty Development Program">Faculty Development Program</option>
                  </select>
                </label>
                <label>
                  Partner Organizations
                  <input
                    value={partner}
                    onChange={(e) => setPartner(e.target.value)}
                    placeholder="e.g. Nexus University, Ayush Research Council, Northstar Labs"
                  />
                </label>
                <label className="full-width">
                  Scope & Student Opportunity
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Detail research objectives, student internship quotas, and expected deliverables."
                    required
                  />
                </label>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="outline-button"
                  onClick={() => setShowProposeForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  <Handshake size={16} /> Publish Collaboration Call
                </button>
              </div>
            </form>
          ) : (
            <div className="collab-grid">
              {collaborations.map((collab) => {
                const isJoined = joinedProjects.includes(collab.id);
                return (
                  <div className="collab-card" key={collab.id}>
                    <div className="collab-badge">
                      <Handshake size={14} /> {collab.type}
                    </div>
                    <h3>{collab.title}</h3>
                    <p className="collab-partner">
                      <Building2 size={14} /> {collab.partner}
                    </p>
                    <p className="collab-desc">{collab.description}</p>
                    <div className="collab-foot">
                      <div className="collab-meta">
                        <Users size={14} />{" "}
                        <span>
                          {collab.studentsCount + (isJoined ? 1 : 0)} students enrolled
                        </span>
                      </div>
                      <button
                        className={isJoined ? "outline-button disabled" : "outline-button"}
                        onClick={() => handleJoinClick(collab.id)}
                        disabled={isJoined}
                      >
                        {isJoined ? (
                          <>
                            <Check size={14} /> Enrolled
                          </>
                        ) : (
                          "Join / Apply"
                        )}
                      </button>
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
