import { useEffect, useState } from 'react';
import { getMentors } from '../api';

export default function Mentors() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMentors()
      .then((r) => setRows(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="app-container">
        <div className="card">Loading mentors…</div>
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
      <h1>Mentors</h1>
      <div className="grid">
        {rows.map((m) => (
          <div className="card" key={m.mentor_id}>
            <h3>
              {m.first_name} {m.last_name}
            </h3>
            <div className="text-muted">DOB: {m.dob}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
