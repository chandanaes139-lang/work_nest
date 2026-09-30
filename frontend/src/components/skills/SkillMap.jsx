export default function SkillMap({ skills, onImprove }) {
  return <div className="skill-list">{skills.map((skill) => <button className="skill-row" key={skill.name} onClick={() => onImprove(skill.name)} title={`Increase ${skill.name} confidence`}><span className="skill-name"><i className="skill-dot" />{skill.name}</span><span className="skill-level"><span style={{ width: `${skill.score}%` }} /></span><span className="skill-percent">{skill.score}%</span></button>)}</div>;
}
