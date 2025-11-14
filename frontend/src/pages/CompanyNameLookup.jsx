import { useState } from "react";
import { getCompanyName } from "../api";

export default function CompanyNameLookup() {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const res = await getCompanyName(id);
    setResult(res.data);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Company Name Lookup</h1>

      <div className="card max-w-xl">
        <form className="form" onSubmit={submit}>
          <div className="form-row">
            <label>Company ID</label>
            <input
              type="number"
              placeholder="Enter Company ID"
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <button className="btn">Lookup</button>
        </form>
      </div>

      {result && (
        <pre className="mt-6">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
