import { ArrowRight, Check, MapPin } from "lucide-react";

export default function OpportunityCard({ opportunity, match, onApply, applied }) {
  return (
    <article className="opportunity-card">
      <div className="company-row">
        <span className={`company-logo ${opportunity.color || "lavender"}`}>
          {opportunity.initials || opportunity.company[0]}
        </span>
        <span>
          <strong>{opportunity.company}</strong>
          <small>Verified Partner</small>
        </span>
        <span className="match-pill">{match.score}% match</span>
      </div>

      <h3>{opportunity.role}</h3>
      <p>
        <MapPin size={12} /> {opportunity.location} · {opportunity.type}{" "}
        {opportunity.stipend ? `· ${opportunity.stipend}` : ""}
      </p>

      <div className="tags">
        {opportunity.required.map((skill) => {
          const isMissing = match.missingSkills.includes(skill);
          return (
            <span
              className={`tag ${isMissing ? "gap" : "covered"}`}
              key={skill}
              title={isMissing ? "Identified Skill Gap" : "Verified Skill"}
            >
              {skill}
              {isMissing ? " (Gap)" : " ✓"}
            </span>
          );
        })}
      </div>

      <div className="card-footer">
        <small>Closes in {opportunity.deadline}</small>
        <button
          className={applied ? "applied-button" : ""}
          onClick={() => !applied && onApply(opportunity)}
          aria-label={applied ? `Applied for ${opportunity.role}` : `Apply for ${opportunity.role}`}
          disabled={applied}
        >
          {applied ? (
            <>
              Applied <Check size={14} />
            </>
          ) : (
            <>
              Apply & Match <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>
    </article>
  );
}
