const About = () => {
    return (
        <section id="about" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Revolutionizing <span className="bg-gradient-to-r from-[#2e34e0] to-blue-400 bg-clip-text text-transparent">Resume Building</span> with AI
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        We're on a mission to help job seekers land their dream careers by creating intelligent, 
                        ATS-optimized resumes that stand out in today's competitive job market.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-3xl font-semibold text-white">
                                Why We Built This Platform
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                Traditional resume builders are outdated and don't understand modern hiring practices. 
                                We created an AI-powered solution that analyzes job descriptions, optimizes for ATS systems, 
                                and crafts personalized resumes that get you noticed.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-8">
                            <div className="text-center p-6 bg-gradient-to-b from-gray-800/50 to-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl">
                                <div className="text-3xl font-bold text-[#2e34e0] mb-2">50K+</div>
                                <div className="text-gray-300 text-sm">Resumes Created</div>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-b from-gray-800/50 to-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl">
                                <div className="text-3xl font-bold text-[#2e34e0] mb-2">85%</div>
                                <div className="text-gray-300 text-sm">Success Rate</div>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 bg-[#2e34e0]/20 rounded-full flex items-center justify-center mt-1">
                                    <svg className="w-3 h-3 text-[#2e34e0]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">AI-Powered Content Generation</h4>
                                    <p className="text-gray-400 text-sm">Smart algorithms create compelling content tailored to your industry</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 bg-[#2e34e0]/20 rounded-full flex items-center justify-center mt-1">
                                    <svg className="w-3 h-3 text-[#2e34e0]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">ATS Optimization</h4>
                                    <p className="text-gray-400 text-sm">Ensures your resume passes through applicant tracking systems</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 bg-[#2e34e0]/20 rounded-full flex items-center justify-center mt-1">
                                    <svg className="w-3 h-3 text-[#2e34e0]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Professional Templates</h4>
                                    <p className="text-gray-400 text-sm">Beautiful, modern designs that make a lasting impression</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Visual */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-[#2e34e0]/20 to-blue-600/10 backdrop-blur-sm border border-[#2e34e0]/30 rounded-2xl p-8 relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-4 left-4 w-32 h-32 bg-[#2e34e0] rounded-full blur-3xl"></div>
                                <div className="absolute bottom-4 right-4 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
                            </div>
                            
                            {/* Content */}
                            <div className="relative z-10 space-y-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-[#2e34e0]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#2e34e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-semibold text-white mb-2">Smart Resume Analysis</h4>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        Our AI analyzes thousands of successful resumes and job postings to understand 
                                        what recruiters are looking for, then applies that knowledge to your resume.
                                    </p>
                                </div>

                                <div className="border-t border-gray-700/50 pt-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-400">Processing Speed</span>
                                        <span className="text-[#2e34e0] font-medium">30 seconds</span>
                                    </div>
                                    <div className="w-full bg-gray-700/50 rounded-full h-2 mt-2">
                                        <div className="bg-gradient-to-r from-[#2e34e0] to-blue-400 h-2 rounded-full w-[85%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-[#2e34e0]/10 to-blue-600/10 backdrop-blur-sm border border-[#2e34e0]/30 rounded-2xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Transform Your Career?
                        </h3>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                            Join thousands of professionals who have successfully landed their dream jobs with our AI-powered resume builder.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-[#2e34e0] hover:bg-[#2e34e0]/80 text-white px-8 py-3 rounded-full transition-all duration-200 font-medium">
                                Start Building Now
                            </button>
                            <button className="bg-transparent border border-[#2e34e0] text-[#2e34e0] hover:bg-[#2e34e0]/10 px-8 py-3 rounded-full transition-all duration-200 font-medium">
                                View Examples
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;