import { Link } from "react-router-dom";

export default function DashboardCard({ title, desc, to }) {
  return (
    <Link
      to={to}
      className="card dashboard-card"
      style={{
        padding: "1.5rem",
        borderRadius: "12px",
        textDecoration: "none",
        color: "inherit",
        display: "block",
        transition: "0.2s",
      }}
    >
      <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: ".5rem" }}>
        {title}
      </h2>
      <p className="lead">{desc}</p>
    </Link>
  );
}
