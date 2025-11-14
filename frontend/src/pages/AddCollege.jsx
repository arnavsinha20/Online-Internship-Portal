import { useState } from "react";
import api from "../api";

export default function AddCollege() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    contact: ""
  });

  const [result, setResult] = useState(null);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      const res = await api.post("/entries/college", form);
      setResult(res.data);
    } catch (err) {
      setResult(err.response?.data || err.message);
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1 className="text-3xl font-bold mb-6">Add College</h1>

      <div className="tool-card">
        <div className="tool-form">

          <input name="name" placeholder="College Name"
            value={form.name} onChange={handle} />

          <input name="address" placeholder="Address"
            value={form.address} onChange={handle} />

          <input name="contact" placeholder="Contact"
            value={form.contact} onChange={handle} />

          <button className="btn" onClick={submit}>Add College</button>
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
