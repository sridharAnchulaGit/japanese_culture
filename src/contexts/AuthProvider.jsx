// src/components/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "YOUR_SUPABASE_URL"; // replace with your Supabase URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpdmdheXFqbXljYWVobHB5eXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0OTA1ODksImV4cCI6MjA3MTA2NjU4OX0.0FiH3nHkOALPtZaKOTcAQqnNRUzR5Hhy-9947Yqsrh0"; // replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for active session on load
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
  };

  const signup = async (email, password) => {
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    setUser(data.user);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
