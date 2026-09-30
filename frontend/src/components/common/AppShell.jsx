import { Bell, BookOpen, BriefcaseBusiness, ChartNoAxesCombined, ChevronDown, ClipboardList, Compass, GraduationCap, LayoutDashboard, Search, Settings, UsersRound, Handshake } from "lucide-react";

const navigation = {
  student: [
    [LayoutDashboard, "Overview"],
    [Compass, "Skill map"],
    [BriefcaseBusiness, "Opportunities"],
    [BookOpen, "Learning path"],
    [ClipboardList, "Applications"],
  ],
  industry: [
    [LayoutDashboard, "Overview"],
    [BriefcaseBusiness, "Opportunities"],
    [UsersRound, "Candidates"],
    [ClipboardList, "Applications"],
  ],
  institution: [
    [LayoutDashboard, "Overview"],
    [UsersRound, "Students"],
    [ChartNoAxesCombined, "Skill analytics"],
    [BriefcaseBusiness, "Industry connect"],
  ],
  faculty: [
    [LayoutDashboard, "Overview"],
    [UsersRound, "My students"],
    [BookOpen, "Mentorship"],
    [BriefcaseBusiness, "Research & industry"],
  ],
};

const labels = {
  student: "Student",
  industry: "Industry",
  institution: "Institution",
  faculty: "Faculty",
};

export default function AppShell({ role, setRole, applicationsCount = 2, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#top">
          <span className="brand-mark">
            <i />
            <i />
            <i />
          </span>
          skill<span>bridge</span>
        </a>

        <div className="role-switcher">
          <label htmlFor="role">Workspace Role</label>
          <select
            id="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            {Object.keys(labels).map((key) => (
              <option key={key} value={key}>
                {labels[key]} workspace
              </option>
            ))}
          </select>
        </div>

        <nav>
          {navigation[role].map(([Icon, label], index) => {
            const anchor = `#${label.toLowerCase().replaceAll(" ", "-")}`;
            return (
              <a
                className={`nav-link ${index === 0 ? "active" : ""}`}
                href={anchor}
                key={label}
              >
                <Icon size={17} />
                {label}
                {label === "Opportunities" && role === "student" ? <b>4</b> : null}
                {label === "Applications" && role === "student" ? (
                  <b className="badge-green">{applicationsCount}</b>
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="sidebar-foot">
          <div className="institution">
            <span className="institution-icon">
              {role === "industry" ? "N" : "A"}
            </span>
            <span>
              <small>
                {role === "industry"
                  ? "Industry partner"
                  : role === "student"
                  ? "Academic Institution"
                  : "Collaborating Node"}
              </small>
              <strong>
                {role === "industry" ? "Northstar Labs" : "Nexus Univ. & Ayush Hub"}
              </strong>
            </span>
            <ChevronDown size={15} />
          </div>
          <button className="help-link">Ayush & Smart Automation Portal v1.0</button>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="mobile-brand">
            skill<span>bridge</span>
          </div>
          <div className="search">
            <Search size={17} />
            <input
              aria-label="Search SkillBridge"
              placeholder="Search skills, opportunities, candidates, research projects..."
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="top-actions">
            <button aria-label="Notifications" title="Notifications">
              <Bell size={18} />
              <em />
            </button>
            <button aria-label="Settings" title="Settings">
              <Settings size={18} />
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
