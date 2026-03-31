import { useState } from "react";
import type { User } from "../types";

interface Props {
  user: User;
  onEdit: (user: User) => void;
  onCancel: () => void;
}

function EditUserForm({ user, onEdit, onCancel }: Props) {
  const [fullname, setFullname] = useState<string>(user.fullname);
  const [email, setEmail] = useState<string>(user.email);
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

    const updatedUser: User = {
      ...user, 
      fullname,
      email,
    };

    onEdit(updatedUser);
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
        backgroundColor: "#fff8e1",
        padding: "1.5rem",
        borderRadius: "10px",
        marginBottom: "1rem",
        border: "1px solid #f0ad4e",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Edit User</h3>

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
            backgroundColor: "#f0ad4e",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Changes
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

export default EditUserForm;
