import React, { useState } from "react";
import {
    UploadCloudIcon,
    SparklesIcon,
    MessageSquareIcon,
    ChevronRightIcon,
    CheckCircleIcon,
    AlertCircleIcon,
    ZapIcon,
    TrendingUpIcon,
    LoaderCircleIcon,
    ArrowLeftIcon
} from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SmartResumeAI() {
    const { token } = useSelector((state) => state.auth);
    const [step, setStep] = useState(1); // 1: Upload, 2: Questions, 3: Analysis
    const [isLoading, setIsLoading] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeText, setResumeText] = useState("");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [analysisResult, setAnalysisResult] = useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        api.get("/api/ai/ping", { headers: { Authorization: token } })
            .then(res => console.log("AI Server connected:", res.data))
            .catch(err => console.error("AI Server connection failed:", err));
    }, [token]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setResumeFile(file);
    };

    const extractText = async () => {
        if (!resumeFile) return toast.error("Please select a file");

        setIsLoading(true);
        const formData = new FormData();
        formData.append("resume", resumeFile);

        try {
            const { data } = await api.post("/api/ai/analyze-resume-file", formData, {
                headers: {
                    Authorization: token,
                }
            });
            setResumeText(data.resumeText);
            generateQuestions(data.resumeText);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error extracting text");
            setIsLoading(false);
        }
    };

    const generateQuestions = async (text) => {
        try {
            const { data } = await api.post("/api/ai/generate-questions", { resumeText: text }, {
                headers: { Authorization: token }
            });
            setQuestions(data.questions);
            setStep(2);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error generating questions");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerChange = (question, answer) => {
        setAnswers({ ...answers, [question]: answer });
    };

    const nextQuestion = () => {
        if (!answers[questions[currentQuestionIndex]]) {
            return toast.error("Please answer the question");
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleFinalAnalysis();
        }
    };

    const handleFinalAnalysis = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.post("/api/ai/final-analysis", {
                resumeText,
                answers: Object.entries(answers).map(([q, a]) => ({ question: q, answer: a }))
            }, {
                headers: { Authorization: token }
            });
            setAnalysisResult(data.analysis);
            setStep(3);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error during final analysis");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-2"
                        >
                            <ArrowLeftIcon className="size-4 mr-1" /> Back to Dashboard
                        </button>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                            <SparklesIcon className="size-8 text-indigo-600" />
                            Smart Resume AI Analyzer
                        </h1>
                        <p className="text-slate-600 mt-2">Elevate your career with AI-powered insights and ATS optimization.</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-12 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between px-2">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex flex-col items-center gap-2">
                                <div className={`size-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step >= s ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-slate-100 text-slate-400"
                                    }`}>
                                    {step > s ? <CheckCircleIcon className="size-6" /> : s}
                                </div>
                                <span className={`text-xs font-medium ${step >= s ? "text-indigo-600" : "text-slate-400"}`}>
                                    {s === 1 ? "Upload Resume" : s === 2 ? "AI Interview" : "Result Report"}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="relative mt-4 h-1 bg-slate-100 rounded-full mx-6">
                        <div
                            className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-700 rounded-full"
                            style={{ width: `${(step - 1) * 50}%` }}
                        ></div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden min-h-[400px]">

                    {/* Step 1: Upload */}
                    {step === 1 && (
                        <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
                            <div className="size-20 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                                <UploadCloudIcon className="size-10" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload your resume</h2>
                            <p className="text-slate-500 mb-8 max-w-md">
                                We support PDF and DOCX files. Our AI will analyze your content to provide personalized career advice.
                            </p>

                            <label className="w-full max-w-lg cursor-pointer group">
                                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 group-hover:border-indigo-500 group-hover:bg-indigo-50/30 transition-all duration-300">
                                    <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileUpload} />
                                    {resumeFile ? (
                                        <div className="flex flex-col items-center">
                                            <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-medium mb-2">
                                                {resumeFile.name}
                                            </div>
                                            <p className="text-sm text-slate-400">Click to change file</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="size-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                <UploadCloudIcon className="size-6" />
                                            </div>
                                            <p className="text-slate-600 font-medium">Click to browse or drag and drop</p>
                                            <p className="text-sm text-slate-400 mt-1">PDF or DOCX (max. 5MB)</p>
                                        </div>
                                    )}
                                </div>
                            </label>

                            <button
                                onClick={extractText}
                                disabled={!resumeFile || isLoading}
                                className="mt-8 w-full max-w-sm py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                            >
                                {isLoading ? <LoaderCircleIcon className="animate-spin size-5" /> : <SparklesIcon className="size-5" />}
                                {isLoading ? "Processing..." : "Start Analysis"}
                            </button>
                        </div>
                    )}

                    {/* Step 2: AI Questions */}
                    {step === 2 && questions.length > 0 && (
                        <div className="p-8 sm:p-12">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="size-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                                    <MessageSquareIcon className="size-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Career Insight Session</h2>
                                    <p className="text-sm text-slate-500">Question {currentQuestionIndex + 1} of {questions.length}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <h3 className="text-lg font-medium text-slate-800 mb-4">
                                        {questions[currentQuestionIndex]}
                                    </h3>
                                    <textarea
                                        className="w-full bg-white border border-slate-200 rounded-xl p-4 min-h-[150px] focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-700"
                                        placeholder="Type your answer here..."
                                        value={answers[questions[currentQuestionIndex]] || ""}
                                        onChange={(e) => handleAnswerChange(questions[currentQuestionIndex], e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="flex justify-between items-center pt-4">
                                    <button
                                        disabled={currentQuestionIndex === 0}
                                        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                                        className="px-6 py-2 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-30"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={nextQuestion}
                                        disabled={isLoading}
                                        className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
                                    >
                                        {isLoading ? <LoaderCircleIcon className="animate-spin size-5" /> : null}
                                        {currentQuestionIndex === questions.length - 1 ? "Finish & Analyze" : "Next Question"}
                                        <ChevronRightIcon className="size-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Analysis Result */}
                    {step === 3 && analysisResult && (
                        <div className="p-8 sm:p-12 bg-white">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <ZapIcon className="size-6 text-amber-500 fill-amber-500" />
                                    Your Resume Analysis
                                </h2>
                                <button
                                    onClick={() => {
                                        setStep(1);
                                        setResumeFile(null);
                                        setAnalysisResult(null);
                                        setAnswers({});
                                        setCurrentQuestionIndex(0);
                                    }}
                                    className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                                >
                                    Start New Analysis
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Relevant Skills */}
                                <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                                    <div className="flex items-center gap-2 text-emerald-700 font-bold mb-4">
                                        <CheckCircleIcon className="size-5" />
                                        Relevant Skills
                                    </div>
                                    <ul className="space-y-2">
                                        {Array.isArray(analysisResult["Relevant Skills"]) ? analysisResult["Relevant Skills"].map((skill, i) => (
                                            <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                                                <div className="size-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
                                                {skill}
                                            </li>
                                        )) : <p className="text-sm text-slate-600">{analysisResult["Relevant Skills"]}</p>}
                                    </ul>
                                </div>

                                {/* Missing Skills */}
                                <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
                                    <div className="flex items-center gap-2 text-rose-700 font-bold mb-4">
                                        <AlertCircleIcon className="size-5" />
                                        Missing Skills
                                    </div>
                                    <ul className="space-y-2">
                                        {Array.isArray(analysisResult["Missing Skills"]) ? analysisResult["Missing Skills"].map((skill, i) => (
                                            <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                                                <div className="size-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></div>
                                                {skill}
                                            </li>
                                        )) : <p className="text-sm text-slate-600">{analysisResult["Missing Skills"]}</p>}
                                    </ul>
                                </div>

                                {/* Strengths */}
                                <div className="bg-sky-50/50 p-6 rounded-2xl border border-sky-100 md:col-span-2">
                                    <div className="flex items-center gap-2 text-sky-700 font-bold mb-4">
                                        <TrendingUpIcon className="size-5" />
                                        Resume Strengths
                                    </div>
                                    <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                                        {analysisResult["Resume Strengths"]}
                                    </div>
                                </div>

                                {/* Weak Points */}
                                <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 md:col-span-1">
                                    <div className="flex items-center gap-2 text-amber-700 font-bold mb-4">
                                        <AlertCircleIcon className="size-5" />
                                        Weak Points
                                    </div>
                                    <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                                        {analysisResult["Weak Points"]}
                                    </div>
                                </div>

                                {/* Actionable Suggestions */}
                                <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 md:col-span-1">
                                    <div className="flex items-center gap-2 text-indigo-700 font-bold mb-4">
                                        <SparklesIcon className="size-5" />
                                        Actionable Suggestions
                                    </div>
                                    <div className="text-sm text-slate-700 leading-relaxed">
                                        {(() => {
                                            const suggestions = analysisResult["Actionable Suggestions"];
                                            if (Array.isArray(suggestions)) {
                                                return (
                                                    <ul className="space-y-3">
                                                        {suggestions.map((s, i) => (
                                                            <li key={i} className="flex gap-3">
                                                                <span className="font-bold text-indigo-600 shrink-0">{i + 1}.</span>
                                                                <span>{s}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                );
                                            } else if (typeof suggestions === 'string') {
                                                // Robust fallback for strings with manual numbering (e.g. "1. Step 2. Step")
                                                const points = suggestions.split(/(?=\d+\.)/).filter(p => p.trim());
                                                return (
                                                    <ul className="space-y-3">
                                                        {points.map((p, i) => (
                                                            <li key={i} className="flex gap-3">
                                                                <span className="font-bold text-indigo-600 shrink-0">{i + 1}.</span>
                                                                <span>{p.replace(/^\d+\.\s*/, "").trim()}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
