// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Supabase client (service role key is recommended here for full access)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// ✅ Example: GET all places
app.get("/places", async (req, res) => {
  try {
    const { data, error } = await supabase.from("places").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Example: Add a new place
app.post("/places", async (req, res) => {
  try {
    const { name, description } = req.body;
    const { data, error } = await supabase.from("places").insert([{ name, description }]);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
