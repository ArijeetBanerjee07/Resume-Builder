const Features = () => {
    const featuresData = [
        {
            icon: <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>,
            title: "Task Automation",
            description: "Automate resume creation, formatting, and section structuring with AI. From skills to summaries, repetitive resume tasks are handled instantly—so you focus on opportunities, not formatting."
        },
        {
            icon: <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>,
            title: "Real-Time Monitoring",
            description: "Track resume strength, ATS compatibility, and keyword relevance in real time. Instantly see what works, what doesn’t, and how to improve before you hit Apply."
        },
        {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999V7.9999Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M3.29999 7L12 12L20.7 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 22V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
            title: "Context Awareness",
            description: "AI understands your role, experience level, and job description to tailor resumes accordingly. Every section is generated with context—not generic templates."
        },
        {
            icon: <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></svg>,
            title: "Resource Optimization",
            description: "Build professional resumes faster with fewer revisions. AI optimizes content length, structure, and wording to maximize impact while saving time and effort."
        },
        {
            icon: <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>,
            title: "Role-Based Access",
            description: "Build professional resumes faster with fewer revisions. AI optimizes content length, structure, and wording to maximize impact while saving time and effort."
        },
        {
            icon: <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" /><path d="m12 15 5 6H7Z" /></svg>,
            title: "AI-Agent Collaboration",
            description: "Multiple AI agents work together to refine language, optimize ATS keywords, and enhance clarity—delivering a resume that’s recruiter-ready and job-specific."
        }
    ];

    return (
        <>
            <style>
                {`@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

                * {
                    font-family: "Poppins", sans-serif;
                }`}
            </style>

            <section id="features" className="py-12 px-4 bg-black flex flex-col justify-center items-center gap-8">
                <div>
                    <p className="text-white text-3xl md:text-4xl font-semibold">Features to keep a key on</p>
                </div>
                {/* Features Grid */}
                <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {featuresData.map((feature, index) => (
                        <div key={index} className='bg-gradient-to-b from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 space-y-4 hover:-translate-y-2 hover:border-[#2e34e0]/30 transition-all duration-300 group'>
                            <div className="text-[#2e34e0] group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className='font-semibold text-xl text-white group-hover:text-[#2e34e0] transition-colors duration-300'>
                                {feature.title}
                            </h3>
                            <p className='text-base leading-relaxed text-gray-300'>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
export default Features