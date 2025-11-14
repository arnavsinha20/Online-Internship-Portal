import { useState } from "react";
import api from "../api";

export default function ApplyInternship() {
  const [form, setForm] = useState({ student_id: '', company_id: '' });
  const [resp, setResp] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const r = await api.post('/applications/apply', form);
      setResp(r.data);
    } catch (err) {
      setResp({ error: err.response?.data || err.message });
    }
  };

  return (
    <div className="app-container">
      <h1 className="text-3xl font-bold mb-6">Apply for Internship</h1>
      <form onSubmit={handleSubmit} className="form max-w-xl">
        <div className="form-row">
          <label>Student ID</label>
          <input name="student_id" className="w-full border rounded" onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Company ID</label>
          <input name="company_id" className="w-full border rounded" onChange={handleChange} />
        </div>
        <button className="btn">Apply</button>
      </form>

      {resp && <div style={{ marginTop: 12 }} className="card"><pre>{JSON.stringify(resp, null, 2)}</pre></div>}
    </div>
  );
}
