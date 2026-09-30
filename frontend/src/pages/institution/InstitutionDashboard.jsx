import { useState } from "react";
import { Building2, BriefcaseBusiness, TrendingUp, UsersRound, Download, Check, Mail, Filter } from "lucide-react";
import { studentSeed } from "../../data/demo";

export default function InstitutionDashboard() {
  const [selectedDept, setSelectedDept] = useState("all");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerCompany, setPartnerCompany] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [partnersCount, setPartnersCount] = useState(46);

  const departments = [
    { id: "all", name: "All Cohorts", students: 1248, readyPct: 68 },
    { id: "cse", name: "Computer Science", students: 480, readyPct: 76 },
    { id: "it", name: "Information Technology", students: 360, readyPct: 72 },
    { id: "ayush", name: "Ayush Health Informatics", students: 210, readyPct: 69 },
    { id: "ds", name: "Data Science & AI", students: 198, readyPct: 64 },
  ];

  const gapAnalytics = [
    { label: "Cloud & Deployment (Docker/AWS)", value: 74, priority: "High" },
    { label: "Ayush Digital Standards & ABDM", value: 68, priority: "High" },
    { label: "Data Engineering & Analytics", value: 61, priority: "Medium" },
    { label: "System Design & Microservices", value: 48, priority: "Medium" },
    { label: "Technical Communication", value: 31, priority: "Low" },
  ];

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!partnerCompany || !partnerEmail) return;
    setInviteSuccess(true);
    setPartnersCount((prev) => prev + 1);
    setTimeout(() => {
      setInviteSuccess(false);
      setIsInviteOpen(false);
      setPartnerEmail("");
      setPartnerCompany("");
    }, 1500);
  };

  const handleExport = () => {
    const reportText = `SkillBridge Institution Cohort Report - Nexus University
Total Active Students: 1,248
Placement Readiness Index: 68%
Top In-Demand Gaps:
- Cloud & Deployment (74% gap)
- Ayush Digital Standards (68% gap)
- Data Engineering (61% gap)
Generated: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SkillBridge_Cohort_Analytics_Report.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="content role-page">
      <section className="welcome">
        <div>
          <p className="eyebrow">Institution workspace / Nexus University & Ayush Research Institute</p>
          <h1>See readiness before placement season.</h1>
          <p className="subcopy">
            A shared real-time telemetry view of cohort skills, opportunity engagement, and industry demand.
          </p>
        </div>
        <div className="welcome-actions">
          <button className="outline-button" onClick={handleExport}>
            <Download size={16} /> Export report
          </button>
          <button className="primary-button" onClick={() => setIsInviteOpen(true)}>
            <Building2 size={16} /> Invite industry partner
          </button>
        </div>
      </section>

      <section className="stat-grid">
        <Stat icon={UsersRound} label="Active students" value="1,248" note="Across 5 specialized tracks" />
        <Stat icon={TrendingUp} label="Placement ready" value="68%" note="Up 7% from last semester" />
        <Stat icon={BriefcaseBusiness} label="Partner opportunities" value={partnersCount.toString()} note="14 new this month" />
      </section>

      <div className="department-filter-bar">
        <span>Department breakdown:</span>
        {departments.map((dept) => (
          <button
            key={dept.id}
            className={`dept-pill ${selectedDept === dept.id ? "active" : ""}`}
            onClick={() => setSelectedDept(dept.id)}
          >
            {dept.name} ({dept.readyPct}% ready)
          </button>
        ))}
      </div>

      <section className="analytics-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Skill gap analytics</p>
              <h2>Curriculum & Industry Alignment Gaps</h2>
            </div>
            <span className="count-badge">Semester VI & VIII</span>
          </div>
          <div className="gap-bars">
            {gapAnalytics.map(({ label, value, priority }) => (
              <div key={label}>
                <div className="gap-bar-label">
                  <span>{label}</span>
                  <span className={`priority-tag ${priority.toLowerCase()}`}>{priority} gap</span>
                </div>
                <b>{value}% cohort deficit</b>
                <i>
                  <em style={{ width: `${value}%` }} />
                </i>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <p className="eyebrow">Placement & Internship Pipeline</p>
          <h2>Cohort Status Distribution</h2>
          <div className="pipeline">
            <Pipeline label="Applications Submitted" value="382" color="lime" />
            <Pipeline label="Technical Reviewing" value="126" color="sky" />
            <Pipeline label="Shortlisted for Interviews" value="74" color="orange" />
            <Pipeline label="Offers Extended / Placed" value="31" color="ink" />
          </div>

          <div className="institution-callout mt-12">
            <small>Actionable Intervention</small>
            <p>
              Conducting a 3-day fast-track bootcamp on <strong>Docker & ABDM Health Informatics</strong> will elevate readiness for 180+ pre-final year students.
            </p>
          </div>
        </article>
      </section>

      {/* Invite Partner Modal */}
      {isInviteOpen && (
        <div className="modal-backdrop" onClick={() => setIsInviteOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="eyebrow">Industry Outreach</p>
                <h2>Invite Industry / Research Partner</h2>
              </div>
              <button className="icon-close" onClick={() => setIsInviteOpen(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSendInvite} className="modal-body">
              {inviteSuccess ? (
                <div className="invite-success">
                  <Check size={36} className="text-lime" />
                  <h3>Invitation Dispatched!</h3>
                  <p className="quiet">An institutional access link has been sent to {partnerEmail}.</p>
                </div>
              ) : (
                <>
                  <label>
                    Company / Organization Name
                    <input
                      value={partnerCompany}
                      onChange={(e) => setPartnerCompany(e.target.value)}
                      placeholder="e.g. AyushTech Health Solutions"
                      required
                    />
                  </label>
                  <label>
                    HR / Technical Lead Email
                    <input
                      type="email"
                      value={partnerEmail}
                      onChange={(e) => setPartnerEmail(e.target.value)}
                      placeholder="partner@organization.com"
                      required
                    />
                  </label>
                  <label>
                    Collaboration Scope
                    <select defaultValue="internship">
                      <option value="internship">Campus Internship Drives</option>
                      <option value="placement">Full-Time Placement Drives</option>
                      <option value="research">Sponsored R&D & Faculty Mentorship</option>
                    </select>
                  </label>
                  <div className="modal-actions">
                    <button type="button" className="outline-button" onClick={() => setIsInviteOpen(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="primary-button">
                      <Mail size={16} /> Send Official Partner Invite
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value, note }) {
  return (
    <article className="stat-card">
      <Icon size={20} />
      <small>{label}</small>
      <strong>{value}</strong>
      <span>{note}</span>
    </article>
  );
}

function Pipeline({ label, value, color }) {
  return (
    <div className="pipeline-row">
      <i className={color} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
