import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      await register({
        name,
        email,
        password,
      });

      setMessage(
        "Registration successful. You can now login."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch {
      setError("Registration failed.");
    }
  };

  return (
    <div>
      <h1>Career Intelligence Platform</h1>

      <h2>Create Account</h2>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            minLength={6}
            required
          />
        </div>

        <button type="submit">
          Register
        </button>
      </form>

      <br />

      <button onClick={() => navigate("/login")}>
        Already have an account? Login
      </button>
    </div>
  );
}