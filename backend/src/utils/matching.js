export function analyzeMatch(studentSkills, requiredSkills) {
  const normalized = new Map(studentSkills.map((skill) => [skill.name.toLowerCase(), skill.proficiency ?? 0]));
  const coveredSkills = requiredSkills.filter((skill) => (normalized.get(skill.toLowerCase()) ?? 0) >= 55);
  const missingSkills = requiredSkills.filter((skill) => !coveredSkills.includes(skill));
  const score = requiredSkills.length ? Math.round((coveredSkills.length / requiredSkills.length) * 100) : 0;
  return { score, coveredSkills, missingSkills, explanation: `${coveredSkills.length}/${requiredSkills.length} required skills covered. ${missingSkills.length ? `Develop ${missingSkills.join(" and ")} to strengthen this match.` : "You meet every listed skill requirement."}` };
}
