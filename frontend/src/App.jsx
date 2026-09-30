import { useState } from "react";
import AppShell from "./components/common/AppShell";
import StudentDashboard from "./pages/student/StudentDashboard";
import IndustryDashboard from "./pages/industry/IndustryDashboard";
import InstitutionDashboard from "./pages/institution/InstitutionDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import { opportunitySeed, skillSeed, initialApplications } from "./data/demo";

export default function App() {
  const [role, setRole] = useState("student");
  const [skills, setSkills] = useState(skillSeed);
  const [opportunities, setOpportunities] = useState(opportunitySeed);
  const [applications, setApplications] = useState(initialApplications);
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3500);
  };

  const improveSkill = (name, targetScore) => {
    setSkills((current) =>
      current.map((skill) => {
        if (skill.name.toLowerCase() === name.toLowerCase()) {
          const nextScore = targetScore !== undefined ? targetScore : Math.min(95, skill.score + 15);
          return { ...skill, score: nextScore };
        }
        return skill;
      })
    );
  };

  const importSkills = (extractedSkills) => {
    setSkills((current) => {
      const updated = [...current];
      extractedSkills.forEach((extracted) => {
        const idx = updated.findIndex((s) => s.name.toLowerCase() === extracted.name.toLowerCase());
        if (idx >= 0) {
          updated[idx] = {
            ...updated[idx],
            score: Math.max(updated[idx].score, extracted.score),
          };
        } else {
          updated.push({
            name: extracted.name,
            score: extracted.score,
            category: extracted.category || "General",
          });
        }
      });
      return updated;
    });
    notify(`Smart Automation successfully imported ${extractedSkills.length} competencies into your skill profile!`);
  };

  const handlePostOpportunity = (newOpp) => {
    setOpportunities((prev) => [newOpp, ...prev]);
    notify(`Published "${newOpp.role}". Smart Automation candidate ranking is active.`);
  };

  const handleApplyOpportunity = (opportunity, match) => {
    const existing = applications.find((a) => a.opportunityId === opportunity.id);
    if (existing) {
      notify(`You have already applied for ${opportunity.role}.`);
      return;
    }

    const newApp = {
      id: `app_${Date.now()}`,
      opportunityId: opportunity.id,
      studentName: "Aarav Patel",
      program: "B.Tech CSE",
      role: opportunity.role,
      company: opportunity.company,
      type: opportunity.type,
      status: "Submitted",
      appliedDate: "Just now",
      matchScore: match.score,
      covered: match.coveredSkills,
      missing: match.missingSkills,
    };

    setApplications((prev) => [newApp, ...prev]);
    notify(`Applied to ${opportunity.role} at ${opportunity.company}! Match Score: ${match.score}%.`);
  };

  const handleUpdateApplicationStatus = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
    notify(`Application status updated to "${newStatus}".`);
  };

  const views = {
    student: (
      <StudentDashboard
        skills={skills}
        opportunities={opportunities}
        applications={applications}
        onImprove={(name) => {
          improveSkill(name);
          notify(`${name} confidence updated from your verified practice.`);
        }}
        onUpdateSkillScore={(name, score) => {
          improveSkill(name, score);
          notify(`Assessment verified! ${name} proficiency updated to ${score}%.`);
        }}
        onApply={handleApplyOpportunity}
        onImportSkills={importSkills}
      />
    ),
    industry: (
      <IndustryDashboard
        onPost={handlePostOpportunity}
        applications={applications}
        onUpdateApplicationStatus={handleUpdateApplicationStatus}
      />
    ),
    institution: <InstitutionDashboard />,
    faculty: <FacultyDashboard onNotify={notify} />,
  };

  return (
    <AppShell role={role} setRole={setRole} applicationsCount={applications.length}>
      {views[role]}
      <div className={`toast ${toast ? "show" : ""}`} role="status">
        {toast}
      </div>
    </AppShell>
  );
}
