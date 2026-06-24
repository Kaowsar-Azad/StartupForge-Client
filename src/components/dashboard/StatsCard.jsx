"use client";

// Reusable stats card for dashboard overview sections
export default function StatsCard({ title, value, icon, color = "#6366f1" }) {
  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-icon" style={{ color }}>{icon}</div>
      <div className="stats-info">
        <p className="stats-title">{title}</p>
        <h3 className="stats-value">{value}</h3>
      </div>
    </div>
  );
}
