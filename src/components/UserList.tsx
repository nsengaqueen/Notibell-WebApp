import { useState } from "react";
import type { User } from "../types";
import { mockUsers } from "../mockData";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";

function UserList() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAdd = (newUser: User) => {
    setUsers([...users, newUser]);
    setShowAddForm(false);
  };

  const handleEdit = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    setEditingUser(null);
  };

  const filteredUsers = users.filter((user) =>
    user.fullname.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2>Users ({users.length})</h2>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            backgroundColor: "#12A08A",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Add User
        </button>
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      {/* Add a user form */}
      {showAddForm && (
        <AddUserForm onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />
      )}

      {/* editing a  user Form */}
      {editingUser && (
        <EditUserForm
          user={editingUser}
          onEdit={handleEdit}
          onCancel={() => setEditingUser(null)}
        />
      )}

      {/* table of users */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#12A08A", color: "white" }}>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>Profile</th>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>Full Name</th>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>Email</th>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: "0.75rem" }}>
                <img
                  src={user.profUrl}
                  alt={user.fullname}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
              </td>
              <td style={{ padding: "0.75rem" }}>{user.fullname}</td>
              <td style={{ padding: "0.75rem" }}>{user.email}</td>
              <td
                style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}
              >
                <button
                  onClick={() => setEditingUser(user)}
                  style={{
                    backgroundColor: "#f0ad4e",
                    color: "white",
                    border: "none",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{
                    backgroundColor: "#d9534f",
                    color: "white",
                    border: "none",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* empty state */}
      {filteredUsers.length === 0 && (
        <p style={{ textAlign: "center", color: "#888", marginTop: "2rem" }}>
          No users found
        </p>
      )}
    </div>
  );
}

export default UserList;
