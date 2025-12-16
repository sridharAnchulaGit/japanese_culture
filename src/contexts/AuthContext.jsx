import React, { createContext, useContext, useState } from "react";
import { supabase } from "../supabaseClient.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ start as not loading

  // ✅ EMAIL/PASSWORD LOGIN (unchanged)
  const loginWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    setUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  };

  // ✅ SIGNUP (unchanged)
  const signupWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    setUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  };

  // ✅ LOGOUT (simplified)
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  // ✅ RESET PASSWORD (unchanged)
  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        loginWithEmail,
        signupWithEmail,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
