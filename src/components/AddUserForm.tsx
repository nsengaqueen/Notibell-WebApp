import { useState } from "react";
import type { User } from "../types";

interface Props {
  onAdd: (user: User) => void;
  onCancel: () => void;
}

function AddUserForm({ onAdd, onCancel }: Props) {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!fullname || !email) {
      setError("Please fill in all fields");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      fullname,
      email,
      profUrl:
        "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png",
    };

    onAdd(newUser);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box" as const,
  };

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        padding: "1.5rem",
        borderRadius: "10px",
        marginBottom: "1rem",
        border: "1px solid #ccc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Add New User</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        placeholder="Full name"
        style={inputStyle}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={inputStyle}
      />

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#12A08A",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add User
        </button>
        <button
          onClick={onCancel}
          style={{
            backgroundColor: "#ccc",
            color: "black",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddUserForm;
