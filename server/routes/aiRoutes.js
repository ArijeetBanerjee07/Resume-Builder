import express from "express";
import {
    enhanceProfessionalSummary,
    enhanceJobDescription,
    uploadResume,
    analyzeResumeFile,
    generateQuestions,
    getFinalAnalysis
} from "../controllers/aiController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../configs/multer.js";

const router = express.Router();

router.use((req, res, next) => {
    console.log(`AI ROUTER HIT: ${req.method} ${req.url}`);
    next();
});

router.get("/ping", (req, res) => res.json({ message: "pong" }));

router.post("/enhance-pro-sum", authMiddleware, enhanceProfessionalSummary);
router.post("/enhance-job-desc", authMiddleware, enhanceJobDescription);
router.post("/upload-resume", authMiddleware, uploadResume);

// Smart Resume Analyzer Routes
router.post("/analyze-resume-file", authMiddleware, upload.single("resume"), analyzeResumeFile);
router.post("/generate-questions", authMiddleware, generateQuestions);
router.post("/final-analysis", authMiddleware, getFinalAnalysis);

export default router;