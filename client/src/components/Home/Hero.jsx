import Beams from './Beams';
import Banner from "./Banner";
import { Link } from 'react-router-dom';
import Features from './Features';
import About from './About';
import { useSelector } from 'react-redux';
export default function Hero() {
  const { user } = useSelector((state) => state.auth)
  return (
    <div className="min-h-screen w-full bg-black relative">
      <Banner />
      {/* Fullscreen Beams Background */}
      {/* <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 ,zIndex: 0}}>
        <Beams
          lightColor="#2e34e0"
        />
      </div> */}

      {/* Glassmorphic Navbar */}
      <nav className="sticky top-0 z-50 mx-6 mt-6 md:mx-12 lg:mx-16 xl:mx-20">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-5 shadow-2xl max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <span className="text-white font-normal text-2xl" style={{ fontFamily: 'Pacifico, cursive', color: "#fcfcffff" }}>ResumeIQ</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              <a href="#home" className="text-white/90 hover:text-[#2e34e0] transition-colors duration-200 font-medium text-base">
                Home
              </a>
              <a href="#about" className="text-white/90 hover:text-[#2e34e0] transition-colors duration-200 font-medium text-base">
                About
              </a>
              <a href="#features" className="text-white/90 hover:text-[#2e34e0] transition-colors duration-200 font-medium text-base">
                Features
              </a>
              {user ? (
                <Link to="/app" className="bg-[#2e34e0]/20 backdrop-blur-sm border border-[#2e34e0]/30 text-white px-6 py-2 rounded-full hover:bg-[#2e34e0]/40 hover:border-[#2e34e0]/60 transition-all duration-200 font-medium text-base">
                  Dashboard
                </Link>
              ) : (
                <Link to="/login?state=signup" className="bg-[#2e34e0]/20 backdrop-blur-sm border border-[#2e34e0]/30 text-white px-6 py-2 rounded-full hover:bg-[#2e34e0]/40 hover:border-[#2e34e0]/60 transition-all duration-200 font-medium text-base">
                  Sign Up
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Content */}
      <div id="home" className="relative h-[80vh] px-4 -mt-20 overflow-hidden">

        {/* Beams background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Beams lightColor="#2e34e0" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex items-center justify-center h-full mt-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Land Your Dream Job
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              An AI-powered resume builder that creates professional, job-ready resumes tailored to roles and optimized for recruiters and ATS systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login?state=signup" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full hover:bg-[#2e34e0]/30 hover:border-[#2e34e0]/50 transition-all duration-200 font-medium">
                Get Started
              </Link>
              <Link to="/login?state=login" className="bg-transparent border border-white/40 text-white px-8 py-3 rounded-full hover:bg-[#2e34e0]/20 hover:border-[#2e34e0] hover:text-[#2e34e0] transition-all duration-200 font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>

      </div>


      {/* Features section */}
      <Features />

      {/* About section */}
      <About />
    </div>
  );
}
