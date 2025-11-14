import { useState } from "react";
import { getMentorIdByStudent } from "../api";

export default function GetMentorByStudent() {
  const [studentId, setStudentId] = useState("");
  const [mentorId, setMentorId] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    try {
      setError(null);
      setMentorId(null);

      const res = await getMentorIdByStudent(studentId);
      setMentorId(res.data.mentor_id);
    } catch (err) {
      setError(err.response?.data || "Error fetching mentor ID");
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1 className="text-3xl font-bold mb-4">Get Mentor ID by Student</h1>

      <div className="tool-card">
        <div className="tool-form">
          <div className="tool-row">
            <label>Student ID</label>
            <input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student ID"
            />
          </div>

          <button className="btn" onClick={handleCheck}>
            Get Mentor ID
          </button>

          {error && (
            <div className="tool-result" style={{ color: "red" }}>
              {JSON.stringify(error)}
            </div>
          )}

          {mentorId !== null && (
            <div className="tool-result">
              <strong>Mentor ID:</strong> {mentorId}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
