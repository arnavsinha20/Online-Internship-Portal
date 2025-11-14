import { useEffect, useState } from 'react';
import { getCertificates } from '../api';

export default function Certificates() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCertificates()
      .then((r) => setRows(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="app-container">
        <div className="card">Loading certificates…</div>
      </div>
    );
  if (error)
    return (
      <div className="app-container">
        <div className="card">Error: {error}</div>
      </div>
    );

  return (
    <div className="app-container">
      <h1>Certificates</h1>
      <div className="grid">
        {rows.map((c) => (
          <div className="card" key={c.certificate_id}>
            <h3>Certificate #{c.certificate_id}</h3>

            <div className="text-muted">
              Internship: {c.internship_id} — {c.internship_field}
            </div>

            <div className="text-muted">Issue Date: {c.issue_date}</div>

            <div className="text-muted">
              Status: <strong>{c.status}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
