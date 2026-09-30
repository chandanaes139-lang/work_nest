import { useState } from "react";
import AppShell from "./components/common/AppShell";
import StudentDashboard from "./pages/student/StudentDashboard";
import IndustryDashboard from "./pages/industry/IndustryDashboard";
import InstitutionDashboard from "./pages/institution/InstitutionDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import { opportunitySeed, skillSeed } from "./data/demo";

export default function App() {
  const [role, setRole] = useState("student");
  const [skills, setSkills] = useState(skillSeed);
  const [toast, setToast] = useState("");
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2800); };
  const improveSkill = (name) => setSkills((current) => current.map((skill) => skill.name === name ? { ...skill, score: skill.score >= 95 ? 20 : skill.score + 10 } : skill));
  const views = {
    student: <StudentDashboard skills={skills} opportunities={opportunitySeed} onImprove={(name) => { improveSkill(name); notify(`${name} confidence updated from your new evidence.`); }} onApply={(opportunity) => notify(`${opportunity.role} was added to your application shortlist.`)} />,
    industry: <IndustryDashboard onPost={() => notify("Opportunity saved. Candidate matching will refresh after publishing.")} />,
    institution: <InstitutionDashboard />,
    faculty: <FacultyDashboard />,
  };
  return <AppShell role={role} setRole={setRole}>{views[role]}<div className={`toast ${toast ? "show" : ""}`} role="status">{toast}</div></AppShell>;
}
