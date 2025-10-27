import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "../services/auth";
import { listTickets, saveTicket, deleteTicket } from "../services/tickets";

export default function Tickets() {
  const navigate = useNavigate();
  const session = getSession();
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ title: "", status: "open", description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) return navigate("/auth/login");
    loadTickets();
  }, []);

  const loadTickets = () => {
    const list = listTickets(session.user.email);
    setTickets(list);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      saveTicket(session.user.email, form);
      setForm({ title: "", status: "open", description: "" });
      setError("");
      loadTickets();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      deleteTicket(session.user.email, id);
      loadTickets();
    }
  };

  return (
    <div className="tickets-container">
      <header className="tickets-header">
        <h2>Manage Tickets</h2>
        <button className="btn btn-outline" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </header>

      <form onSubmit={handleSubmit} className="ticket-form">
        <h3>Create a Ticket</h3>
        {error && <p className="error-msg">{error}</p>}

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional short note..."
        />

        <button type="submit" className="btn">Save Ticket</button>
      </form>

      <section className="ticket-list">
        <h3>All Tickets</h3>
        {tickets.length === 0 ? (
          <p>No tickets yet.</p>
        ) : (
          tickets.map((t) => (
            <div key={t.id} className={`ticket-card ${t.status}`}>
              <h4>{t.title}</h4>
              <p>{t.description || "No description provided."}</p>
              <span className={`status-tag ${t.status}`}>{t.status}</span>
              <div className="ticket-actions">
                <button onClick={() => handleDelete(t.id)} className="btn btn-outline">Delete</button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
