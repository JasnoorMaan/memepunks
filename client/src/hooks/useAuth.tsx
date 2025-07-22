import React, { useState, useEffect, useContext, createContext } from "react";
import { authService } from "../api/service";

type AuthContextType = {
  user: { authenticated: boolean; token?: string } | null;
  loading: boolean;
  signIn: (creds: {
    username: string;
    password: string;
  }) => Promise<{ success: boolean; data?: any; error?: any }>;
  signUp: (userData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; data?: any; error?: any }>;
  signOut: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    authenticated: boolean;
    token?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setUser({ authenticated: true });
    }
    setLoading(false);
  }, []);

  const signIn = async (creds: { username: string; password: string }) => {
    try {
      setLoading(true);
      const data = await authService.signIn(creds);
      setUser({ authenticated: true, token: data.token });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const data = await authService.signUp(userData);
      setUser({ authenticated: true, token: data.token });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    authService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user?.authenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
