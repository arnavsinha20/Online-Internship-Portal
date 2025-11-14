import { useState } from "react";
import api from "../api"; // ✅ Use default API import (no named import confusion)

export default function CollegeStudentCount() {
  const [collegeId, setCollegeId] = useState("");
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!collegeId.trim()) {
      setError("Please enter a College ID");
      setCount(null);
      return;
    }

    try {
      setError(null);
      setCount(null);
      setLoading(true);

      // ✅ Call backend API
      const res = await api.get(`/misc/colleges/${collegeId}/total-students`);

      // ✅ Validate backend response
      if (!res.data || res.data.total_students === undefined) {
        throw new Error("Invalid response from server");
      }

      setCount(res.data.total_students);
    } catch (err) {
      console.error("❌ Error fetching student count:", err);
      setError(err.response?.data?.error || err.message || "Error fetching student count");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1 className="text-3xl font-bold mb-4">Students in College</h1>

      <div className="tool-card">
        <div className="tool-form">

          {/* College ID Input */}
          <div className="tool-row">
            <label>College ID</label>
            <input
              type="number"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              placeholder="Enter College ID"
            />
          </div>

          <button className="btn" onClick={handleCheck} disabled={loading}>
            {loading ? "Loading..." : "Get Count"}
          </button>

          {/* Result Section — shows only after API call */}
          <div className="tool-result" style={{ minHeight: "50px", marginTop: "10px" }}>
            {error && (
              <div className="tool-result" style={{ color: "red" }}>
                {typeof error === "string" ? error : JSON.stringify(error)}
              </div>
            )}

            {count !== null && !error && (
              <div className="tool-result" style={{ color: "green" }}>
                <strong>Total Students:</strong> {count}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
