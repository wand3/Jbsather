type SignupRequest = {
    email: string;
    name: string;
    password: string;
};
  
type SignupResponse = {
    message: string;
};

export type UserRole =
  | "free_seeker"
  | "premium_seeker"
  | "admin";

export interface User {
    id: string;
    name: string;
    email: string;
    role?: UserRole;
  }
  
interface AuthData {
    user: User;
    token: string;
}

interface AuthResponse {
    status: "success";
    data: AuthData;
}

export type {SignupRequest, SignupResponse, AuthResponse}