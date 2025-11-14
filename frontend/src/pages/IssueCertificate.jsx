import { useState } from "react";
import { issueCertificate } from "../api";

export default function IssueCertificate() {
  const [internshipId, setInternshipId] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await issueCertificate({
        internship_id: internshipId
      });

      setMessage(
        `✔️ Certificate ID: ${res.data.certificate_id}
         📅 Date: ${res.data.issue_date}
         🎓 Status: ${res.data.status}`
      );

    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="app-container">
      <h1>Issue Certificate</h1>

      <form className="form" onSubmit={submit}>
        <div className="form-row">
          <label>Internship ID</label>
          <input
            type="number"
            value={internshipId}
            onChange={(e) => setInternshipId(e.target.value)}
            required
          />
        </div>

        <button className="btn">Issue</button>
      </form>

      {message && (
        <div className="card" style={{ marginTop: 16 }}>
          {message}
        </div>
      )}
    </div>
  );
}
