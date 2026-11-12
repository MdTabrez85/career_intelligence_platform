import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../App.css";

interface StudentProfileData {
  phone: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  targetRole: string;
  preferredDomain: string;
  preferredLocation: string;
  expectedSalary: string;
  bio: string;
}

const emptyProfile: StudentProfileData = {
  phone: "",
  location: "",
  linkedinUrl: "",
  githubUrl: "",
  targetRole: "",
  preferredDomain: "",
  preferredLocation: "",
  expectedSalary: "",
  bio: "",
};

export default function StudentProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [profile, setProfile] =
    useState<StudentProfileData>(emptyProfile);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "info"
  >("info");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/profile");

        setProfile({
          phone: response.data.phone ?? "",
          location: response.data.location ?? "",
          linkedinUrl: response.data.linkedinUrl ?? "",
          githubUrl: response.data.githubUrl ?? "",
          targetRole: response.data.targetRole ?? "",
          preferredDomain: response.data.preferredDomain ?? "",
          preferredLocation: response.data.preferredLocation ?? "",
          expectedSalary:
            response.data.expectedSalary?.toString() ?? "",
          bio: response.data.bio ?? "",
        });
      } catch (error: any) {
        if (error.response?.status === 404) {
          setMessage(
            "No profile found yet. Complete your details and save your profile."
          );
          setMessageType("info");
        } else if (error.response?.status === 401) {
          setMessage("Your session has expired. Please log in again.");
          setMessageType("error");
        } else {
          setMessage("Unable to load your profile. Please try again.");
          setMessageType("error");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    const payload = {
      ...profile,
      expectedSalary: profile.expectedSalary
        ? Number(profile.expectedSalary)
        : null,
    };

    try {
      try {
        await api.put("/profile", payload);
        setMessage("Your profile has been updated successfully!");
      } catch (error: any) {
        if (error.response?.status === 404) {
          await api.post("/profile", payload);
          setMessage("Your profile has been created successfully!");
        } else {
          throw error;
        }
      }

      setMessageType("success");
    } catch (error: any) {
      if (error.response?.status === 401) {
        setMessage("Please log in again to save your profile.");
      } else if (error.response?.status === 409) {
        setMessage(
          "A profile already exists. Reload the page and try again."
        );
      } else {
        setMessage(
          error.response?.data?.message ??
            "Unable to save your profile. Please try again."
        );
      }

      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <main className="page-container">
        <div className="card" style={{ textAlign: "center", padding: "48px 20px" }}>
          <h2>Loading your profile...</h2>
          <p>Please wait while we retrieve your career information.</p>
        </div>
      </main>
    );
  }

  return (
    <div className="app-container">
      {/* Navigation */}
      <header className="top-navigation">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="brand-name"
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
          }}
        >
          <span style={{ color: "#2563eb", marginRight: "10px" }}>
            ✦
          </span>
          Career Intelligence
        </button>

        <div className="navigation-actions">
          <span style={{ color: "#64748b" }}>
            {user?.name || "My Account"}
          </span>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
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

      <main className="page-container">
        {/* Page Heading */}
        <section className="page-header">
          <p
            style={{
              color: "#2563eb",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            YOUR PROFESSIONAL IDENTITY
          </p>

          <h1>Student Profile</h1>

          <p className="page-subtitle">
            Tell us about yourself, your skills, and your career goals.
            This information will help personalize your future career
            recommendations.
          </p>
        </section>

        {/* Information Banner */}
        <section
          className="card"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "24px",
            background: "#eff6ff",
            borderColor: "#bfdbfe",
          }}
        >
          <span style={{ fontSize: "28px" }}>🎯</span>

          <div>
            <h3 style={{ marginBottom: "6px" }}>
              Build your career profile
            </h3>

            <p style={{ margin: 0 }}>
              Keep your information up to date to prepare for
              personalized career guidance, job matching, and skill-gap
              analysis as these features become available.
            </p>
          </div>
        </section>

        {/* Status Message */}
        {message && (
          <div
            className={`alert ${
              messageType === "success"
                ? "alert-success"
                : messageType === "error"
                  ? "alert-error"
                  : "alert-info"
            }`}
            role="status"
            aria-live="polite"
            style={{ marginBottom: "24px" }}
          >
            {message}
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          <section className="card" style={{ marginBottom: "24px" }}>
            <h2 className="card-title">Personal Information</h2>

            <p style={{ marginTop: "-8px", marginBottom: "24px" }}>
              Add your contact details and current location.
            </p>

            <div className="profile-grid">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Current Location</label>
                <input
                  id="location"
                  name="location"
                  placeholder="e.g. Bengaluru, India"
                  value={profile.location}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="linkedinUrl">LinkedIn Profile</label>
                <input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  type="url"
                  placeholder="https://www.linkedin.com/in/your-profile"
                  value={profile.linkedinUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="githubUrl">GitHub Profile</label>
                <input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  placeholder="https://github.com/your-username"
                  value={profile.githubUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <section className="card" style={{ marginBottom: "24px" }}>
            <h2 className="card-title">Career Preferences</h2>

            <p style={{ marginTop: "-8px", marginBottom: "24px" }}>
              Tell us what kind of role and opportunities you are
              targeting.
            </p>

            <div className="profile-grid">
              <div className="form-group">
                <label htmlFor="targetRole">Target Job Role</label>
                <input
                  id="targetRole"
                  name="targetRole"
                  placeholder="e.g. AI Engineer"
                  value={profile.targetRole}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="preferredDomain">
                  Preferred Domain
                </label>
                <input
                  id="preferredDomain"
                  name="preferredDomain"
                  placeholder="e.g. Artificial Intelligence"
                  value={profile.preferredDomain}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="preferredLocation">
                  Preferred Work Location
                </label>
                <input
                  id="preferredLocation"
                  name="preferredLocation"
                  placeholder="e.g. Bengaluru or Remote"
                  value={profile.preferredLocation}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="expectedSalary">
                  Expected Annual Salary (INR)
                </label>
                <input
                  id="expectedSalary"
                  name="expectedSalary"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 1200000"
                  value={profile.expectedSalary}
                  onChange={handleChange}
                />
              </div>

              <div
                className="form-group profile-field-full"
              >
                <label htmlFor="bio">Professional Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={5}
                  placeholder="Describe your background, experience, skills, and career goals..."
                  value={profile.bio}
                  onChange={handleChange}
                />

                <small style={{ color: "#64748b" }}>
                  Briefly describe your professional background and what
                  you want to achieve next.
                </small>
              </div>
            </div>
          </section>

          {/* Form Actions */}
          <div
            className="profile-actions"
            style={{ marginBottom: "32px" }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/dashboard")}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? "Saving Profile..." : "Save Profile"}
            </button>
          </div>
        </form>

        <footer
          style={{
            textAlign: "center",
            paddingBottom: "24px",
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
