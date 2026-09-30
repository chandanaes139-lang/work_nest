import { ArrowRight, MapPin } from "lucide-react";

export default function OpportunityCard({ opportunity, match, onApply }) {
  return <article className="opportunity-card"><div className="company-row"><span className={`company-logo ${opportunity.color}`}>{opportunity.initials}</span><span><strong>{opportunity.company}</strong><small>Verified industry partner</small></span><span className="match-pill">{match.score}% match</span></div><h3>{opportunity.role}</h3><p><MapPin size={12} /> {opportunity.location} · {opportunity.type}</p><div className="tags">{opportunity.required.map((skill) => <span className={`tag ${match.missingSkills.includes(skill) ? "gap" : ""}`} key={skill}>{skill}{match.missingSkills.includes(skill) ? " +" : ""}</span>)}</div><div className="card-footer"><small>Closes in {opportunity.deadline}</small><button onClick={() => onApply(opportunity)} aria-label={`Apply for ${opportunity.role}`}>View role <ArrowRight size={14} /></button></div></article>;
}
