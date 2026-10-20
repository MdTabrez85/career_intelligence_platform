export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  name: string;
  email: string;
  role: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}