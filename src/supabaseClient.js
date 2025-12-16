// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js"; // ✅ correct import

// Store your Supabase credentials in constants
const supabaseUrl = "https://wivgayqjmycaehlpyyzq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpdmdheXFqbXljYWVobHB5eXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0OTA1ODksImV4cCI6MjA3MTA2NjU4OX0.0FiH3nHkOALPtZaKOTcAQqnNRUzR5Hhy-9947Yqsrh0";

// Create the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
