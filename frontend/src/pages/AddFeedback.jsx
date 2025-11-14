import { useState } from "react";
import api from "../api";

export default function AddFeedback() {
  const [comment, setComment] = useState("");
  const [mentor_id, setMentorId] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setError(null);
      const res = await api.post("/misc/feedback/add", {
        comment,
        mentor_id,
        company_id,
      });
      setMsg(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Error adding feedback");
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1 className="text-3xl font-bold mb-4">Add Feedback</h1>
      <div className="tool-card">
        <div className="tool-form">
          <div className="tool-row">
            <label>Mentor ID</label>
            <input value={mentor_id} onChange={(e) => setMentorId(e.target.value)} />
          </div>
          <div className="tool-row">
            <label>Company ID</label>
            <input value={company_id} onChange={(e) => setCompanyId(e.target.value)} />
          </div>
          <div className="tool-row">
            <label>Comment</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>
          <button className="btn" onClick={handleSubmit}>Submit Feedback</button>

          {msg && <div className="tool-result">{msg}</div>}
          {error && <div className="tool-result" style={{ color: "red" }}>{error}</div>}
        </div>
      </div>
    </div>
  );
}
