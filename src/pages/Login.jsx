import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase';

const Login = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const handelSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (error) {
            console.log(error);
            setErr(true)
        }

    }
    return (
        <div className="bg-[#0e1317] h-screen flex items-center justify-center">
        <div className="bg-[#131b21] p-5 sm:p-16 rounded-xl flex flex-col items-center gap-2.5">
            <span className="text-[#e9edef] font-bold font-mono text-[45px]">PChat</span>
            <span className="text-[#e9edef] text-[22px]">Login</span>
            <form className="flex flex-col" onSubmit={handelSubmit}>
                <input type="email" placeholder="email" className="p-5 border-b-2 w-[250px] border-[#384045] outline-none bg-transparent text-[#e9edef] placeholder:text-dark_accent" />
                <input type="password" placeholder="password" className="p-5 w-[250px] border-b-2 border-[#384045] outline-none bg-transparent text-[#e9edef] placeholder:text-dark_accent" />
                <button className="bg-[#26a283] hover:bg-[#1b5c4c] text-[#e9edef] mt-7 p-2.5 font-bold border-none cursor-pointer rounded-md">Sign In</button>
                {err && <span className=' text-error'>Somthing went wrong</span>}
            </form>
            <p className="text-[#e9edef] mt-2.5 text-[12px]">You don't have an account? <Link className="text-[#26a283] hover:text-[#1b5c4c]" to="/register">Register</Link></p>
        </div>
    </div>
    )
}

export default Login