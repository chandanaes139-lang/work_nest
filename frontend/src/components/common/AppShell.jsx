import { Bell, BookOpen, BriefcaseBusiness, ChartNoAxesCombined, ChevronDown, ClipboardList, Compass, GraduationCap, LayoutDashboard, Search, Settings, UsersRound } from "lucide-react";

const navigation = {
  student: [[LayoutDashboard, "Overview"], [Compass, "Skill map"], [BriefcaseBusiness, "Opportunities"], [BookOpen, "Learning path"], [ClipboardList, "Applications"]],
  industry: [[LayoutDashboard, "Overview"], [BriefcaseBusiness, "Opportunities"], [UsersRound, "Candidates"], [ClipboardList, "Applications"]],
  institution: [[LayoutDashboard, "Overview"], [UsersRound, "Students"], [ChartNoAxesCombined, "Skill analytics"], [BriefcaseBusiness, "Industry connect"]],
  faculty: [[LayoutDashboard, "Overview"], [UsersRound, "My students"], [BookOpen, "Mentorship"], [BriefcaseBusiness, "Research & industry"]],
};

const labels = { student: "Student", industry: "Industry", institution: "Institution", faculty: "Faculty" };

export default function AppShell({ role, setRole, children }) {
  return <div className="app-shell"><aside className="sidebar">
    <a className="brand" href="#top"><span className="brand-mark"><i /><i /><i /></span>skill<span>bridge</span></a>
    <div className="role-switcher"><label htmlFor="role">Workspace</label><select id="role" value={role} onChange={(event) => setRole(event.target.value)}>{Object.keys(labels).map((key) => <option key={key} value={key}>{labels[key]} workspace</option>)}</select></div>
    <nav>{navigation[role].map(([Icon, label], index) => <a className={`nav-link ${index === 0 ? "active" : ""}`} href={`#${label.toLowerCase().replaceAll(" ", "-")}`} key={label}><Icon size={17} />{label}{label === "Opportunities" && role === "student" ? <b>3</b> : null}</a>)}</nav>
    <div className="sidebar-foot"><div className="institution"><span className="institution-icon">N</span><span><small>{role === "industry" ? "Industry partner" : "Institution"}</small><strong>{role === "industry" ? "Northstar Labs" : "Nexus University"}</strong></span><ChevronDown size={15} /></div><button className="help-link">Support center</button></div>
  </aside><main><header className="topbar"><div className="mobile-brand">skill<span>bridge</span></div><div className="search"><Search size={17} /><input aria-label="Search SkillBridge" placeholder="Search skills, people, opportunities..." /><kbd>⌘ K</kbd></div><div className="top-actions"><button aria-label="Notifications"><Bell size={18} /><em /></button><button aria-label="Settings"><Settings size={18} /></button></div></header>{children}</main></div>;
}
