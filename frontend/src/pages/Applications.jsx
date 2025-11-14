import { useEffect, useState } from 'react';
import api from '../api';

export default function Applications(){
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    setLoading(true);
    api.get('/applications').then(r=>setRows(r.data)).catch(e=>setError(e.message)).finally(()=>setLoading(false));
  },[]);

  if(loading) return <div className="app-container"><div className="card">Loading applications…</div></div>;
  if(error) return <div className="app-container"><div className="card">Error: {error}</div></div>;

  return (
    <div className="app-container">
      <h1>Applications</h1>
      <div className="grid">
        {rows.map(a=> (
          <div className="card" key={`${a.application_id}_${a.student_id}`}>
            <h3>Application #{a.application_id}</h3>
            <div className="text-muted">Student: {a.student_name} ({a.student_id})</div>
            <div className="text-muted">Company: {a.company_name} ({a.company_id})</div>
            <div className="text-muted">Status: {a.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
