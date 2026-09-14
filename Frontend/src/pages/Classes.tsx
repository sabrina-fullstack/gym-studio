import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Branch, Class } from "../types";
import { getBranches, getClassesByBranch, deleteClass } from "../api";

export default function Classes() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<number | "">("");

  useEffect(() => {
    getBranches().then(setBranches).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedBranch === "") {
      setClasses([]);
      return;
    }
    getClassesByBranch(selectedBranch).then(setClasses).catch(console.error);
  }, [selectedBranch]);

  // Durée du cours en minutes
  const getDuration = (start: string, end: string) => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return Math.round(diff / 60000);
  };

  // Un cours est à venir si son début est postérieur à maintenant
  const isUpcoming = (start: string) => new Date(start) > new Date();

  const handleDelete = async (classCode: number) => {
    if (!confirm("Delete this class?")) return;
    try {
      await deleteClass(classCode);
      setClasses(classes.filter((c) => c.class_code !== classCode));
    } catch (error) {
      console.error(error);
      alert("Could not delete the class");
    }
  };

  return (
    <div className="page">
      <h1>Studio classes</h1>
      <p className="page-subtitle">Select a branch to see its schedule</p>

      <div className="form-group" style={{ maxWidth: "280px" }}>
        <select
          className="form-control"
          value={selectedBranch}
          onChange={(e) =>
            setSelectedBranch(
              e.target.value === "" ? "" : Number(e.target.value),
            )
          }
        >
          <option value="">-- Select a branch --</option>
          {branches.map((b) => (
            <option key={b.branch_code} value={b.branch_code}>
              {b.branch_name}
            </option>
          ))}
        </select>
      </div>

      {selectedBranch === "" && (
        <p className="empty-state">No branch selected yet.</p>
      )}

      {selectedBranch !== "" && classes.length === 0 && (
        <p className="empty-state">No classes for this branch.</p>
      )}

      <div className="class-grid">
        {classes.map((c) => {
          const upcoming = isUpcoming(c.start_time);
          return (
            <div
              key={c.class_code}
              className={`class-card ${upcoming ? "upcoming" : "past"}`}
            >
              <h3>
                {c.class_name}
                <span className={`badge ${upcoming ? "upcoming" : "past"}`}>
                  {upcoming ? "Upcoming" : "Past"}
                </span>
              </h3>

              <div className="class-info">
                <div>
                  <strong>Start</strong> {c.start_time}
                </div>
                <div>
                  <strong>End</strong> {c.end_time}
                </div>
                <div>
                  <strong>Duration</strong>{" "}
                  {getDuration(c.start_time, c.end_time)} min
                </div>
                <div>
                  <strong>Instructor</strong> {c.instructor_name}
                </div>
                <div>
                  <strong>Max participants</strong> {c.max_participants}
                </div>
              </div>

              <Link to={`/edit/${c.class_code}`} className="btn btn-edit">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(c.class_code)}
                className="btn btn-delete"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
