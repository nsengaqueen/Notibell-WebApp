import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase";
import UserList from "./components/UserList";
import NotificationHistory from "./components/NotificationHistory";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<"login" | "register">("login");
  const [activePage, setActivePage] = useState<"users" | "notifications">(
    "users",
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
    setIsLoggedIn(false);
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;

  if (!isLoggedIn) {
    if (page === "register") {
      return (
        <Register
          onRegister={() => setIsLoggedIn(true)}
          onBackToLogin={() => setPage("login")}
        />
      );
    }
    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
        onRegister={() => setPage("register")}
      />
    );
  }

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <nav
        style={{
          backgroundColor: "#12A08A",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ color: "white", margin: 0 }}>🔔 Doorbell Dashboard</h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            onClick={() => setActivePage("users")}
            style={{
              backgroundColor: activePage === "users" ? "white" : "transparent",
              color: activePage === "users" ? "#12A08A" : "white",
              border: "1px solid white",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Users
          </button>
          <button
            onClick={() => setActivePage("notifications")}
            style={{
              backgroundColor:
                activePage === "notifications" ? "white" : "transparent",
              color: activePage === "notifications" ? "#12A08A" : "white",
              border: "1px solid white",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Notifications
          </button>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#d9534f",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ padding: "2rem" }}>
        {activePage === "users" ? <UserList /> : <NotificationHistory />}
      </div>
    </div>
  );
}

export default App;
