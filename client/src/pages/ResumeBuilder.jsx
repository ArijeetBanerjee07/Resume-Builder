import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { ArrowLeftIcon, FolderIcon, Sparkle, GraduationCap, Briefcase, FileText, User, ChevronLeft, ChevronRight, Share2Icon, EyeIcon, EyeOffIcon, DownloadIcon } from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ProfessionalSummeryForm from "../components/ProfessionalSummeryForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import EducationForm from "../components/EducationForm";
import ExperienceForm from "../components/ExperienceForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

export default function ResumeBuilder() {

    const { resumeId } = useParams();
    const { token } = useSelector(state => state.auth)

    const [resumeData, setresumeData] = useState({
        _id: '',
        title: '',
        personal_info: {},
        professional_summary: "",
        experience: [],
        education: [],
        projects: [],
        skills: [],
        template: "classic",
        accent_color: "#3B82F6",
        public: false
    })

    const loadExsistingResume = async () => {
        try {
            const { data } = await api.get('/api/resumes/get/' + resumeId, {
                headers: {
                    Authorization: token
                }
            })

            if (data.resume) {
                setresumeData(data.resume)
                document.title = data.resume.title;
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const [ActiveSassionIndex, setActiveSassionIndex] = useState(0);
    const [RemoveBackground, setRemoveBackgrond] = useState(false);

    const sections = [
        { id: "personal", name: "Personal Info", icon: User },
        { id: "summary", name: "Summary", icon: FileText },
        { id: "experience", name: "Experience", icon: Briefcase },
        { id: "education", name: "Education", icon: GraduationCap },
        { id: "projects", name: "Projects", icon: FolderIcon },
        { id: "skills", name: "Skills", icon: Sparkle },
    ]

    const activeSession = sections[ActiveSassionIndex];
    useEffect(() => {
        loadExsistingResume();
    }, []);

    let changeResumeVisibility = async () => {
        try {
            const formData = new FormData()
            formData.append("resumeId", resumeId)
            formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))

            const { data } = await api.put('/api/resumes/update', formData, {
                headers: {
                    Authorization: token
                }
            })

            setresumeData({ ...resumeData, public: !resumeData.public })
            toast.success(data.message)
        } catch (error) {
            console.error("Error saving resume:", error)
        }
    }

    const handelShare = () => {
        const frontendUrl = window.location.href.split('/app/')[0];
        const resumeUrl = frontendUrl + '/view/' + resumeId;
        if (navigator.share) {
            navigator.share({
                url: resumeUrl,
                text: "My Resume"
            })
        } else {
            alert("Share not supported in this browser")
        }
    }

    const handelDownload = () => {
        window.print();
    }

    const saveResume = async () => {
        try {
            let updatedResumeData = structuredClone(resumeData);
            // resume image from updatedResumeData
            if (resumeData.personal_info?.image && typeof resumeData.personal_info.image === 'object') {
                delete updatedResumeData.personal_info.image;
            }
            const formData = new FormData()
            formData.append("resumeId", resumeId)
            formData.append("resumeData", JSON.stringify(updatedResumeData))
            RemoveBackground && formData.append("removeBackground", "yes")

            if (resumeData.personal_info?.image && typeof resumeData.personal_info.image === 'object') {
                formData.append("image", resumeData.personal_info.image)
            }

            console.log("Sending save request with:", {
                resumeId,
                hasImage: !!(resumeData.personal_info?.image && typeof resumeData.personal_info.image === 'object'),
                RemoveBackground,
                token: token ? "Token exists" : "No token"
            });

            const { data } = await api.put('/api/resumes/update', formData, {
                headers: {
                    Authorization: token
                }
            })

            console.log("Save successful:", data);
            setresumeData(data.resume)
        } catch (error) {
            console.error("Error saving resume:", error);
            console.error("Error response:", error.response?.data);
            console.error("Error status:", error.response?.status);
            throw error; // Re-throw to let toast.promise handle the error
        }
    }
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Link to={"/app"} className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
                    <ArrowLeftIcon className="size-6" /> Back to Dashboard
                </Link>
            </div>


            <div className='max-w-7xl mx-auto px-4 pb-8'>
                <div className='grid lg:grid-cols-12 gap-8'>
                    {/* Left Panel - Form */}
                    <div className='relative lg:col-span-5 rounded-lg'>
                        <div className='bg-white rounded-lg shadow-sm border border-gray-200 px-8 py-6 pt-1 pr-12'>
                            {/* progress bar using activeSection Index */}
                            <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200 " />
                            <hr className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 border-none transition-all duration-2000" style={{ width: `${ActiveSassionIndex * 100 / (sections.length - 1)}%` }} />

                            {/* Section Navigation */}
                            <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                                <div className="flex items-center gap-2">
                                    <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setresumeData(prev => ({ ...prev, template }))} />
                                    <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setresumeData(prev => ({ ...prev, accent_color: color }))} />
                                </div>
                                <div className="flex items-center">
                                    {ActiveSassionIndex !== 0 && (
                                        <button onClick={() => setActiveSassionIndex((prevIndex) => Math.max(prevIndex - 1, 0))} className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all" disabled={ActiveSassionIndex === 0}>
                                            <ChevronLeft className="size-4" /> Previous
                                        </button>
                                    )}
                                    <button onClick={() => setActiveSassionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${ActiveSassionIndex === sections.length - 1 && 'opacity-50'}`} disabled={ActiveSassionIndex === sections.length - 1}>
                                        Next <ChevronRight className="size-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="space-y-6">
                                {activeSession.id === "personal" && (
                                    <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setresumeData(prev => ({ ...prev, personal_info: data }))} RemoveBackground={RemoveBackground} setRemoveBackgrond={setRemoveBackgrond} />
                                )}
                                {activeSession.id === "summary" && (
                                    <ProfessionalSummeryForm data={resumeData.professional_summary} onChange={(data) => setresumeData(prev => ({ ...prev, professional_summary: data }))} setresumeData={setresumeData} />
                                )}
                                {activeSession.id === "experience" && (
                                    <ExperienceForm data={resumeData.experience} onChange={(data) => setresumeData(prev => ({ ...prev, experience: data }))} />
                                )}
                                {activeSession.id === "education" && (
                                    <EducationForm data={resumeData.education} onChange={(data) => setresumeData(prev => ({ ...prev, education: data }))} />
                                )}
                                {activeSession.id === "projects" && (
                                    <ProjectForm data={resumeData.projects} onChange={(data) => setresumeData(prev => ({ ...prev, projects: data }))} />
                                )}
                                {activeSession.id === "skills" && (
                                    <SkillsForm data={resumeData.skills} onChange={(data) => setresumeData(prev => ({ ...prev, skills: data }))} />
                                )}
                            </div>
                            <button onClick={() => { toast.promise(saveResume(), { loading: "Saving...", success: "Saved successfully!", error: "Failed to save" }) }} className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                                Save Changes
                            </button>
                        </div>
                    </div>
                    {/* Right Panel Preview */}
                    <div className='lg:col-span-7 max-lg:mt-6'>
                        <div className="relative w-full">
                            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                                {resumeData.public && (
                                    <button onClick={handelShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-1g ring-blue-300 hover:ring transition-colors'>
                                        <Share2Icon className="size-4" />
                                    </button>
                                )}
                                <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-1g ring-blue-300 hover:ring transition-colors'>
                                    {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
                                    {resumeData.public ? "Public" : "Private"}
                                </button>
                                <button onClick={handelDownload} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-1g ring-green-300 hover:ring transition-colors'>
                                    <DownloadIcon className="size-4" />
                                    Download
                                </button>
                            </div>
                        </div>
                        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
                    </div>
                </div>
            </div>
        </div>
    );
}