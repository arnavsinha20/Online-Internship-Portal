import { useState } from "react";
import { getCompanyStats } from "../api";

export default function CompanyStats() {
  const [companyId, setCompanyId] = useState("");
  const [stats, setStats] = useState(null);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStats(null); setErr("");
    try {
      const res = await getCompanyStats(Number(companyId));
      setStats(res.data);
    } catch (e) {
      setErr(e.response?.data || e.message);
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1>Company Statistics</h1>

      <form className="tool-card tool-form tool-form--2" onSubmit={onSubmit}>
        <input
          type="number"
          placeholder="Company ID"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          required
        />
        <button className="btn" style={{ gridColumn: "1 / -1" }}>
          Get Stats
        </button>
      </form>

      {(stats || err) && (
        <div className="tool-result">
          {err ? (
            `❌ ${err}`
          ) : (
            <>
              <div><strong>Company:</strong> {stats.company_name ?? "—"}</div>
              <div><strong>Total Internships:</strong> {stats.total_internships ?? 0}</div>
              <div><strong>Total Applications:</strong> {stats.total_applications ?? 0}</div>
              <div><strong>Accepted Applications:</strong> {stats.accepted_applications ?? 0}</div>
              <div><strong>Pending Applications:</strong> {stats.pending_applications ?? 0}</div>
              <div><strong>Average Stipend:</strong> {stats.average_stipend ?? 0}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
