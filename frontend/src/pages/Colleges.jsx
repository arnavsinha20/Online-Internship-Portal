import { useEffect, useState } from 'react';
import { getColleges } from '../api';

export default function Colleges() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getColleges()
      .then((r) => setRows(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="app-container">
        <div className="card">Loading colleges…</div>
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
      <h1>Colleges</h1>
      <div className="grid">
        {rows.map((c) => (
          <div className="card" key={c.college_id}>
            <h3>{c.name}</h3>
            <div className="text-muted">{c.address}</div>
            <div className="text-muted">{c.contact}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
