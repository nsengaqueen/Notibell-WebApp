import type { User, Notification } from "./types";

export const mockUsers: User[] = [
  {
    id: "1",
    fullname: "Alice Johnson",
    email: "alice@gmail.com",
    profUrl:
      "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png",
  },
  {
    id: "2",
    fullname: "Bob Smith",
    email: "bob@gmail.com",
    profUrl:
      "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png",
  },
  {
    id: "3",
    fullname: "Charlie Brown",
    email: "charlie@gmail.com",
    profUrl:
      "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    timestamp: "2024-03-29 08:00",
    response: "Coming!",
    responseType: "quick",
    respondedBy: "Alice Johnson",
  },
  {
    id: "2",
    timestamp: "2024-03-29 10:30",
    response: "Leave it at the door",
    responseType: "quick",
    respondedBy: "Bob Smith",
  },
  {
    id: "3",
    timestamp: "2024-03-29 14:00",
    response: "I'll be there in 5 minutes",
    responseType: "custom",
    respondedBy: "Charlie Brown",
  },
];
