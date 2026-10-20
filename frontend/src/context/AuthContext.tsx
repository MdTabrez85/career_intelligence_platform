import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import api from "../services/api";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "../types/auth";

interface AuthContextType {
  user: User | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (data: LoginRequest) => {
    const response = await api.post<LoginResponse>(
      "/auth/login",
      data
    );

    const loginData = response.data;

    localStorage.setItem("token", loginData.token);

    const loggedInUser: User = {
      name: loginData.name,
      email: loginData.email,
      role: loginData.role,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);
  };

  const register = async (data: RegisterRequest) => {
    await api.post("/auth/register", data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}