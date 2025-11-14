import { useEffect, useState } from 'react';
import { getGoodies } from '../api';

export default function Goodies() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getGoodies()
      .then((r) => setRows(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="app-container">
        <div className="card">Loading goodies…</div>
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
      <h1>Goodies</h1>
      <div className="grid">
        {rows.map((g) => (
          <div className="card" key={g.goodie_id}>
            <h3>Goodie #{g.goodie_id}</h3>
            <div className="text-muted">Internship: {g.internship_id}</div>
            <div className="text-muted">
              Hoodie: {g.hoodie} • Cup: {g.cup} • Bottle: {g.bottle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
