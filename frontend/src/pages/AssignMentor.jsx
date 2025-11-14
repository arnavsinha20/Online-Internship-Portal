import { useState } from "react";
import api from "../api";

export default function AssignMentor() {
  const [studentId, setStudentId] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [result, setResult] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult(""); setErr("");
    try {
      const res = await api.post("/mentors/assign", {
        student_id: Number(studentId),
        mentor_id: Number(mentorId),
      });
      setResult(res.data?.message || "✅ Mentor assigned successfully.");
    } catch (e) {
      setErr(e.response?.data || e.message);
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1>Assign Mentor</h1>

      <form className="tool-card tool-form tool-form--2" onSubmit={onSubmit}>
        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Mentor ID"
          value={mentorId}
          onChange={(e) => setMentorId(e.target.value)}
          required
        />
        <button className="btn" style={{ gridColumn: "1 / -1" }}>
          Assign
        </button>
      </form>

      {(result || err) && (
        <div className="tool-result">{err ? `❌ ${err}` : result}</div>
      )}
    </div>
  );
}
