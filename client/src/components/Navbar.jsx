import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../app/features/authSlice'

const Navbar = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const Navigate = useNavigate();
    const logoutUser = () => {
        dispatch(logout())
        Navigate('/');
    }
    return (
        <div className='shadow bg-white'>
            <nav className='flex item-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
                <Link to="/">
                    <span className="text-white font-normal text-2xl h-11 w-auto" style={{ fontFamily: 'Pacifico, cursive', color: "rgb(0, 0, 0)" }}>ResumeIQ</span>
                </Link>
                <div className="flex items-center gap-4 text-sm">
                    <p className='max-sm:hidden text-blue-600'>Hi {user?.name}</p>
                    <button onClick={logoutUser} className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full sctive:scale-95 transition-all">Logout</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar