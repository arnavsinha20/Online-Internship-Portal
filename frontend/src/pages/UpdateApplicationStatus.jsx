import { useState } from "react";
import { updateApplicationStatus } from "../api";

export default function UpdateApplicationStatus() {
  const [applicationId, setApplicationId] = useState("");
  const [status, setStatus] = useState("Pending");
  const [result, setResult] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult(""); setErr("");
    try {
      const res = await updateApplicationStatus(Number(applicationId), status);
      setResult(res.data?.message || "✅ Status updated successfully.");
    } catch (e) {
      setErr(e.response?.data || e.message);
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1>Update Application Status</h1>

      <form className="tool-card tool-form tool-form--2" onSubmit={onSubmit}>
        <input
          type="number"
          placeholder="Application ID"
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          required
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>Accepted</option>
          <option>Rejected</option>
        </select>

        <button className="btn" style={{ gridColumn: "1 / -1" }}>
          Update
        </button>
      </form>

      {(result || err) && (
        <div className="tool-result">{err ? `❌ ${err}` : result}</div>
      )}
    </div>
  );
}
