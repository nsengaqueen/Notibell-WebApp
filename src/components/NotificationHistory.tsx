import type { Notification } from "../types";
import { mockNotifications } from "../mockData";

function NotificationHistory() {
  return (
    <div>
      {/* the header */}
      <div style={{ marginBottom: "1rem" }}>
        <h2>Notification History ({mockNotifications.length})</h2>
      </div>

      {/* table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#12A08A", color: "white" }}>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>Time</th>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>
              Responded By
            </th>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>Response</th>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {mockNotifications.map((notification: Notification) => (
            <tr
              key={notification.id}
              style={{ borderBottom: "1px solid #ccc" }}
            >
              <td style={{ padding: "0.75rem" }}>{notification.timestamp}</td>
              <td style={{ padding: "0.75rem" }}>{notification.respondedBy}</td>
              <td style={{ padding: "0.75rem" }}>{notification.response}</td>
              <td style={{ padding: "0.75rem" }}>
                <span
                  style={{
                    backgroundColor:
                      notification.responseType === "quick"
                        ? "#5bc0de"
                        : "#5cb85c",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                  }}
                >
                  {notification.responseType === "quick"
                    ? "Quick Reply"
                    : "Custom"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* empty state */}
      {mockNotifications.length === 0 && (
        <p style={{ textAlign: "center", color: "#888", marginTop: "2rem" }}>
          No notifications yet
        </p>
      )}
    </div>
  );
}

export default NotificationHistory;
