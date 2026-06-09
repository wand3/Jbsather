type SignupRequest = {
    email: string;
    name: string;
    password: string;
};
  
type SigninRequest = {
    email: string;
    password: string;
};

export type UserRole =
  | "free_seeker"
  | "premium_seeker"
  | "admin";

export type User = {
    id: string;
    name: string;
    email: string;
    role?: UserRole;
  }
  
type AuthData = {
    user: User;
    token: string;
}

type AuthResponse = {
    status: "success";
    data: AuthData;
}

export type {SignupRequest, SigninRequest, AuthResponse}