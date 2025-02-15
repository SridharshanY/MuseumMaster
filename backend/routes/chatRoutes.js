import express from "express";
import "dotenv/config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash'})

router.post("/", async (req, res) => {
  try {
    const prompt = req.body.message;
    const result = await model.generateContent(prompt)
    res.status(200).json({reply: result.response.text()})
  } catch (error) {
    res.status(500).json({reply: error.message})
  }
});

export default router