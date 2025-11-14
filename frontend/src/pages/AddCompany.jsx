import { useState } from "react";
import api from "../api";

export default function AddCompany() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    location: "",
    contact: ""
  });

  const [result, setResult] = useState(null);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      const res = await api.post("/entries/company", form);
      setResult(res.data);
    } catch (err) {
      setResult(err.response?.data || err.message);
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1 className="text-3xl font-bold mb-6">Add Company</h1>

      <div className="tool-card">
        <div className="tool-form">
          <input name="name" placeholder="Company Name"
            value={form.name} onChange={handle} />

          <input name="type" placeholder="Type"
            value={form.type} onChange={handle} />

          <input name="location" placeholder="Location"
            value={form.location} onChange={handle} />

          <input name="contact" placeholder="Contact"
            value={form.contact} onChange={handle} />

          <button className="btn" onClick={submit}>Add Company</button>
        </div>
      </div>

      {result && (
        <div className="tool-result">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
