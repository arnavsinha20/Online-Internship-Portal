import { useState } from "react";
import { getStudentAge } from "../api";

export default function StudentAge() {
  const [id, setId] = useState("");
  const [age, setAge] = useState(null);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setAge(null);
    try {
      const res = await getStudentAge(id.trim());
      setAge(res.data?.age ?? res.data?.[0]?.age ?? 0);
    } catch (e) {
      setErr(e.response?.data || e.message);
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1>Student Age</h1>

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
          <button className="btn" type="submit">Get Age</button>
        </div>
      </form>

      {(age !== null || err) && (
        <div className="tool-result">
          {err ? <>❌ {String(err)}</> : <>✅ Age: <b>{age}</b></>}
        </div>
      )}
    </div>
  );
}
