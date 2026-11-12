import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const firstName = user?.name?.trim().split(/\s+/)[0] || "there";

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <header className="top-navigation">
        <div className="brand-name">
          <span style={{ color: "#2563eb", marginRight: "10px" }}>✦</span>
          Career Intelligence
        </div>

        <div className="navigation-actions">
          <span style={{ color: "#64748b" }}>
            {user?.role || "User"}
          </span>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/student-profile")}
          >
            My Profile
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="page-container">
        <section className="page-header">
          <p
            style={{
              color: "#2563eb",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            YOUR CAREER WORKSPACE
          </p>

          <h1>Welcome back, {firstName}! 👋</h1>

          <p className="page-subtitle">
            Your journey toward your next career opportunity starts here.
            Manage your profile and prepare for your professional future.
          </p>
        </section>

        {/* Overview Cards */}
        <section className="dashboard-grid">
          <article className="dashboard-card">
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>
              👤
            </div>

            <h3>My Profile</h3>

            <p>
              Keep your professional information, career preferences, and
              target role up to date.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/student-profile")}
            >
              Manage Profile →
            </button>
          </article>

          <article className="dashboard-card">
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>
              ✨
            </div>

            <h3>AI Career Advisor</h3>

            <p>
              Get ready to explore personalized career guidance and
              AI-powered recommendations.
            </p>

            <span
              style={{
                display: "inline-block",
                marginTop: "8px",
                color: "#64748b",
                fontSize: "12px",
              }}
            >
              Coming soon
            </span>
          </article>

          <article className="dashboard-card">
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>
              📄
            </div>

            <h3>Resume Intelligence</h3>

            <p>
              Upload and manage your resumes, explore skill extraction,
              and get personalized improvement suggestions.
            </p>

            <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/resume")}
              >
                 Manage Resume →
             </button>
          </article>
        </section>

        {/* Account Information */}
        <section
          className="card"
          style={{ marginTop: "28px" }}
        >
          <h2 className="card-title">Account Overview</h2>

          <div className="profile-grid">
            <div>
              <p style={{ marginBottom: "4px", fontSize: "13px" }}>
                Full Name
              </p>

              <strong>{user?.name || "Not available"}</strong>
            </div>

            <div>
              <p style={{ marginBottom: "4px", fontSize: "13px" }}>
                Email Address
              </p>

              <strong>{user?.email || "Not available"}</strong>
            </div>

            <div>
              <p style={{ marginBottom: "4px", fontSize: "13px" }}>
                Account Role
              </p>

              <strong>{user?.role || "Not available"}</strong>
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/student-profile")}
            >
              Update Career Profile
            </button>
          </div>
        </section>

        <footer
          style={{
            textAlign: "center",
            marginTop: "36px",
            paddingBottom: "20px",
            color: "#94a3b8",
            fontSize: "12px",
          }}
        >
          Career Intelligence Platform · Your future, intelligently planned.
        </footer>
      </main>
    </div>
  );
}