import { useState } from "react";
import api from "../api";

export default function ApplicationCount() {
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("Pending");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    try {
      setError(null);
      setResult(null);

      const res = await api.get(
        `/students/${studentId}/applications/count?status=${status}`
      );

      setResult(res.data.count);
    } catch (err) {
      setError(err.response?.data || "Error computing count");
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1 className="text-3xl font-bold mb-4">Applications Count</h1>

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

          <div className="tool-row">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Pending</option>
              <option>Accepted</option>
              <option>Rejected</option>
            </select>
          </div>

          <button className="btn" onClick={handleCheck}>Get Count</button>

          {/* ✅ Show ONLY after clicking */}
          {error && (
            <div className="tool-result" style={{ color: "red" }}>
              {JSON.stringify(error)}
            </div>
          )}

          {result !== null && (
            <div className="tool-result">
              <strong>Applications:</strong> {result}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
