import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get('/companies')
      .then(res => setCompanies(res.data || []))
      .catch(err => setError(err.response?.data || err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="app-container"><div className="card">Loading companies…</div></div>;
  if (error) return <div className="app-container"><div className="card">Error: <pre>{JSON.stringify(error, null, 2)}</pre></div></div>;

  return (
    <div className="app-container">
      <h1 style={{ marginTop: 0 }}>Companies</h1>
      <div className="grid">
        {companies.map(c => (
          <Link key={c.company_id} to={`/company/${c.company_id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3>{c.company_name || c.name}</h3>
            <p className="text-muted">Total internships: {c.total_internships ?? '—'}</p>
            <p className="text-muted">Avg stipend: {c.average_stipend ?? '—'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
