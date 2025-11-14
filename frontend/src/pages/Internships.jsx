import { useEffect, useState } from "react";
import { getInternships } from "../api";

export default function Internships() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getInternships().then(res => setItems(res.data));
  }, []);

  return (
    <div className="app-container">
      <h1>Internships</h1>

      <div className="grid">
        {items.map(i => (
          <div key={i.internship_id} className="card">
            <h3>#{i.internship_id} — {i.field}</h3>
            <p className="text-muted">Company: {i.company_name}</p>
            <p className="text-muted">Stipend: {i.stipend}</p>
            <p className="text-muted">Mode: {i.mode}</p>
            <p className="text-muted">Duration: {i.start_date} → {i.end_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
