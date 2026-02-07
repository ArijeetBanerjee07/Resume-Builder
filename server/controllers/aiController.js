import genAI, { genAI2, groq } from "../configs/ai.js";
import Resume from "../models/Resume.js";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import fs from "fs";

// Helper function to get the model
const getModel = (instance = genAI) => {
    const modelName = process.env.GEMINI_AI_MODEL || "gemini-2.0-flash";
    console.log(`Using Gemini Model: ${modelName}`);
    return instance.getGenerativeModel({ model: modelName });
};

/**
 * Controller for enhancing resume summary
 * POST: /api/ai/enhance-pro-sum
 */
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required field: userContent" });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. Return ONLY the enhanced text, no other options or explanations."
                },
                {
                    role: "user",
                    content: `Enhance this resume summary: ${userContent}`
                }
            ],
            model: "llama-3.3-70b-versatile",
        });

        const enhancedContent = completion.choices[0].message.content.trim();
        return res.status(200).json({ enhancedContent });
    } catch (error) {
        console.error("Groq Enhance Summary Error:", error);
        // Fallback to Gemini
        try {
            const model = getModel();
            const result = await model.generateContent(`Enhance this resume summary: ${req.body.userContent}`);
            return res.status(200).json({ enhancedContent: result.response.text().trim() });
        } catch (geminiError) {
            return res.status(500).json({ message: "AI Enhancement failed", details: geminiError.message });
        }
    }
}

/**
 * Controller for enhancing Job Description
 * POST: /api/ai/enhance-job-desc
 */
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required field: userContent" });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. Make it compelling, action-oriented, and ATS-friendly. Return ONLY the enhanced text, no other options or explanations."
                },
                {
                    role: "user",
                    content: `Enhance this job description: ${userContent}`
                }
            ],
            model: "llama-3.3-70b-versatile",
        });

        const enhancedContent = completion.choices[0].message.content.trim();
        return res.status(200).json({ enhancedContent });
    } catch (error) {
        console.error("Groq Enhance Job Desc Error:", error);
        // Fallback to Gemini
        try {
            const model = getModel();
            const result = await model.generateContent(`Enhance this job description: ${req.body.userContent}`);
            return res.status(200).json({ enhancedContent: result.response.text().trim() });
        } catch (geminiError) {
            return res.status(500).json({ message: "AI Enhancement failed", details: geminiError.message });
        }
    }
}

/**
 * Controller for extracting data from resume and saving to DB
 * POST: /api/ai/upload-resume
 */
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: "Missing required field: resumeText" });
        }

        const model = getModel();
        const prompt = `
        You are an expert AI agent specializing in resume parsing.
        Extract data from the following resume text and format it into the specified JSON structure.
        
        Resume text:
        ${resumeText}

        Return the data in the following JSON format ONLY. Do not include any markdown formatting like \`\`\`json.
        {
            "professional_summary": "...",
            "skills": ["skill1", "skill2"],
            "personal_info": {
                "image": "",
                "full_name": "...",
                "profession": "...",
                "email": "...",
                "phone": "...",
                "location": "...",
                "linkedin": "...",
                "website": "..."
            },
            "experience": [
                {
                    "company": "...",
                    "position": "...",
                    "start_date": "...",
                    "end_date": "...",
                    "description": "...",
                    "is_current": false
                }
            ],
            "projects": [
                {
                    "name": "...",
                    "type": "...",
                    "description": "..."
                }
            ],
            "education": [
                {
                    "institution": "...",
                    "degree": "...",
                    "field": "...",
                    "graduation_date": "...",
                    "gpa": "..."
                }
            ]
        }
        `;

        const result = await model.generateContent(prompt);
        let extractedDataText = result.response.text().trim();

        // Clean up markdown code blocks if present
        if (extractedDataText.startsWith("```")) {
            extractedDataText = extractedDataText.replace(/^```json\n?/, "").replace(/\n?```$/, "");
        }

        const parsedData = JSON.parse(extractedDataText);
        const newResume = await Resume.create({ userId, title, ...parsedData });

        res.json({ resumeId: newResume._id });
    } catch (error) {
        console.error("Upload Resume Error:", error);
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Controller for extracting text from resume file
 * POST: /api/ai/analyze-resume-file
 */
export const analyzeResumeFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileBuffer = req.file.buffer;
        let text = "";

        if (req.file.mimetype === "application/pdf") {
            const uint8Array = new Uint8Array(fileBuffer);
            const parser = new PDFParse(uint8Array);
            const result = await parser.getText();
            text = result.text;
        } else if (req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const result = await mammoth.extractRawText({ buffer: fileBuffer });
            text = result.value;
        } else {
            return res.status(400).json({ message: "Unsupported file type. Please upload PDF or DOCX." });
        }

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ message: "Could not extract text from the file." });
        }

        return res.status(200).json({ resumeText: text });
    } catch (error) {
        console.error("Error in analyzeResumeFile:", error);
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Controller for generating AI questions based on resume
 * POST: /api/ai/generate-questions
 */
export const generateQuestions = async (req, res) => {
    try {
        const { resumeText } = req.body;

        if (!resumeText) {
            return res.status(400).json({ message: "Missing resume text" });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an expert career coach. From the given resume, generate 5–7 insightful interview questions. Return ONLY a JSON object: {\"questions\": [\"q1\", \"q2\", ...]}"
                },
                {
                    role: "user",
                    content: `Resume: ${resumeText}`
                }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        let responseText = completion.choices[0].message.content.trim();
        let questions = JSON.parse(responseText).questions;

        return res.status(200).json({ questions });
    } catch (error) {
        console.error("Groq Generate Questions Error:", error);
        // Fallback to Gemini
        try {
            const model = getModel(genAI2);
            const result = await model.generateContent(`Generate 5-7 insightful interview questions from this resume and return as JSON: ${req.body.resumeText}`);
            let text = result.response.text().trim();
            if (text.startsWith("```")) text = text.replace(/^```json\n?/, "").replace(/\n?```$/, "");
            return res.status(200).json({ questions: JSON.parse(text).questions });
        } catch (geminiError) {
            return res.status(200).json({
                questions: [
                    "What are your key professional strengths?",
                    "Where do you see yourself in 5 years?",
                    "Tell me about a challenge you faced at work.",
                    "Why are you interested in this role?",
                    "What makes you a good fit for this position?"
                ]
            });
        }
    }
};

/**
 * Controller for final resume analysis
 * POST: /api/ai/final-analysis
 */
export const getFinalAnalysis = async (req, res) => {
    try {
        const { resumeText, answers } = req.body;

        if (!resumeText || !answers) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a career expert. Based on the resume and user answers, provide a JSON analysis: {\"Relevant Skills\": [], \"Missing Skills\": [], \"Resume Strengths\": \"\", \"Weak Points\": \"\", \"Actionable Suggestions\": []}"
                },
                {
                    role: "user",
                    content: `Resume: ${resumeText}\nAnswers: ${JSON.stringify(answers)}`
                }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        let analysis = JSON.parse(completion.choices[0].message.content);

        const normalizedAnalysis = {
            "Relevant Skills": analysis["Relevant Skills"] || analysis["relevant_skills"] || [],
            "Missing Skills": analysis["Missing Skills"] || analysis["missing_skills"] || [],
            "Resume Strengths": analysis["Resume Strengths"] || analysis["resume_strengths"] || "",
            "Weak Points": analysis["Weak Points"] || analysis["weak_points"] || "",
            "Actionable Suggestions": analysis["Actionable Suggestions"] || analysis["actionable_suggestions"] || []
        };

        return res.status(200).json({ analysis: normalizedAnalysis });
    } catch (error) {
        console.error("Groq Final Analysis Error:", error);
        // Fallback to Gemini
        try {
            const model = getModel();
            const prompt = `Analyze this resume and user answers and return as JSON: Resume: ${req.body.resumeText}\nAnswers: ${JSON.stringify(req.body.answers)}`;
            const result = await model.generateContent(prompt);
            let text = result.response.text().trim();
            if (text.startsWith("```")) text = text.replace(/^```json\n?/, "").replace(/\n?```$/, "");
            const analysis = JSON.parse(text);
            const normalizedAnalysis = {
                "Relevant Skills": analysis["Relevant Skills"] || analysis["relevant_skills"] || [],
                "Missing Skills": analysis["Missing Skills"] || analysis["missing_skills"] || [],
                "Resume Strengths": analysis["Resume Strengths"] || analysis["resume_strengths"] || "",
                "Weak Points": analysis["Weak Points"] || analysis["weak_points"] || "",
                "Actionable Suggestions": analysis["Actionable Suggestions"] || analysis["actionable_suggestions"] || []
            };
            return res.status(200).json({ analysis: normalizedAnalysis });
        } catch (geminiError) {
            return res.status(500).json({ message: "Analysis failed", details: geminiError.message });
        }
    }
}
