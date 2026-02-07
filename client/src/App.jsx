import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import DashBoard from "./pages/Dashboard"
import ResumeBuilder from "./pages/ResumeBuilder"
import SmartResumeAI from "./pages/SmartResumeAi"
import Preview from "./pages/Preview"
import Login from "./pages/Login"
import { useDispatch, useSelector } from "react-redux"
import api from "./configs/api"
import { login, setLoading } from "./app/features/authSlice"
import { Toaster } from "react-hot-toast"

function App() {

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await api.get("/api/users/data", { headers: { Authorization: token } })
        if (data.user) {
          dispatch(login({ token, user: data.user }))
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getUserData();
  }, []);


  return (
    <>
      <Toaster />
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<Home />} />

        {/* Dashboard Route */}
        <Route path="app" element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          <Route path="ai-analyzer" element={<SmartResumeAI />} />
        </Route>

        {/* Preview Route */}
        <Route path="view/:resumeId" element={<Preview />} />

        {/* Login Route */}
        <Route path="login" element={<Login />} />

      </Routes>
    </>
  )
}

export default App
