import { useState, useMemo } from "react";
import { ArrowRight, CheckCircle2, Plus, Sparkles, FileText, ClipboardList, Handshake, Filter } from "lucide-react";
import SkillMap from "../../components/skills/SkillMap";
import OpportunityCard from "../../components/opportunities/OpportunityCard";
import AssessmentModal from "../../components/assessments/AssessmentModal";
import ResumeExtractorModal from "../../components/profile/ResumeExtractorModal";
import ApplicationTrackerModal from "../../components/applications/ApplicationTrackerModal";
import CollaborationModal from "../../components/collaboration/CollaborationModal";
import { analyzeMatch } from "../../services/matching/matching";

export default function StudentDashboard({
  skills,
  opportunities,
  applications = [],
  onImprove,
  onApply,
  onImportSkills,
  onUpdateSkillScore,
}) {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isCollabOpen, setIsCollabOpen] = useState(false);
  const [oppFilter, setOppFilter] = useState("all");

  const gaps = skills.filter((skill) => skill.score < 55);
  const coveredCount = skills.filter((skill) => skill.score >= 55).length;
  const readiness = Math.min(
    95,
    Math.round(48 + (coveredCount / (skills.length || 1)) * 36)
  );

  const filteredOpportunities = useMemo(() => {
    if (oppFilter === "all") return opportunities;
    return opportunities.filter(
      (o) => o.type.toLowerCase() === oppFilter.toLowerCase()
    );
  }, [opportunities, oppFilter]);

  const matches = useMemo(
    () =>
      opportunities.map((item) => [
        item.id,
        analyzeMatch(skills, item.required),
      ]),
    [skills, opportunities]
  );

  const handleAssessmentComplete = (skillName, newScore) => {
    if (onUpdateSkillScore) {
      onUpdateSkillScore(skillName, newScore);
    } else {
      onImprove(skillName);
    }
  };

  return (
    <div className="content" id="top">
      <section className="welcome">
        <div>
          <p className="eyebrow">Student workspace / Ministry of Ayush & Tech Track</p>
          <h1>Good morning, Aarav.</h1>
          <p className="subcopy">
            Your skill map is connected to live industry and institutional opportunities. Here is your readiness snapshot.
          </p>
        </div>
        <div className="welcome-actions">
          <button
            className="secondary-button"
            onClick={() => setIsTrackerOpen(true)}
          >
            <ClipboardList size={16} /> Applications ({applications.length})
          </button>
          <button
            className="primary-button"
            onClick={() => setIsAssessmentOpen(true)}
          >
            <Plus size={16} /> Take skill assessment
          </button>
        </div>
      </section>

      <section className="readiness-panel">
        <div className="readiness-copy">
          <p className="eyebrow">Industry readiness index</p>
          <h2>
            {readiness}
            <small>/100</small>
          </h2>
          <p>
            {gaps.length
              ? `${gaps.length} high-impact competency gaps identified. Resolving them will unlock direct recommendations.`
              : "All core role competencies covered. Build collaborative capstone evidence next."}
          </p>
          <a href="#skill-map">
            View full skill analysis <ArrowRight size={14} />
          </a>
        </div>
        <div className="readiness-orbit">
          <div>
            {readiness}
            <small>READY</small>
          </div>
        </div>
        <div className="readiness-breakdown">
          <Metric label="Profile strength" value={88} />
          <Metric
            label="Skill coverage"
            value={Math.round((coveredCount / skills.length) * 100)}
          />
          <Metric label="Verified signals" value={68} />
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="panel" id="skill-map">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Skill intelligence</p>
              <h2>Your skill map</h2>
            </div>
            <div className="panel-action-group">
              <button
                className="text-button"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <FileText size={14} /> Extract from resume <ArrowRight size={14} />
              </button>
            </div>
          </div>
          <p className="quiet">
            Click any skill to log new practice evidence or run automated verification.
          </p>
          <SkillMap skills={skills} onImprove={onImprove} />

          <div className="gap-callout">
            <Sparkles size={20} />
            <div>
              <strong>
                {gaps.length} high-impact gap{gaps.length !== 1 ? "s" : ""} found
              </strong>
              <p>
                {gaps.map((skill) => skill.name).join(" and ")} appear as core requirements in your target roles.
              </p>
            </div>
            <a href="#learning-path">
              Explore path <ArrowRight size={14} />
            </a>
          </div>
        </article>

        <article className="panel momentum">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Learning momentum</p>
              <h2>Active Progress</h2>
            </div>
            <span className="metric-up">+3</span>
          </div>
          <div className="momentum-number">
            <strong>5</strong>
            <span>
              competency
              <br />
              milestones
            </span>
          </div>
          <div className="week-chart">
            {[28, 52, 40, 83, 46, 68, 75].map((height, index) => (
              <span
                className={index === 5 ? "today" : ""}
                style={{ height: `${height}%` }}
                key={index}
              />
            ))}
          </div>
          <div className="days">
            {"MTWTFSS".split("").map((day, index) => (
              <span
                className={index === 5 ? "today-label" : ""}
                key={`${day}${index}`}
              >
                {day}
              </span>
            ))}
          </div>
          <div
            className="next-action cursor-pointer"
            onClick={() => setIsAssessmentOpen(true)}
          >
            <CheckCircle2 size={19} />
            <div>
              <small>Next recommended action</small>
              <strong>Complete Docker & Cloud foundations assessment</strong>
            </div>
            <ArrowRight size={17} />
          </div>
          <button
            className="outline-button full mt-12"
            onClick={() => setIsCollabOpen(true)}
          >
            <Handshake size={15} /> Academia-Industry Joint Hub
          </button>
        </article>
      </section>

      <section className="opportunity-section" id="opportunities">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Curated for you</p>
            <h2>Opportunities with Explainable Skill Alignment</h2>
            <p className="quiet">
              Every card transparently displays covered competencies and exact skill gaps.
            </p>
          </div>
          <div className="filter-pill-group">
            {["all", "internship", "placement", "project"].map((type) => (
              <button
                key={type}
                className={`filter-pill ${oppFilter === type ? "active" : ""}`}
                onClick={() => setOppFilter(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="opportunity-grid">
          {filteredOpportunities.map((opportunity) => {
            const matchData = matches.find(([id]) => id === opportunity.id);
            const matchObj = matchData ? matchData[1] : { score: 60, coveredSkills: [], missingSkills: [] };
            const isApplied = applications.some((a) => a.opportunityId === opportunity.id);

            return (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                match={matchObj}
                onApply={(opp) => onApply(opp, matchObj)}
                applied={isApplied}
              />
            );
          })}
        </div>
      </section>

      <section className="learning-section" id="learning-path">
        <div>
          <p className="eyebrow">Targeted learning recommendations</p>
          <h2>Close the gaps that matter most.</h2>
          <p className="quiet">
            Personalized, role-aware learning milestones generated by the Smart Automation Engine.
          </p>
        </div>
        <div className="learning-steps">
          <Step
            phase="NOW"
            title="Docker Containerization & Multi-stage Builds"
            detail="4 hours · SkillBridge FastTrack"
            active
            onAction={() => setIsAssessmentOpen(true)}
            actionLabel="Take Assessment"
          />
          <Step
            phase="NEXT"
            title="AWS Cloud Practitioner & Serverless Architecture"
            detail="8 hours · NPTEL / AWS"
            onAction={() => onImprove("AWS")}
            actionLabel="Add Practice Proof"
          />
          <Step
            phase="THEN"
            title="Ayush EHR Standards & ABDM FHIR Connector"
            detail="Capstone Project · National Ayush Hub"
            onAction={() => setIsCollabOpen(true)}
            actionLabel="View Capstone"
          />
        </div>
      </section>

      {/* Modals */}
      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onComplete={handleAssessmentComplete}
      />

      <ResumeExtractorModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onImportSkills={onImportSkills}
      />

      <ApplicationTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        applications={applications}
      />

      <CollaborationModal
        isOpen={isCollabOpen}
        onClose={() => setIsCollabOpen(false)}
      />
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}%</strong>
      <i>
        <b style={{ width: `${value}%` }} />
      </i>
    </div>
  );
}

function Step({ phase, title, detail, active, onAction, actionLabel }) {
  return (
    <div className={`learning-step ${active ? "active" : ""}`}>
      <small>{phase}</small>
      <strong>{title}</strong>
      <span>{detail}</span>
      {onAction && (
        <button className="step-action-btn" onClick={onAction}>
          {actionLabel} <ArrowRight size={13} />
        </button>
      )}
    </div>
  );
}
