import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, logout } from "../services/auth";
import { listTickets } from "../services/tickets";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });

  useEffect(() => {
    const session = getSession();
    if (!session) return navigate("/auth/login");

    const tickets = listTickets(session.user.email);
    const open = tickets.filter(t => t.status === "open").length;
    const closed = tickets.filter(t => t.status === "closed").length;

    setStats({ total: tickets.length, open, closed });
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-outline">
          Logout
        </button>
      </header>

      <section className="stats-section">
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card open">
          <h3>Open</h3>
          <p>{stats.open}</p>
        </div>
        <div className="stat-card closed">
          <h3>Closed</h3>
          <p>{stats.closed}</p>
        </div>
      </section>

      <div className="dashboard-actions">
        <Link to="/tickets" className="btn">
          Manage Tickets
        </Link>
      </div>
    </div>
  );
}
