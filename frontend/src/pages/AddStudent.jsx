import { useState } from "react";
import api from "../api";

export default function AddStudent() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    college_id: "",
    mentor_id: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const res = await api.post("/entries/student", form);
      setResult(res.data);
    } catch (err) {
      setResult(err.response?.data || err.message);
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1 className="text-3xl font-bold mb-6">Add Student</h1>

      <div className="tool-card">
        <div className="tool-form">
          <div className="tool-row">
            <input name="first_name" placeholder="First Name"
              value={form.first_name} onChange={handleChange} />
          </div>

          <div className="tool-row">
            <input name="last_name" placeholder="Last Name"
              value={form.last_name} onChange={handleChange} />
          </div>

          <div className="tool-row">
            <input type="date" name="dob" value={form.dob} onChange={handleChange} />
          </div>

          <div className="tool-row">
            <input name="college_id" placeholder="College ID"
              value={form.college_id} onChange={handleChange} />
          </div>

          <div className="tool-row">
            <input name="mentor_id" placeholder="Mentor ID"
              value={form.mentor_id} onChange={handleChange} />
          </div>

          <button className="btn" onClick={submit}>Add Student</button>
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
