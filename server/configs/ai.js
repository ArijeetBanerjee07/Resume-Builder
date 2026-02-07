import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const genAI2 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_2 || process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export { genAI, genAI2, groq };
export default genAI;