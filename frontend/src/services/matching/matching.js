export function analyzeMatch(skills, requiredSkills) {
  const scoreBySkill = new Map(skills.map((skill) => [skill.name.toLowerCase(), skill.score]));
  const coveredSkills = requiredSkills.filter((skill) => (scoreBySkill.get(skill.toLowerCase()) ?? 0) >= 55);
  const missingSkills = requiredSkills.filter((skill) => !coveredSkills.includes(skill));
  const score = requiredSkills.length ? Math.round((coveredSkills.length / requiredSkills.length) * 100) : 0;
  return { score, coveredSkills, missingSkills, explanation: `${coveredSkills.length}/${requiredSkills.length} required skills currently covered.` };
}
