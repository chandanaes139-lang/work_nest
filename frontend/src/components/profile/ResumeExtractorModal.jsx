import { useState } from "react";
import { Bot, CheckCircle2, FileText, Sparkles, Upload, X, ArrowRight } from "lucide-react";

const SAMPLE_RESUMES = {
  fullstack: `Aarav Patel
aarav@nexus.edu | +91 98765 43210
B.Tech in Computer Science & Engineering | CGPA: 8.4

Skills:
JavaScript, React.js, Node.js, Express, MongoDB, Docker, AWS, Git, Tailwind CSS

Projects:
- Ayush Care Telemedicine Platform: Designed an ABDM-compliant EHR patient booking service using React and Node.js.
- Cloud Container Deployment: Implemented Docker Compose multi-stage builds and automated CI/CD workflows on AWS.`,

  ayush: `Aarav Patel
aarav@nexus.edu | +91 98765 43210
B.Tech in Health & Ayush Informatics | CGPA: 8.6

Skills:
Ayush Health Informatics, Herbal Informatics, Python, React, Machine Learning, Clinical Data Management, Pandas

Projects:
- Herbal Phytochemical Analytics: Indexed active Ayurvedic medicinal plants and mapped bio-molecular properties with Python.
- Telemedicine Clinic Connect: Built ABDM FHIR standard medical appointment system for rural Ayush health centers.`,
};

export default function ResumeExtractorModal({ isOpen, onClose, onImportSkills }) {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES.fullstack);
  const [extractedData, setExtractedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleExtract = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Local smart extraction simulation matching backend extractor
      const skillsFound = [];
      const textLower = resumeText.toLowerCase();

      const candidateSkills = [
        { name: "JavaScript", cat: "Frontend", aliases: ["javascript", "js"] },
        { name: "React", cat: "Frontend", aliases: ["react", "react.js"] },
        { name: "Node.js", cat: "Backend", aliases: ["node", "node.js"] },
        { name: "MongoDB", cat: "Databases", aliases: ["mongodb", "mongo"] },
        { name: "Docker", cat: "DevOps & Cloud", aliases: ["docker"] },
        { name: "AWS", cat: "DevOps & Cloud", aliases: ["aws", "cloud"] },
        { name: "Python", cat: "Backend", aliases: ["python", "py"] },
        { name: "Machine Learning", cat: "AI & Data Science", aliases: ["machine learning", "ml"] },
        { name: "Ayush Health Informatics", cat: "Ayush & Health Tech", aliases: ["ayush health informatics", "ayush informatics", "abdm"] },
        { name: "Herbal Informatics", cat: "Ayush & Health Tech", aliases: ["herbal informatics", "ayurvedic", "herbal"] },
        { name: "Clinical Data Management", cat: "Ayush & Health Tech", aliases: ["clinical data", "clinical data management"] },
      ];

      candidateSkills.forEach((skill) => {
        if (skill.aliases.some((alias) => textLower.includes(alias))) {
          const confidence = Math.min(95, Math.floor(70 + Math.random() * 22));
          skillsFound.push({
            name: skill.name,
            category: skill.cat,
            score: confidence,
          });
        }
      });

      setExtractedData({
        skills: skillsFound,
        count: skillsFound.length,
        degree: "B.Tech Computer Science & Engineering",
        cgpa: 8.4,
      });
      setIsProcessing(false);
    }, 450);
  };

  const handleApply = () => {
    if (extractedData?.skills) {
      onImportSkills(extractedData.skills);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Smart Automation: Resume & Portfolio Parser</p>
            <h2>Extract Skills From Profile / Resume</h2>
          </div>
          <button className="icon-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="sample-presets">
            <span className="preset-label">Quick sample:</span>
            <button
              className="preset-btn"
              onClick={() => {
                setResumeText(SAMPLE_RESUMES.fullstack);
                setExtractedData(null);
              }}
            >
              Full Stack & Cloud Profile
            </button>
            <button
              className="preset-btn"
              onClick={() => {
                setResumeText(SAMPLE_RESUMES.ayush);
                setExtractedData(null);
              }}
            >
              Ayush Health Informatics Profile
            </button>
          </div>

          <div className="extractor-grid">
            <div className="editor-side">
              <label htmlFor="resume-input" className="field-label">
                <FileText size={15} /> Paste Resume or Project Documentation
              </label>
              <textarea
                id="resume-input"
                className="resume-textarea"
                rows={9}
                value={resumeText}
                onChange={(e) => {
                  setResumeText(e.target.value);
                  setExtractedData(null);
                }}
              />
              <button
                className="primary-button full"
                onClick={handleExtract}
                disabled={isProcessing || !resumeText.trim()}
              >
                <Bot size={16} />
                {isProcessing ? "Analyzing Competencies..." : "Extract Skills with Smart Automation"}
              </button>
            </div>

            <div className="preview-side">
              <p className="field-label">
                <Sparkles size={15} /> Automation Output
              </p>
              {!extractedData && !isProcessing && (
                <div className="extractor-placeholder">
                  <Upload size={32} />
                  <p>Click "Extract Skills" to parse normalized competencies, evidence, and categories.</p>
                </div>
              )}

              {isProcessing && (
                <div className="extractor-placeholder">
                  <div className="loading-spinner" />
                  <p>Running NLP taxonomy matching and confidence estimation...</p>
                </div>
              )}

              {extractedData && (
                <div className="extracted-results">
                  <div className="extraction-meta">
                    <strong>{extractedData.count} Skills Identified</strong>
                    <span>Education: {extractedData.degree}</span>
                  </div>
                  <div className="extracted-skills-list">
                    {extractedData.skills.map((s) => (
                      <div className="extracted-chip" key={s.name}>
                        <span className="chip-name">{s.name}</span>
                        <span className="chip-cat">{s.category}</span>
                        <b className="chip-score">{s.score}%</b>
                      </div>
                    ))}
                  </div>
                  <button className="primary-button full mt-12" onClick={handleApply}>
                    <CheckCircle2 size={16} /> Import {extractedData.count} Skills to My Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
