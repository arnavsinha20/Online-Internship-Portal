import { useState } from "react";
import api from "../api";

export default function StatsByField() {
  const [field, setField] = useState("");
  const [avg, setAvg] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    try {
      setError(null);
      setAvg(null);

      const res = await api.get(`/internships/field/${field}/avg-stipend`);
      setAvg(res.data.avg_stipend);
    } catch (err) {
      setError(err.response?.data || "Error fetching stipend");
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1 className="text-3xl font-bold mb-4">Average Stipend by Field</h1>

      <div className="tool-card">
        <div className="tool-form">

          <div className="tool-row">
            <label>Field</label>
            <input
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="Enter Field (e.g., Web Development)"
            />
          </div>

          <button className="btn" onClick={handleCheck}>Get Average</button>

          {/* ✅ conditional outputs only */}
          {error && (
            <div className="tool-result" style={{ color: "red" }}>
              {JSON.stringify(error)}
            </div>
          )}

          {avg !== null && (
            <div className="tool-result">
              <strong>Average Stipend:</strong> ₹{avg}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
