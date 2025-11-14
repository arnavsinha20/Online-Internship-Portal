import { useState } from "react";
import api from "../api";

export default function UpdateStudent() {
  const [id, setId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [college_id, setCollegeId] = useState("");
  const [mentor_id, setMentorId] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    try {
      setError(null);
      const res = await api.put(`/students/${id}/update`, {
        first_name,
        last_name,
        dob,
        college_id,
        mentor_id,
      });
      setMsg(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Update failed");
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1 className="text-3xl font-bold mb-4">Update Student Details</h1>

      <div className="tool-card">
        <div className="tool-form">
          <div className="tool-row">
            <label>Student ID</label>
            <input value={id} onChange={(e) => setId(e.target.value)} />
          </div>
          <div className="tool-row">
            <label>First Name</label>
            <input value={first_name} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="tool-row">
            <label>Last Name</label>
            <input value={last_name} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="tool-row">
            <label>DOB</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div className="tool-row">
            <label>College ID</label>
            <input value={college_id} onChange={(e) => setCollegeId(e.target.value)} />
          </div>
          <div className="tool-row">
            <label>Mentor ID</label>
            <input value={mentor_id} onChange={(e) => setMentorId(e.target.value)} />
          </div>

          <button className="btn" onClick={handleUpdate}>Update</button>

          {msg && <div className="tool-result">{msg}</div>}
          {error && <div className="tool-result" style={{ color: "red" }}>{error}</div>}
        </div>
      </div>
    </div>
  );
}
