/**
 * Smart Automation Layer: Explainable Matching Engine
 * Compares candidate skills, projects, certifications, and academic eligibility
 * against industry opportunity briefs.
 */

/**
 * Evaluates the match between student skills and required opportunity skills.
 * @param {Array<{ name: string, proficiency?: number, score?: number }>} studentSkills
 * @param {Array<string | { name: string, minimumProficiency?: number, required?: boolean }>} requiredSkills
 * @param {object} [options]
 * @param {number} [options.studentCgpa]
 * @param {number} [options.minimumCgpa]
 * @param {Array<number>} [options.graduationYears]
 * @param {number} [options.studentGradYear]
 * @returns {object} explainable match analysis
 */
export function analyzeMatch(studentSkills = [], requiredSkills = [], options = {}) {
  const normalizedStudent = new Map();
  studentSkills.forEach((skill) => {
    const val = skill.proficiency ?? skill.score ?? 0;
    normalizedStudent.set(skill.name.toLowerCase().trim(), val);
  });

  // Standardize required skills input
  const requirements = requiredSkills.map((r) => {
    if (typeof r === "string") {
      return { name: r.trim(), min: 55, isRequired: true };
    }
    return {
      name: r.name?.trim() || "",
      min: r.minimumProficiency ?? 55,
      isRequired: r.required !== false,
    };
  }).filter((r) => Boolean(r.name));

  if (requirements.length === 0) {
    return {
      score: 100,
      fitLevel: "Direct Fit",
      coveredSkills: [],
      missingSkills: [],
      eligible: true,
      explanation: "No specific skill prerequisites required for this role.",
    };
  }

  const coveredSkills = [];
  const missingSkills = [];

  for (const req of requirements) {
    const studentScore = normalizedStudent.get(req.name.toLowerCase()) ?? 0;
    if (studentScore >= req.min) {
      coveredSkills.push(req.name);
    } else {
      missingSkills.push(req.name);
    }
  }

  // Base score: percentage of required skills covered
  const rawScore = requirements.length ? Math.round((coveredSkills.length / requirements.length) * 100) : 0;
  const score = Math.max(0, Math.min(100, rawScore));

  // Check eligibility criteria if provided
  let eligible = true;
  const eligibilityNotes = [];

  if (options.minimumCgpa && options.studentCgpa) {
    if (options.studentCgpa < options.minimumCgpa) {
      eligible = false;
      eligibilityNotes.push(`CGPA ${options.studentCgpa} is below minimum requirement (${options.minimumCgpa})`);
    }
  }

  if (options.graduationYears?.length && options.studentGradYear) {
    if (!options.graduationYears.includes(options.studentGradYear)) {
      eligible = false;
      eligibilityNotes.push(`Graduation year ${options.studentGradYear} does not match targeted batches (${options.graduationYears.join(", ")})`);
    }
  }

  let fitLevel = "Growth opportunity";
  if (score >= 80) fitLevel = "Strong match";
  else if (score >= 50) fitLevel = "Moderate match";

  let explanation = `${coveredSkills.length}/${requirements.length} required skills covered.`;
  if (missingSkills.length > 0) {
    explanation += ` Missing: ${missingSkills.join(", ")}. Complete targeted learning to unlock direct interview recommendation.`;
  } else {
    explanation += ` Outstanding alignment. You meet all primary competencies required by the host organization.`;
  }

  if (!eligible && eligibilityNotes.length > 0) {
    explanation += ` (Note: ${eligibilityNotes.join("; ")})`;
  }

  return {
    score,
    fitLevel,
    coveredSkills,
    missingSkills,
    eligible,
    eligibilityNotes,
    explanation,
  };
}

/**
 * Ranks candidates for an industry opportunity.
 */
export function rankCandidates(candidates = [], opportunity = {}) {
  const required = opportunity.requiredSkills?.map((s) => typeof s === "string" ? s : s.name) || [];
  return candidates.map((candidate) => {
    const candidateSkills = Array.isArray(candidate.skills)
      ? candidate.skills.map((s) => typeof s === "string" ? { name: s, proficiency: 75 } : s)
      : [];

    const match = analyzeMatch(candidateSkills, required, {
      studentCgpa: candidate.cgpa,
      minimumCgpa: opportunity.eligibility?.minimumCgpa,
      studentGradYear: candidate.graduationYear,
      graduationYears: opportunity.eligibility?.graduationYears,
    });

    return {
      ...candidate,
      matchScore: match.score,
      fitLevel: match.fitLevel,
      coveredSkills: match.coveredSkills,
      missingSkills: match.missingSkills,
      explanation: match.explanation,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
