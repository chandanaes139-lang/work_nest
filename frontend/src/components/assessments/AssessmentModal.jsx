import { useState } from "react";
import { CheckCircle2, ChevronRight, Sparkles, X, Award, HelpCircle } from "lucide-react";
import { assessmentCatalog } from "../../data/demo";

export default function AssessmentModal({ isOpen, onClose, onComplete }) {
  const [selectedAssessment, setSelectedAssessment] = useState(assessmentCatalog[0]);
  const [currentStep, setCurrentStep] = useState("select"); // "select" | "quiz" | "result"
  const [answers, setAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(0);
  const [newProficiency, setNewProficiency] = useState(0);

  if (!isOpen) return null;

  const handleStart = (assessment) => {
    setSelectedAssessment(assessment);
    setAnswers({});
    setCurrentStep("quiz");
  };

  const handleSelectAnswer = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    const questions = selectedAssessment.questions;
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answerIndex) {
        correct += 1;
      }
    });

    const scorePct = Math.round((correct / questions.length) * 100);
    // Award 75% baseline for passing, up to 92%
    const computedProficiency = Math.min(95, Math.max(55, Math.round(55 + (scorePct * 0.38))));

    setQuizScore(scorePct);
    setNewProficiency(computedProficiency);
    setCurrentStep("result");
  };

  const handleApplyResult = () => {
    onComplete(selectedAssessment.skill, newProficiency);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Smart Assessment Engine</p>
            <h2>
              {currentStep === "select" && "Verify Your Competencies"}
              {currentStep === "quiz" && selectedAssessment.title}
              {currentStep === "result" && "Assessment Verified!"}
            </h2>
          </div>
          <button className="icon-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {currentStep === "select" && (
          <div className="modal-body">
            <p className="quiet">
              Proctored multi-tier assessments upgrade your verified confidence score in the Skill Map and boost candidate rank on industry recruiter searches.
            </p>
            <div className="assessment-grid">
              {assessmentCatalog.map((asm) => (
                <div className="assessment-card" key={asm.id}>
                  <div className="asm-badge"><Sparkles size={14} /> {asm.duration}</div>
                  <h3>{asm.skill}</h3>
                  <p>{asm.title}</p>
                  <small>{asm.questions.length} situational questions</small>
                  <button className="primary-button full" onClick={() => handleStart(asm)}>
                    Start Assessment <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === "quiz" && (
          <div className="modal-body">
            <div className="quiz-questions">
              {selectedAssessment.questions.map((q, idx) => (
                <div className="question-card" key={idx}>
                  <p className="question-title">
                    <span>Q{idx + 1}.</span> {q.prompt}
                  </p>
                  <div className="options-list">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = answers[idx] === optIdx;
                      return (
                        <button
                          type="button"
                          key={optIdx}
                          className={`option-btn ${isSelected ? "selected" : ""}`}
                          onClick={() => handleSelectAnswer(idx, optIdx)}
                        >
                          <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                          <span className="opt-text">{opt}</span>
                          {isSelected && <CheckCircle2 size={16} className="opt-check" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="outline-button" onClick={() => setCurrentStep("select")}>
                Back to catalog
              </button>
              <button
                className="primary-button"
                disabled={Object.keys(answers).length < selectedAssessment.questions.length}
                onClick={handleSubmitQuiz}
              >
                Submit & Calculate Proficiency
              </button>
            </div>
          </div>
        )}

        {currentStep === "result" && (
          <div className="modal-body result-screen">
            <div className="result-orbit">
              <Award size={48} className="award-icon" />
              <strong>{quizScore}%</strong>
              <small>Accuracy</small>
            </div>
            <h3>Proficiency Updated for {selectedAssessment.skill}!</h3>
            <p className="quiet">
              Your verified confidence score in <strong>{selectedAssessment.skill}</strong> has been recalculated to{" "}
              <span className="highlight-pill">{newProficiency}%</span>.
            </p>
            <div className="gap-resolved-note">
              <CheckCircle2 size={18} />
              <span>
                This closes an active gap identified by <strong>Northstar Labs</strong> and the <strong>National Ayush Research Hub</strong>.
              </span>
            </div>
            <div className="modal-actions full-center">
              <button className="primary-button full" onClick={handleApplyResult}>
                Update My Skill Map & Readiness
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
