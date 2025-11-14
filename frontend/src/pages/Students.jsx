import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudents } from "../api";


export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudents()
      .then(res => setStudents(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="app-container">Loading…</div>;

  return (
    <div className="app-container">
      <h1>Students</h1>

      <div className="grid">
        {students.map(s => (
          <div key={s.student_id} className="card">
            <h3>{s.first_name} {s.last_name} #{s.student_id}</h3>
            <p className="text-muted">College: {s.college_name}</p>
            <p className="text-muted">Mentor: {s.mentor_name}</p>
            <Link to={`/student/${s.student_id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
