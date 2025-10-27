import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="app-title">🎫 TicketApp</h1>
        <p className="app-tagline">Manage your tickets easily and efficiently</p>
      </header>

      <main className="landing-main">
        <p className="landing-description">
          A simple and powerful way to track, organize, and manage all your tickets — built for teams and individuals.
        </p>
        <div className="landing-buttons">
          <Link to="/auth/login" className="btn">Login</Link>
          <Link to="/auth/signup" className="btn btn-outline">Get Started</Link>
        </div>
      </main>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} TicketApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
