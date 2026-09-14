import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Branch } from "../types";
import { getBranches, addClass } from "../api";

export default function AddClass() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    branch_code: "",
    class_name: "",
    start_time: "",
    end_time: "",
    instructor_name: "",
    max_participants: "",
  });

  useEffect(() => {
    getBranches().then(setBranches).catch(console.error);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !form.branch_code ||
      !form.class_name ||
      !form.start_time ||
      !form.end_time ||
      !form.instructor_name ||
      !form.max_participants
    ) {
      setError("All fields are required");
      return;
    }
    if (new Date(form.start_time) < new Date()) {
      setError("Start time cannot be in the past");
      return;
    }
    if (new Date(form.start_time) >= new Date(form.end_time)) {
      setError("Start time must be before end time");
      return;
    }
    if (Number(form.max_participants) <= 0) {
      setError("Max participants must be greater than 0");
      return;
    }

    try {
      await addClass({
        branch_code: Number(form.branch_code),
        class_name: form.class_name,
        start_time: form.start_time.replace("T", " ") + ":00",
        end_time: form.end_time.replace("T", " ") + ":00",
        instructor_name: form.instructor_name,
        max_participants: Number(form.max_participants),
      });
      navigate("/classes");
    } catch (err) {
      console.error(err);
      setError("Could not add the class");
    }
  };

  return (
    <div className="page-narrow">
      <h1>Add a class</h1>
      <p className="page-subtitle">All fields are required</p>

      {error && <p className="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Branch</label>
          <select
            className="form-control"
            name="branch_code"
            value={form.branch_code}
            onChange={handleChange}
          >
            <option value="">-- Select a branch --</option>
            {branches.map((b) => (
              <option key={b.branch_code} value={b.branch_code}>
                {b.branch_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Class name</label>
          <input
            className="form-control"
            name="class_name"
            value={form.class_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Start time</label>
          <input
            className="form-control"
            type="datetime-local"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>End time</label>
          <input
            className="form-control"
            type="datetime-local"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Instructor</label>
          <input
            className="form-control"
            name="instructor_name"
            value={form.instructor_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Max participants</label>
          <input
            className="form-control"
            type="number"
            name="max_participants"
            value={form.max_participants}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-submit">
          Add class
        </button>
      </form>
    </div>
  );
}
