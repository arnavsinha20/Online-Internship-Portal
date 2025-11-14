import { useState } from "react";
import { deleteStudentAPI } from "../api";

export default function DeleteStudent() {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const res = await deleteStudentAPI(id).catch((err) => err.response.data);
    setResult(res.data || res);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Delete Student</h1>

      <div className="card max-w-xl">
        <form className="form" onSubmit={submit}>
          <div className="form-row">
            <label>Student ID</label>
            <input
              type="number"
              placeholder="Enter Student ID"
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <button className="btn" style={{ background: "#ff4f4f" }}>
            Delete
          </button>
        </form>
      </div>

      {result && (
        <pre className="mt-6">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
