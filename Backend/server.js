import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.NEWS_API_KEY;
import express from "express";
import fetch from "node-fetch";   // if using Node <18
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/news", async (req, res) => {
  const category = req.query.category || "general";
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/news`);
  console.log("API Key from .env:", API_KEY);
});
