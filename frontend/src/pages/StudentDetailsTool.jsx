import { useState } from "react";
import { getStudentDetails } from "../api";

export default function StudentDetailsTool() {
  const [studentId, setStudentId] = useState("");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); 
    setData(null);

    try {
      const res = await getStudentDetails(Number(studentId));
      setData(res.data);
    } catch (e) {
      setErr(e.response?.data || e.message);
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1>Student Details</h1>

      <form className="tool-card tool-form tool-form--2" onSubmit={onSubmit}>
        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />

        <button className="btn" style={{ gridColumn: "1 / -1" }}>
          Fetch
        </button>
      </form>

      {(data || err) && (
        <div className="tool-result">
          {err ? (
            `❌ ${err}`
          ) : (
            <>
              <div><strong>ID:</strong> {data.student_id}</div>
              <div><strong>Name:</strong> {data.first_name} {data.last_name}</div>
              <div><strong>DOB:</strong> {data.dob}</div>
              <div><strong>College:</strong> {data.college_name}</div>
              <div><strong>Mentor:</strong> {data.mentor_name}</div>
              <div><strong>Emails:</strong> {data.emails || "—"}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
