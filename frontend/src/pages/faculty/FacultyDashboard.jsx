import { useState } from "react";
import { ArrowRight, MessageSquareText, UsersRound, Calendar, Send, Sparkles, CheckCircle2, UserCheck } from "lucide-react";
import { studentSeed } from "../../data/demo";
import CollaborationModal from "../../components/collaboration/CollaborationModal";
import CandidateDetailModal from "../../components/candidates/CandidateDetailModal";

export default function FacultyDashboard({ onNotify }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isCollabOpen, setIsCollabOpen] = useState(false);
  const [nudgedStudents, setNudgedStudents] = useState([]);
  const [officeHourScheduled, setOfficeHourScheduled] = useState(false);

  const handleNudge = (studentName, pathway) => {
    setNudgedStudents((prev) => [...prev, studentName]);
    if (onNotify) {
      onNotify(`Shared ${pathway || "targeted pathway"} with ${studentName}.`);
    }
  };

  const handleScheduleOfficeHour = () => {
    setOfficeHourScheduled(true);
    if (onNotify) {
      onNotify("Office hour scheduled for Friday 3:00 PM with assigned cohort.");
    }
    setTimeout(() => setOfficeHourScheduled(false), 3000);
  };

  return (
    <div className="content role-page">
      <section className="welcome">
        <div>
          <p className="eyebrow">Faculty workspace / Dept. of Computer Science & Health Informatics</p>
          <h1>Guide student momentum with real data.</h1>
          <p className="subcopy">
            Detect competency gaps early, assign verified pathways, and facilitate high-impact academia-industry projects.
          </p>
        </div>
        <button className="primary-button" onClick={handleScheduleOfficeHour}>
          <Calendar size={16} />
          {officeHourScheduled ? "Office Hour Set ✓" : "Schedule Group Check-in"}
        </button>
      </section>

      <section className="split-panel">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Assigned mentees</p>
              <h2>Student Readiness Overview</h2>
            </div>
            <span className="count-badge">
              <UsersRound size={13} /> {studentSeed.length} Active Mentees
            </span>
          </div>

          <div className="faculty-list">
            {studentSeed.map((student) => {
              const isNudged = nudgedStudents.includes(student.name);
              return (
                <div className="student-row" key={student.name}>
                  <span
                    className="avatar cursor-pointer"
                    onClick={() => setSelectedStudent(student)}
                  >
                    {student.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div
                    className="cursor-pointer flex-1"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <strong>{student.name}</strong>
                    <small>
                      {student.program} · Gaps: <b className="text-orange">{student.gaps.join(", ")}</b>
                    </small>
                  </div>
                  <span className="readiness-tag">{student.readiness}% ready</span>
                  <button
                    className={isNudged ? "outline-button disabled" : "outline-button"}
                    onClick={() => handleNudge(student.name, `${student.gaps[0]} FastTrack`)}
                    disabled={isNudged}
                  >
                    {isNudged ? (
                      <>
                        Nudged <CheckCircle2 size={13} />
                      </>
                    ) : (
                      <>
                        Nudge <Send size={13} />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </article>

        <article className="panel mentor-panel">
          <p className="eyebrow">Smart automation triage</p>
          <h2>Active Mentorship Queue</h2>
          <p className="quiet">
            Three students have high match potential for Ayush & tech opportunities but lack 1-2 foundational skills.
          </p>

          <div className="mentor-actions">
            <button
              className="outline-button"
              onClick={() => handleNudge("Aarav Patel", "Docker Containerization Pathway")}
            >
              <Send size={14} /> Share Docker pathway with Aarav
            </button>
            <button
              className="outline-button"
              onClick={() => handleNudge("Zoya Khan", "Ayush Health Informatics Standards")}
            >
              <Send size={14} /> Share Ayush standards with Zoya
            </button>
          </div>

          <div className="research-note">
            <small>Industry & Ayush Collaboration</small>
            <strong>Northstar Labs & Central Ayush Council opened 6 student capstone mentorship slots.</strong>
            <button className="text-button mt-8" onClick={() => setIsCollabOpen(true)}>
              View Collaboration Projects <ArrowRight size={14} />
            </button>
          </div>
        </article>
      </section>

      {/* Collaboration Modal */}
      <CollaborationModal
        isOpen={isCollabOpen}
        onClose={() => setIsCollabOpen(false)}
      />

      {/* Student Detail Modal */}
      <CandidateDetailModal
        isOpen={Boolean(selectedStudent)}
        onClose={() => setSelectedStudent(null)}
        candidate={selectedStudent}
        onShortlist={(name) => handleNudge(name, "Direct Faculty Endorsement")}
        isShortlisted={selectedStudent ? nudgedStudents.includes(selectedStudent.name) : false}
      />
    </div>
  );
}
