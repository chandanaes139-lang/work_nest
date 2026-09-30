/**
 * Smart Automation Layer: Resume & Portfolio Parser
 * Parses plain text / markdown / exported text into structured candidate records.
 */

import { extractSkillsFromText } from "../skill_extraction/extractor.js";

/**
 * Parses raw resume text into structured student fields.
 * @param {string} resumeText
 * @returns {object} structured candidate data
 */
export function parseResume(resumeText = "") {
  if (!resumeText || typeof resumeText !== "string") {
    return {
      name: "",
      email: "",
      phone: "",
      education: [],
      skills: [],
      projects: [],
      rawText: "",
    };
  }

  // 1. Extract contact information
  const emailMatch = resumeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = resumeText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);

  // 2. Extract potential candidate name (first non-empty line or explicit Name: pattern)
  let name = "";
  const namePatternMatch = resumeText.match(/(?:Name|Full Name)\s*:\s*([^\n\r]+)/i);
  if (namePatternMatch) {
    name = namePatternMatch[1].trim();
  } else {
    const lines = resumeText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length > 0 && lines[0].length < 40 && !/@|http|github/i.test(lines[0])) {
      name = lines[0];
    }
  }

  // 3. Extract Education signals
  const education = [];
  const degreePatterns = [
    /B\.?Tech(?:\s+in\s+([A-Za-z\s]+))?/i,
    /B\.?E\.?(?:\s+in\s+([A-Za-z\s]+))?/i,
    /BCA/i,
    /MCA/i,
    /M\.?Tech/i,
    /B\.?Sc(?:\s+in\s+([A-Za-z\s]+))?/i,
    /BAMS(?:\s+Ayurveda)?/i,
    /BHMS(?:\s+Homeopathy)?/i,
    /BNYS(?:\s+Naturopathy)?/i,
    /B\.?Pharm/i,
  ];

  for (const pattern of degreePatterns) {
    const match = resumeText.match(pattern);
    if (match) {
      education.push({
        degree: match[0].trim(),
        discipline: match[1]?.trim() || "Computer Science & Engineering",
      });
    }
  }

  // 4. Extract CGPA / Percentage
  const cgpaMatch = resumeText.match(/(?:CGPA|GPA|Score)\s*[:=]?\s*([0-9]\.[0-9]{1,2})/i);
  const cgpa = cgpaMatch ? parseFloat(cgpaMatch[1]) : null;

  // 5. Extract Projects
  const projects = [];
  const projectRegex = /(?:Project|Projects)[\s\S]*?(?:Certifications|Education|Experience|Skills|$)/i;
  const projectBlock = resumeText.match(projectRegex);
  if (projectBlock) {
    const lines = projectBlock[0].split(/\r?\n/).filter((l) => l.trim().startsWith("-") || l.trim().startsWith("•"));
    for (const line of lines.slice(0, 4)) {
      const cleanLine = line.replace(/^[-•*]\s*/, "").trim();
      if (cleanLine.length > 10) {
        projects.push({
          title: cleanLine.split(/[:–-]/)[0]?.trim() || "Technical Project",
          description: cleanLine,
          skills: extractSkillsFromText(cleanLine).map((s) => s.name),
        });
      }
    }
  }

  // 6. Extract Skills through Smart Automation Extractor
  const extractedSkills = extractSkillsFromText(resumeText);

  return {
    name: name || "Prospective Candidate",
    email: emailMatch ? emailMatch[0] : "",
    phone: phoneMatch ? phoneMatch[0] : "",
    cgpa,
    education: education.length > 0 ? education : [{ degree: "B.Tech", discipline: "Computer Science & Engineering" }],
    skills: extractedSkills,
    projects,
    summary: `${extractedSkills.length} skills identified with average confidence ${
      extractedSkills.length ? Math.round(extractedSkills.reduce((acc, s) => acc + s.confidence, 0) / extractedSkills.length) : 0
    }%.`,
  };
}
