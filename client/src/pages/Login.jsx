import React from "react"
import { useNavigate } from "react-router-dom"
import api from "../configs/api"
import { useDispatch } from "react-redux"
import { login } from "../app/features/authSlice"
import toast from "react-hot-toast"
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = new URLSearchParams(window.location.search);
    const urlState = query.get('state')
    const [state, setState] = React.useState(urlState || "login")

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post(`/api/users/${state}`, formData)
            dispatch(login(data))
            localStorage.setItem("token", data.token)
            toast.success(data.message)
            navigate("/app") // Redirect to dashboard
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="flex h-screen w-full bg-black">
            <div className="w-1/2 hidden md:block">
                <img src="/Login.jpg" alt="login" className="h-full w-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative">
                {/* Background beams effect */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-[#2e34e0]/30 to-blue-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-[#2e34e0]/30 rounded-full blur-3xl"></div>
                </div>

                <form onSubmit={handleSubmit} className="sm:w-[400px] w-full text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-8 py-10 shadow-2xl relative z-10">
                    <h1 className="text-white text-3xl mt-2 font-bold">{state === "login" ? "Welcome Back" : "Create Account"}</h1>
                    <p className="text-white/70 text-sm mt-2 mb-8">Please {state === "login" ? "sign in to continue" : "fill in your details"}</p>

                    {state !== "login" && (
                        <div className="flex items-center mt-6 w-full bg-white/10 backdrop-blur-sm border border-white/20 h-12 rounded-full overflow-hidden pl-6 gap-3 hover:border-[#2e34e0]/50 transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round opacity-70"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="bg-transparent border-none outline-none ring-0 text-white placeholder-white/50 w-full"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                            />
                        </div>
                    )}

                    <div className="flex items-center w-full mt-4 bg-white/10 backdrop-blur-sm border border-white/20 h-12 rounded-full overflow-hidden pl-6 gap-3 hover:border-[#2e34e0]/50 transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail opacity-70"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="bg-transparent border-none outline-none ring-0 text-white placeholder-white/50 w-full"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="flex items-center mt-4 w-full bg-white/10 backdrop-blur-sm border border-white/20 h-12 rounded-full overflow-hidden pl-6 gap-3 hover:border-[#2e34e0]/50 transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock opacity-70"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="bg-transparent border-none outline-none ring-0 text-white placeholder-white/50 w-full"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="mt-6 text-left">
                        <button className="text-sm text-white/70 hover:text-white transition-colors duration-200" type="button">Forgot password?</button>
                    </div>

                    <button type="submit" className="mt-6 w-full h-12 rounded-full text-white bg-[#2e34e0] hover:bg-[#2e34e0]/80 transition-all duration-200 font-medium shadow-lg hover:shadow-[#2e34e0]/25">
                        {state === "login" ? "Sign In" : "Create Account"}
                    </button>

                    <p className="text-white/70 text-sm mt-6 mb-2">
                        {state === "login" ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                            className="text-[#2e34e0] hover:text-blue-400 transition-colors duration-200 ml-1 font-medium"
                        >
                            {state === "login" ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;