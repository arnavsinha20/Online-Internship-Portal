import { useState } from "react";
import api from "../api";

export default function AddInternship() {

  const [form, setForm] = useState({
    field: "",
    stipend: "",
    mode: "",
    start_date: "",
    end_date: "",
    company_id: "",
  });

  const [response, setResponse] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/internships/add", form);
      setResponse(res.data);
    } catch (err) {
      setResponse({ error: err.response?.data || "Something went wrong" });
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Add Internship</h1>

        <form onSubmit={handleSubmit} className="form" style={{ marginTop: 12 }}>
          <div className="form-row">
            <label>Field</label>
            <input name="field" placeholder="Field" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label>Stipend</label>
            <input name="stipend" placeholder="Stipend" type="number" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label>Mode</label>
            <input name="mode" placeholder="Mode (Online/Onsite/Hybrid)" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label>Start Date</label>
            <input name="start_date" type="date" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label>End Date</label>
            <input name="end_date" type="date" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label>Company ID</label>
            <input name="company_id" placeholder="Company ID" type="number" onChange={handleChange} />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" type="submit">Create</button>
            <button type="reset" className="btn" onClick={() => { setForm({ field: '', stipend: '', mode: '', start_date: '', end_date: '', company_id: '' }); setResponse(null); }}>Reset</button>
          </div>
        </form>

        {response && (
          <pre style={{ marginTop: 12 }}>{JSON.stringify(response, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
