/**
 * Smart Automation Layer: Skill Extraction
 * Extracts and normalizes technical, domain, and Ayush-informatics skills
 * from unstructured text (resumes, project overviews, course syllabi).
 */

export const SKILL_TAXONOMY = {
  // Frontend
  javascript: { canonical: "JavaScript", category: "Frontend" },
  js: { canonical: "JavaScript", category: "Frontend" },
  typescript: { canonical: "TypeScript", category: "Frontend" },
  ts: { canonical: "TypeScript", category: "Frontend" },
  react: { canonical: "React", category: "Frontend" },
  "react.js": { canonical: "React", category: "Frontend" },
  "reactjs": { canonical: "React", category: "Frontend" },
  vue: { canonical: "Vue.js", category: "Frontend" },
  "vue.js": { canonical: "Vue.js", category: "Frontend" },
  angular: { canonical: "Angular", category: "Frontend" },
  html: { canonical: "HTML5", category: "Frontend" },
  html5: { canonical: "HTML5", category: "Frontend" },
  css: { canonical: "CSS3", category: "Frontend" },
  css3: { canonical: "CSS3", category: "Frontend" },
  tailwind: { canonical: "Tailwind CSS", category: "Frontend" },
  "tailwind css": { canonical: "Tailwind CSS", category: "Frontend" },

  // Backend
  nodejs: { canonical: "Node.js", category: "Backend" },
  "node.js": { canonical: "Node.js", category: "Backend" },
  node: { canonical: "Node.js", category: "Backend" },
  express: { canonical: "Express.js", category: "Backend" },
  "express.js": { canonical: "Express.js", category: "Backend" },
  python: { canonical: "Python", category: "Backend" },
  django: { canonical: "Django", category: "Backend" },
  fastapi: { canonical: "FastAPI", category: "Backend" },
  flask: { canonical: "Flask", category: "Backend" },
  java: { canonical: "Java", category: "Backend" },
  "spring boot": { canonical: "Spring Boot", category: "Backend" },
  golang: { canonical: "Go", category: "Backend" },
  go: { canonical: "Go", category: "Backend" },
  rust: { canonical: "Rust", category: "Backend" },

  // Databases & Cloud
  mongodb: { canonical: "MongoDB", category: "Databases" },
  postgres: { canonical: "PostgreSQL", category: "Databases" },
  postgresql: { canonical: "PostgreSQL", category: "Databases" },
  mysql: { canonical: "MySQL", category: "Databases" },
  redis: { canonical: "Redis", category: "Databases" },
  docker: { canonical: "Docker", category: "DevOps & Cloud" },
  kubernetes: { canonical: "Kubernetes", category: "DevOps & Cloud" },
  k8s: { canonical: "Kubernetes", category: "DevOps & Cloud" },
  aws: { canonical: "AWS", category: "DevOps & Cloud" },
  gcp: { canonical: "Google Cloud", category: "DevOps & Cloud" },
  azure: { canonical: "Azure", category: "DevOps & Cloud" },
  git: { canonical: "Git", category: "DevOps & Cloud" },
  github: { canonical: "Git & GitHub", category: "DevOps & Cloud" },
  ci_cd: { canonical: "CI/CD", category: "DevOps & Cloud" },
  "ci/cd": { canonical: "CI/CD", category: "DevOps & Cloud" },

  // AI & Data Science
  "machine learning": { canonical: "Machine Learning", category: "AI & Data Science" },
  ml: { canonical: "Machine Learning", category: "AI & Data Science" },
  "deep learning": { canonical: "Deep Learning", category: "AI & Data Science" },
  nlp: { canonical: "Natural Language Processing", category: "AI & Data Science" },
  pytorch: { canonical: "PyTorch", category: "AI & Data Science" },
  tensorflow: { canonical: "TensorFlow", category: "AI & Data Science" },
  pandas: { canonical: "Pandas", category: "AI & Data Science" },
  numpy: { canonical: "NumPy", category: "AI & Data Science" },
  "data analysis": { canonical: "Data Analysis", category: "AI & Data Science" },

  // Ayush Health Informatics & Life Sciences
  "ayush health informatics": { canonical: "Ayush Health Informatics", category: "Ayush & Health Tech" },
  "ayush informatics": { canonical: "Ayush Health Informatics", category: "Ayush & Health Tech" },
  "health informatics": { canonical: "Health Informatics", category: "Ayush & Health Tech" },
  "herbal informatics": { canonical: "Herbal Informatics", category: "Ayush & Health Tech" },
  "clinical data management": { canonical: "Clinical Data Management", category: "Ayush & Health Tech" },
  pharmacovigilance: { canonical: "Pharmacovigilance", category: "Ayush & Health Tech" },
  bioinformatics: { canonical: "Bioinformatics", category: "Ayush & Health Tech" },
  biostatistics: { canonical: "Biostatistics", category: "Ayush & Health Tech" },
  "ayurvedic formulation analytics": { canonical: "Ayurvedic Formulation Analytics", category: "Ayush & Health Tech" },
  "medical iot": { canonical: "Medical IoT & Sensors", category: "Ayush & Health Tech" },
  telemedicine: { canonical: "Telemedicine Systems", category: "Ayush & Health Tech" },
};

/**
 * Extracts normalized skills from text with confidence estimation.
 * @param {string} text - Raw content from resume, project description, or portfolio.
 * @returns {Array<{ name: string, category: string, confidence: number, occurrences: number }>}
 */
export function extractSkillsFromText(text = "") {
  if (!text || typeof text !== "string") return [];

  const lower = text.toLowerCase();
  const matched = new Map();

  for (const [alias, meta] of Object.entries(SKILL_TAXONOMY)) {
    // Regex boundary to match standalone words or compound phrases
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?:^|[\\s,;:.()/\\[\\]-])${escaped}(?=[\\s,;:.()/\\[\\]-]|$)`, "gi");
    const count = (lower.match(regex) || []).length;

    if (count > 0) {
      const canonical = meta.canonical;
      if (!matched.has(canonical)) {
        // Estimate confidence based on frequency and context clues
        let confidence = 65;
        if (count >= 3) confidence += 15;
        else if (count === 2) confidence += 10;

        // Boost if context words appear near skill
        if (/lead|architect|advanced|proficient|expert|certified/i.test(text)) {
          confidence += 10;
        }

        matched.set(canonical, {
          name: canonical,
          category: meta.category,
          confidence: Math.min(95, confidence),
          occurrences: count,
        });
      } else {
        const existing = matched.get(canonical);
        existing.occurrences += count;
        existing.confidence = Math.min(95, existing.confidence + 5);
      }
    }
  }

  return Array.from(matched.values()).sort((a, b) => b.confidence - a.confidence);
}
