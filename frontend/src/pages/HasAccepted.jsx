import { useState } from "react";
import { hasAccepted } from "../api";

export default function HasAccepted() {
  const [id, setId] = useState("");
  const [value, setValue] = useState(null);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setValue(null);
    try {
      const res = await hasAccepted(id.trim());
      const v = res.data?.hasAccepted ?? res.data?.[0]?.hasAccepted ?? 0;
      setValue(Number(v) === 1 || v === true);
    } catch (e) {
      setErr(e.response?.data || e.message);
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1>Has Accepted Application?</h1>

      <form className="tool-card tool-form tool-form--2" onSubmit={onSubmit}>
        <div className="tool-row" style={{gridColumn: "1 / -1"}}>
          <input
            type="number"
            placeholder="Student ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div className="tool-actions" style={{gridColumn: "1 / -1"}}>
          <button className="btn" type="submit">Check</button>
        </div>
      </form>

      {(value !== null || err) && (
        <div className="tool-result">
          {err ? <>❌ {String(err)}</> : (value ? "✅ Yes" : "❌ No")}
        </div>
      )}
    </div>
  );
}
