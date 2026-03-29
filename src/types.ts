export type User = {
  id: string;
  email: string;
  fullname: string;
  profUrl: string;
};

export type Notification = {
  id: string;
  timestamp: string;
  response: string; 
  responseType: "quick" | "custom"; 
  respondedBy: string;
};
