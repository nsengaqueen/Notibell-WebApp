import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebase";

interface Props {
  onRegister: () => void;
  onBackToLogin: () => void;
}

function Register({ onRegister, onBackToLogin }: Props) {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    setError(null);

    // validation
    if (!fullname || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { user } = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password,
      );

     
      await setDoc(doc(FIREBASE_DB, "user", user.uid), {
        fullname,
        email,
        profUrl:
          "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png",
      });

      onRegister();
    } catch (err: any) {
       console.log("Error code:", err.code); 
       console.log("Error message:", err.message); 
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already in use");
      } else {
        setError("Something went wrong. Please try again");
      }
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
          Create your account
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
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Full name"
          style={inputStyle}
        />
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          style={inputStyle}
        />

        <button
          onClick={handleRegister}
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
            marginBottom: "1rem",
          }}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p style={{ textAlign: "center", color: "#888" }}>
          Already have an account?{" "}
          <span
            onClick={onBackToLogin}
            style={{ color: "#12A08A", cursor: "pointer", fontWeight: "bold" }}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
