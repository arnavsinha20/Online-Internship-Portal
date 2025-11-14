import { useState } from "react";
import api from "../api";

export default function AddGoodies() {
  const [internship_id, setInternshipId] = useState("");
  const [hoodie, setHoodie] = useState(false);
  const [cup, setCup] = useState(false);
  const [bottle, setBottle] = useState(false);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  const handleAdd = async () => {
    try {
      setError(null);
      const res = await api.post("/misc/goodies/add", {
        internship_id,
        hoodie,
        cup,
        bottle,
      });
      setMsg(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Error adding goodies");
    }
  };

  return (
    <div className="app-container tool-wrap">
      <h1 className="text-3xl font-bold mb-4">Add Goodies Record</h1>

      <div className="tool-card">
        <div className="tool-form">
          <div className="tool-row">
            <label>Internship ID</label>
            <input value={internship_id} onChange={(e) => setInternshipId(e.target.value)} />
          </div>

          <div className="tool-row">
            <label>
              <input type="checkbox" checked={hoodie} onChange={() => setHoodie(!hoodie)} /> Hoodie
            </label>
            <label>
              <input type="checkbox" checked={cup} onChange={() => setCup(!cup)} /> Cup
            </label>
            <label>
              <input type="checkbox" checked={bottle} onChange={() => setBottle(!bottle)} /> Bottle
            </label>
          </div>

          <button className="btn" onClick={handleAdd}>Add Goodies</button>

          {msg && <div className="tool-result">{msg}</div>}
          {error && <div className="tool-result" style={{ color: "red" }}>{error}</div>}
        </div>
      </div>
    </div>
  );
}
