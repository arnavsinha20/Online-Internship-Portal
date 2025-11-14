import { useEffect, useState } from 'react';
import { getFeedback } from '../api';

export default function Feedback() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getFeedback()
      .then((r) => setRows(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="app-container">
        <div className="card">Loading feedback…</div>
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
      <h1>Feedback</h1>
      <div className="grid">
        {rows.map((f) => (
          <div className="card" key={f.feedback_id}>
            <h3>Feedback #{f.feedback_id}</h3>
            <div className="text-muted">Company: {f.company_id}</div>
            <div className="text-muted">Mentor: {f.mentor_id}</div>
            <div style={{ marginTop: 8 }}>{f.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
