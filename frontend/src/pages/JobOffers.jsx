import { useEffect, useState } from 'react';
import { getJobOffers } from '../api';

export default function JobOffers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getJobOffers()
      .then((r) => setRows(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="app-container">
        <div className="card">Loading job offers…</div>
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
      <h1>Job Offers</h1>
      <div className="grid">
        {rows.map((j) => (
          <div className="card" key={j.offer_id}>
            <h3>{j.role}</h3>
            <div className="text-muted">Package: {j.package}</div>
            <div className="text-muted">Location: {j.location}</div>
            <div className="text-muted">Internship: {j.internship_id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
