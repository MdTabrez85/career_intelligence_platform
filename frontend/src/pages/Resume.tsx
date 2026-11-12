
import { useEffect, useState, type FormEvent } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ResumeItem {
  id: number;
  originalFilename: string;
  contentType: string;
  fileSize: number;
  uploadedAt: string;
  parsingStatus: string;
  extractedTextLength: number;
  parsingError: string | null;
}

interface SkillExtractionResult {
  total_skills: number;
  skills_by_category: Record<string, string[]>;
}

interface JobMatchResult {
  job_role: string;
  match_percentage: number;
  total_required_skills: number;
  matched_skill_count: number;
  missing_skill_count: number;
  matched_skills: string[];
  missing_skills: string[];
}

interface SkillGapItem {
  skill: string;
  priority: string;
  what_to_learn: string;
  practice_task: string;
}

interface SkillGapResult {
  recommendations: SkillGapItem[];
}

function Resume() {
  const [file, setFile] = useState<File | null>(null);
  const [resumes, setResumes] = useState<ResumeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Resume text preview
  const [previewText, setPreviewText] = useState("");
  const [previewFilename, setPreviewFilename] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState("");

  // AI Skill Extraction
  const [skillResult, setSkillResult] =
    useState<SkillExtractionResult | null>(null);
  const [skillLoading, setSkillLoading] = useState(false);
  const [skillError, setSkillError] = useState("");

  // Job Role Matching
  const [selectedJobRole, setSelectedJobRole] =
    useState("Java Developer");

  const [jobMatchResult, setJobMatchResult] =
    useState<JobMatchResult | null>(null);

  const [jobMatchLoading, setJobMatchLoading] = useState(false);
  const [jobMatchError, setJobMatchError] = useState("");

  // Skill Gap Analysis
  const [skillGapResult, setSkillGapResult] =
    useState<SkillGapResult | null>(null);

  const [skillGapLoading, setSkillGapLoading] = useState(false);
  const [skillGapError, setSkillGapError] = useState("");

  const navigate = useNavigate();
  const { logout } = useAuth();

  // Load uploaded resumes
  const fetchResumes = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/resumes");
      setResumes(response.data);
    } catch {
      setError("Unable to load your uploaded resumes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // Upload resume
  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!file) {
      setError("Please select a resume file.");
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!["pdf", "docx"].includes(extension || "")) {
      setError("Only PDF and DOCX files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must not exceed 5 MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const response = await api.post("/resumes/upload", formData);
      const status = response.data.parsingStatus;

      if (status === "COMPLETED") {
        setMessage(
          "Resume uploaded successfully! Text extraction completed."
        );
      } else {
        setMessage(
          "Resume uploaded successfully, but text extraction needs attention."
        );
      }

      setFile(null);

      const fileInput = document.getElementById(
        "resumeFile"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      await fetchResumes();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Resume upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  // Format upload date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  // Resume extraction status styling
  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return {
          color: "#166534",
          backgroundColor: "#dcfce7",
          label: "Extraction Completed",
        };

      case "FAILED":
        return {
          color: "#991b1b",
          backgroundColor: "#fee2e2",
          label: "Extraction Failed",
        };

      default:
        return {
          color: "#92400e",
          backgroundColor: "#fef3c7",
          label: "Pending",
        };
    }
  };

  // Preview extracted resume text
  const handlePreview = async (resumeId: number) => {
    setPreviewLoading(true);
    setPreviewError("");
    setPreviewText("");
    setPreviewFilename("");

    // Clear previous AI analysis
    setSkillResult(null);
    setSkillError("");

    try {
      const response = await api.get(`/resumes/${resumeId}/text`);

      setPreviewText(response.data.extractedText);
      setPreviewFilename(response.data.originalFilename);
    } catch (err: any) {
      setPreviewError(
        err.response?.data?.message ||
          "Unable to retrieve extracted resume text."
      );
    } finally {
      setPreviewLoading(false);
    }
  };

  // Extract skills using Python AI service through Spring Boot
  const handleExtractSkills = async () => {
    if (!previewText.trim()) {
      setSkillError("Please preview your resume text first.");
      return;
    }

    setSkillLoading(true);
    setSkillError("");
    setSkillResult(null);

    try {
      const response = await api.post("/ai/skills/extract", {
        resume_text: previewText,
      });

      setSkillResult(response.data);
    } catch (err: any) {
      setSkillError(
        err.response?.data?.message ||
          "Unable to extract skills. Please try again."
      );
    } finally {
      setSkillLoading(false);
    }
  };

  const handleJobMatch = async () => {
    if (!skillResult || skillResult.total_skills === 0) {
      setJobMatchError(
        "Please extract technical skills from your resume first."
      );
      return;
    }

      setJobMatchLoading(true);
      setJobMatchError("");
      setJobMatchResult(null);

    try {
      const response = await api.post("/ai/jobs/match", {
        candidate_skills: skillResult.skills_by_category,
        job_role: selectedJobRole,
      });

      setJobMatchResult(response.data);
    } catch (err: any) {
      setJobMatchError(
        err.response?.data?.message ||
          "Unable to match your resume with the selected job role."
      );
    } finally {
      setJobMatchLoading(false);
    }
  };

  // Analyze missing skills
  const handleSkillGapAnalysis = async () => {
    if (!jobMatchResult || jobMatchResult.missing_skill_count === 0) {
      setSkillGapError("Please complete Job Role Matching first.");
      return;
    }

    setSkillGapLoading(true);
    setSkillGapError("");
    setSkillGapResult(null);

    try {
      const response = await api.post("/ai/skills/gap-analysis", {
        missing_skills: jobMatchResult.missing_skills,
      });

      setSkillGapResult(response.data);
    } catch (err: any) {
      setSkillGapError(
        err.response?.data?.message ||
          "Unable to perform Skill Gap Analysis. Please try again."
      );
    } finally {
      setSkillGapLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="top-navigation">
        <div className="brand-name">
          Career Intelligence
        </div>

        <div className="navigation-actions">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="page-container">
        {/* Page Header */}
        <header className="page-header">
          <h1>Resume Intelligence</h1>

          <p className="page-subtitle">
            Upload and manage your resumes. Track text extraction
            results and prepare for AI-powered career analysis.
          </p>
        </header>

        {/* Upload Section */}
        <section className="card">
          <h2 className="card-title">
            Upload Your Resume
          </h2>

          <form onSubmit={handleUpload}>
            <div className="form-group">
              <label htmlFor="resumeFile">
                Choose Resume (PDF or DOCX)
              </label>

              <input
                id="resumeFile"
                type="file"
                accept=".pdf,.docx"
                onChange={(event) =>
                  setFile(event.target.files?.[0] || null)
                }
              />

              <small>
                Maximum file size: 5 MB
              </small>
            </div>

            {file && (
              <p>Selected file: {file.name}</p>
            )}

            {message && (
              <div className="alert alert-success">
                {message}
              </div>
            )}

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </form>
        </section>

        {/* Uploaded Resume List */}
        <section className="card">
          <h2 className="card-title">
            My Uploaded Resumes
          </h2>

          {loading ? (
            <p>Loading resumes...</p>
          ) : resumes.length === 0 ? (
            <p>No resumes uploaded yet.</p>
          ) : (
            <div>
              {resumes.map((resume) => {
                const statusStyle = getStatusStyle(
                  resume.parsingStatus
                );

                return (
                  <div
                    key={resume.id}
                    className="dashboard-card"
                    style={{ marginBottom: "16px" }}
                  >
                    <h3>
                      📄 {resume.originalFilename}
                    </h3>

                    <p>
                      <strong>File size:</strong>{" "}
                      {formatFileSize(resume.fileSize)}
                    </p>

                    <p>
                      <strong>File type:</strong>{" "}
                      {resume.contentType}
                    </p>

                    <p>
                      <strong>Uploaded:</strong>{" "}
                      {formatDate(resume.uploadedAt)}
                    </p>

                    {/* Extraction Status */}
                    <div style={{ marginTop: "16px" }}>
                      <strong>Text Extraction Status:</strong>

                      <div
                        style={{
                          display: "inline-block",
                          marginLeft: "10px",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: statusStyle.color,
                          backgroundColor: statusStyle.backgroundColor,
                        }}
                      >
                        {statusStyle.label}
                      </div>
                    </div>

                    {/* Extracted Text Length */}
                    <p style={{ marginTop: "14px" }}>
                      <strong>Extracted Characters:</strong>{" "}
                      {resume.extractedTextLength ?? 0}
                    </p>

                    {/* Preview Button */}
                    {resume.parsingStatus === "COMPLETED" && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: "12px" }}
                        disabled={previewLoading}
                        onClick={() => handlePreview(resume.id)}
                      >
                        {previewLoading
                          ? "Loading..."
                          : "Preview Extracted Text"}
                      </button>
                    )}

                    {resume.parsingStatus === "COMPLETED" && (
                      <p
                        style={{
                          marginTop: "8px",
                          color: "#15803d",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        ✓ Text successfully extracted and stored in PostgreSQL.
                      </p>
                    )}

                    {/* Extraction Error */}
                    {resume.parsingError && (
                      <div
                        className="alert alert-error"
                        style={{ marginTop: "12px" }}
                      >
                        {resume.parsingError}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Resume Text Preview */}
        {previewText && (
          <section className="card" style={{ marginTop: "24px" }}>
            <h2 className="card-title">
              Resume Text Preview
            </h2>

            <h3>{previewFilename}</h3>

            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "20px",
                marginTop: "16px",
                maxHeight: "450px",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
                lineHeight: "1.7",
                fontSize: "14px",
                color: "#334155",
              }}
            >
              {previewText}
            </div>

            {/* AI Skill Extraction Button */}
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: "16px", marginRight: "10px" }}
              disabled={skillLoading}
              onClick={handleExtractSkills}
            >
              {skillLoading
                ? "Analyzing Resume..."
                : "Extract Skills with AI"}
            </button>

            {/* Close Preview Button */}
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginTop: "16px" }}
              onClick={() => {
                setPreviewText("");
                setPreviewFilename("");
                setSkillResult(null);
                setSkillError("");
              }}
            >
              Close Preview
            </button>
          </section>
        )}

        {/* Preview Error */}
        {previewError && (
          <div className="alert alert-error" style={{ marginTop: "16px" }}>
            {previewError}
          </div>
        )}

        {/* AI Skill Extraction Error */}
        {skillError && (
          <div className="alert alert-error" style={{ marginTop: "16px" }}>
            {skillError}
          </div>
        )}

        {/* AI Skill Analysis Results */}
        {skillResult && (
          <section className="card" style={{ marginTop: "24px" }}>
            <h2 className="card-title">
              AI Resume Skill Analysis
            </h2>

            <h3>
              Total Skills Identified: {skillResult.total_skills}
            </h3>

            {Object.entries(skillResult.skills_by_category).map(
              ([category, skills]) => (
                <div
                  key={category}
                  style={{ marginTop: "20px" }}
                >
                  <h3>{category}</h3>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          backgroundColor: "#dbeafe",
                          color: "#1e40af",
                          padding: "7px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}

            {skillResult.total_skills === 0 && (
              <p>No recognized skills were found in this resume.</p>
            )}
         
            {/* Job Role Matching */}
            {skillResult.total_skills > 0 && (
              <div
                style={{
                  marginTop: "30px",
                  paddingTop: "24px",
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                <h2>Job Role Matching</h2>

                <p>
                  Select your target job role to compare your resume
                  skills with the required skills.
                </p>

                <div className="form-group" style={{ marginTop: "16px" }}>
                  <label htmlFor="jobRole">
                    Select Target Job Role
                  </label>

                  <select
                    id="jobRole"
                    value={selectedJobRole}
                    onChange={(event) => {
                      setSelectedJobRole(event.target.value);
                      setJobMatchResult(null);
                      setJobMatchError("");
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      maxWidth: "400px",
                      padding: "12px",
                      marginTop: "8px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="Java Developer">Java Developer</option>
                    <option value="Python Developer">Python Developer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="React Developer">React Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Software Test Engineer">
                      Software Test Engineer
                    </option>
                  </select>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginTop: "16px" }}
                  disabled={jobMatchLoading}
                  onClick={handleJobMatch}
                >
                  {jobMatchLoading
                    ? "Analyzing Job Match..."
                    : "Match My Resume"}
                </button>

                {jobMatchError && (
                  <div
                    className="alert alert-error"
                    style={{ marginTop: "16px" }}
                  >
                    {jobMatchError}
                  </div>
                )}
              </div>
            )}
          </section>
        )}
 
        {/* Job Matching Results */}
        {jobMatchResult && (
          <section className="card" style={{ marginTop: "24px" }}>
            <h2 className="card-title">
              Job Matching Results
            </h2>

            <h3>{jobMatchResult.job_role}</h3>

            {/* Match Percentage */}
            <div style={{ marginTop: "20px" }}>
              <h1
                style={{
                  fontSize: "42px",
                  color: "#2563eb",
                  margin: "10px 0",
                }}
              >
                {jobMatchResult.match_percentage}%
              </h1>

              <p>Overall Job Match Score</p>

              <div
                style={{
                  width: "100%",
                  height: "12px",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(0, jobMatchResult.match_percentage)
                    )}%`,
                    height: "100%",
                    backgroundColor: "#2563eb",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>

            {/* Match Statistics */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                marginTop: "24px",
              }}
            >
              <div>
                <h2 style={{ color: "#15803d" }}>
                  {jobMatchResult.matched_skill_count}
                </h2>
                <p>Matched Skills</p>
              </div>

              <div>
                <h2 style={{ color: "#dc2626" }}>
                  {jobMatchResult.missing_skill_count}
                </h2>
                <p>Missing Skills</p>
              </div>

              <div>
                <h2>
                  {jobMatchResult.total_required_skills}
                </h2>
                <p>Total Required Skills</p>
              </div>
            </div>

            {/* Matched Skills */}
            <div style={{ marginTop: "24px" }}>
              <h3 style={{ color: "#15803d" }}>
                ✓ Matched Skills
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "12px",
                }}
              >
                {jobMatchResult.matched_skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      backgroundColor: "#dcfce7",
                      color: "#166534",
                      padding: "8px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div style={{ marginTop: "24px" }}>
              <h3 style={{ color: "#dc2626" }}>
                ✗ Missing Skills
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "12px",
                }}
              >
                {jobMatchResult.missing_skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      backgroundColor: "#fee2e2",
                      color: "#991b1b",
                      padding: "8px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Skill Gap Analysis Button */}
            {jobMatchResult.missing_skill_count > 0 && (
              <div style={{ marginTop: "30px" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={skillGapLoading}
                  onClick={handleSkillGapAnalysis}
                >
                  {skillGapLoading
                    ? "Analyzing Skill Gaps..."
                    : "Analyze My Skill Gaps"}
                </button>

                {skillGapError && (
                  <div
                    className="alert alert-error"
                    style={{ marginTop: "16px" }}
                  >
                    {skillGapError}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Skill Gap Analysis Results */}
        {skillGapResult && (
          <section className="card" style={{ marginTop: "24px" }}>
            <h2 className="card-title">
              AI Skill Gap Analysis
            </h2>

            <p>
              Personalized recommendations to help you prepare for your
              selected job role.
            </p>

            {skillGapResult.recommendations.map((item) => (
              <div
                key={item.skill}
                className="dashboard-card"
                style={{ marginTop: "20px" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <h3>{item.skill}</h3>

                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color:
                        item.priority.toLowerCase() === "high"
                          ? "#991b1b"
                          : "#92400e",
                      backgroundColor:
                        item.priority.toLowerCase() === "high"
                          ? "#fee2e2"
                          : "#fef3c7",
                    }}
                  >
                    {item.priority} Priority
                  </span>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <h4>What to Learn</h4>
                  <p>{item.what_to_learn}</p>
                </div>

                <div style={{ marginTop: "14px" }}>
                  <h4>Practical Exercise</h4>
                  <p>{item.practice_task}</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default Resume;