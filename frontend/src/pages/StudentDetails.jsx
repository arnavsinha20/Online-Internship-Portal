import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getStudentDetails,
  getStudentAge,
  getApplicationCount,
  hasAccepted
} from "../api";

export default function StudentDetails() {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [age, setAge] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getStudentDetails(id),
      getStudentAge(id),
      getApplicationCount(id, "Pending"),
      getApplicationCount(id, "Accepted"),
      getApplicationCount(id, "Rejected"),
      hasAccepted(id),
    ]).then(([d, a, p, ac, r, h]) => {
      setInfo(d.data);
      setAge(a.data.age);
      setSummary({
        Pending: p.data.count,
        Accepted: ac.data.count,
        Rejected: r.data.count,
        HasAccepted: h.data.hasAccepted,
      });
    })
    .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="app-container">Loading…</div>;

  return (
    <div className="app-container">
      <h1>{info.first_name} {info.last_name}</h1>
      <p className="lead">
        College: {info.college_name} • Mentor: {info.mentor_name}
      </p>
      <p className="text-muted">Age: {age}</p>

      <hr />

      <h2>Applications</h2>
      <p>Pending: {summary.Pending}</p>
      <p>Accepted: {summary.Accepted}</p>
      <p>Rejected: {summary.Rejected}</p>
      <p>Has Accepted? {summary.HasAccepted ? "Yes" : "No"}</p>
    </div>
  );
}
