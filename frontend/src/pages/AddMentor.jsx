import { useState } from "react";
import api from "../api";

export default function AddMentor() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    dob: ""
  });

  const [result, setResult] = useState(null);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      const res = await api.post("/entries/mentor", form);
      setResult(res.data);
    } catch (err) {
      setResult(err.response?.data || err.message);
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1 className="text-3xl font-bold mb-6">Add Mentor</h1>

      <div className="tool-card">
        <div className="tool-form">

          <input name="first_name" placeholder="First Name"
            value={form.first_name} onChange={handle} />

          <input name="last_name" placeholder="Last Name"
            value={form.last_name} onChange={handle} />

          <input type="date" name="dob"
            value={form.dob} onChange={handle} />

          <button className="btn" onClick={submit}>Add Mentor</button>
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
