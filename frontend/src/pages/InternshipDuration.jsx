import { useState } from "react";
import { getInternshipDuration } from "../api";

export default function InternshipDuration() {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setResult(null);
    try {
      const res = await getInternshipDuration(id.trim());
      setResult(res.data?.duration ?? res.data?.[0]?.duration ?? 0);
    } catch (e) {
      setErr(e.response?.data || e.message);
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1>Internship Duration</h1>

      <form className="tool-card tool-form tool-form--2" onSubmit={onSubmit}>
        <div className="tool-row" style={{gridColumn: "1 / -1"}}>
          <input
            type="number"
            placeholder="Internship ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="tool-actions" style={{gridColumn: "1 / -1"}}>
          <button className="btn" type="submit">Get Duration</button>
        </div>
      </form>

      {(result !== null || err) && (
        <div className="tool-result">
          {err ? <>❌ {String(err)}</> : <>✅ Duration: <b>{result}</b> days</>}
        </div>
      )}
    </div>
  );
}
