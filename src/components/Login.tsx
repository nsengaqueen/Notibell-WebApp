import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase";

interface Props {
  onLogin: () => void;
  onRegister: () => void;
}

function Login({ onLogin, onRegister }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      onLogin();
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box" as const,
    fontSize: "1rem",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#F3F5F6",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2.5rem",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#12A08A", marginTop: 0 }}>
          🔔 Doorbell Dashboard
        </h1>
        <p style={{ textAlign: "center", color: "#888", marginBottom: "2rem" }}>
          Sign in to your account
        </p>

        {error && (
          <p
            style={{
              color: "red",
              backgroundColor: "#fff0f0",
              padding: "0.75rem",
              borderRadius: "5px",
              marginBottom: "1rem",
            }}
          >
            {error}
          </p>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={inputStyle}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#12A08A",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <p style={{ textAlign: "center", color: "#888", marginTop: "1rem" }}>
          Don't have an account?{" "}
          <span
            onClick={onRegister}
            style={{ color: "#12A08A", cursor: "pointer", fontWeight: "bold" }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
