import React from "react"
import { dummyResumeData } from "../assets/assets";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ResumePreview from "../components/ResumePreview";
import { useEffect } from "react";
import { ArrowLeftIcon } from "lucide-react";
import Loader from "../components/Loader";
import api from "../configs/api";

export default function Preview() {
    const { resumeId } = useParams();
    const [resumeData, setresumeData] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const loadResume = async () => {
        try {
            const { data } = await api.get("/api/resumes/public/" + resumeId)
            setresumeData(data.resume);
        } catch (error) {
            console.log(error.message)
        } finally {
            setisLoading(false)
        }
    }
    useEffect(() => {
        loadResume();
    }, []);
    return resumeData ? (
        <div className='bg-slate-100'>
            <div className='max-w-3xl mx-auto py-10'>
                <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} className="py-4 bg-white rounded-lg" />
            </div>
        </div>
    ) : (
        <div>
            {isLoading ? <Loader /> :
                <div className="flex flex-col items-center justify-center h-screen">
                    <p className="text-center text-6xl text-slate-400 font-medium">Resume Not Found</p>
                    <a href="/app" className="mt-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-blue-400 flex items-center transition-colors">
                        <ArrowLeftIcon className="mr-2 size-4" /> Back to Dashboard
                    </a>
                </div>}
        </div>
    )
}