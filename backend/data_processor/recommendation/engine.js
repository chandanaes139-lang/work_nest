/**
 * Smart Automation Layer: Learning Recommendations Engine
 * Generates tailored, role-aware learning milestones and courses
 * to close detected skill gaps.
 */

// Curated resource repository for bridging identified gaps
const LEARNING_RESOURCE_CATALOG = {
  Docker: {
    title: "Docker Containerization & Multi-stage Builds",
    provider: "SkillBridge FastTrack / Coursera",
    estimatedHours: 4,
    type: "Course & Lab",
    projectIdea: "Containerize a full-stack Node.js + MongoDB microservice with Docker Compose.",
  },
  AWS: {
    title: "AWS Cloud Practitioner & Serverless Architecture",
    provider: "AWS Skill Builder / NPTEL",
    estimatedHours: 8,
    type: "Certification Prep",
    projectIdea: "Deploy an S3 + Lambda serverless API with CloudWatch monitoring.",
  },
  Kubernetes: {
    title: "Kubernetes Orchestration & Service Deployment",
    provider: "Linux Foundation / edX",
    estimatedHours: 10,
    type: "Hands-on Lab",
    projectIdea: "Deploy a resilient 3-replica cluster with ingress routing and secrets management.",
  },
  "Ayush Health Informatics": {
    title: "Ayush Digital Health Standards & EHR Integration",
    provider: "Ministry of Ayush / SWAYAM Portal",
    estimatedHours: 6,
    type: "Accredited Program",
    projectIdea: "Build an Ayush-compliant electronic health records API following ABDM guidelines.",
  },
  "Herbal Informatics": {
    title: "Herbal Database Systems & Phytochemical Analysis",
    provider: "Ayush Research Council / IIT Madras",
    estimatedHours: 8,
    type: "Research Track",
    projectIdea: "Index herbal formulations and active bio-compounds with search and verification.",
  },
  "Clinical Data Management": {
    title: "Good Clinical Practice & Ayush Trial Analytics",
    provider: "CDAC / NPTEL",
    estimatedHours: 7,
    type: "Industry Specialization",
    projectIdea: "Create a validated clinical trial monitoring dashboard for herbal formulation trials.",
  },
  Python: {
    title: "Python for Data Pipelines & API Automation",
    provider: "freeCodeCamp / Kaggle",
    estimatedHours: 5,
    type: "Course",
    projectIdea: "Build an automated ETL pipeline that cleans and transforms CSV sensor data.",
  },
  "Machine Learning": {
    title: "Applied Machine Learning & Predictive Modeling",
    provider: "Stanford Online / NPTEL",
    estimatedHours: 12,
    type: "Course & Capstone",
    projectIdea: "Train a disease symptom classifier using open clinical and lifestyle datasets.",
  },
  MongoDB: {
    title: "MongoDB Aggregation Framework & Indexing",
    provider: "MongoDB University",
    estimatedHours: 3,
    type: "Specialization",
    projectIdea: "Design multi-tenant schemas with compound indices and facet aggregations.",
  },
  "Node.js": {
    title: "Production Node.js, Express & Async Patterns",
    provider: "OpenJS Foundation",
    estimatedHours: 5,
    type: "Hands-on Workshop",
    projectIdea: "Develop a secure RESTful API with JWT authentication and rate limiting.",
  },
  React: {
    title: "Modern React with Hooks, State & Performance",
    provider: "React Dev Community",
    estimatedHours: 6,
    type: "Interactive Course",
    projectIdea: "Build a responsive candidate-job matching dashboard with optimistic UI updates.",
  },
};

/**
 * Generates personalized learning recommendations based on gaps.
 * @param {Array<{ name: string, score?: number, proficiency?: number }>} studentSkills
 * @param {Array<string>} targetRequirements
 * @returns {Array<object>} Recommended learning items
 */
export function generateLearningRecommendations(studentSkills = [], targetRequirements = []) {
  const studentMap = new Map();
  studentSkills.forEach((s) => {
    const val = s.score ?? s.proficiency ?? 0;
    studentMap.set(s.name.toLowerCase(), val);
  });

  // Find explicit gaps in target requirements
  const gaps = targetRequirements.filter((req) => {
    const score = studentMap.get(req.toLowerCase()) ?? 0;
    return score < 55;
  });

  // If no target requirements provided, find any student skill below 55
  const weakSkills = gaps.length > 0 
    ? gaps 
    : studentSkills.filter((s) => (s.score ?? s.proficiency ?? 0) < 55).map((s) => s.name);

  const recommendations = [];

  for (const skillName of weakSkills) {
    const currentScore = studentMap.get(skillName.toLowerCase()) ?? 0;
    const catalogItem = LEARNING_RESOURCE_CATALOG[skillName] || {
      title: `${skillName} Practical Mastery & Real-World Projects`,
      provider: "SkillBridge Learning Hub",
      estimatedHours: 5,
      type: "Guided Path",
      projectIdea: `Build a demonstration project featuring ${skillName} for your portfolio.`,
    };

    recommendations.push({
      skill: skillName,
      currentProficiency: currentScore,
      targetProficiency: 80,
      phase: recommendations.length === 0 ? "NOW" : recommendations.length === 1 ? "NEXT" : "THEN",
      priority: currentScore < 30 ? "High" : "Medium",
      title: catalogItem.title,
      provider: catalogItem.provider,
      estimatedHours: catalogItem.estimatedHours,
      type: catalogItem.type,
      projectIdea: catalogItem.projectIdea,
      rationale: currentScore === 0 
        ? `${skillName} is required by top opportunities but not yet found in your evidence.`
        : `Your current confidence in ${skillName} is ${currentScore}%. Reaching 80% unlocks 40% more matches.`,
    });
  }

  return recommendations;
}
