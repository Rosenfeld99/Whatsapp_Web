import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase/firebase'
import React, { useState } from 'react'
import { add } from '../assets'
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };
    return (
        <div className="bg-[#0e1317] h-screen flex items-center justify-center">
            <div className="bg-[#131b21] p-5 sm:p-16 rounded-xl flex flex-col items-center gap-2.5">
                <span className="text-[#e9edef] font-bold font-mono text-[45px]">PChat</span>
                <span className="text-[#e9edef] text-[22px]">Register</span>
                <form className="flex flex-col gap-3.75" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Display name" className="p-5 border-b-2 w-[250px] border-[#384045] outline-none bg-transparent text-[#e9edef] placeholder:text-gray-500" />
                    <input type="email" placeholder="email" className="p-5 border-b-2 w-[250px] border-[#384045] outline-none bg-transparent text-[#e9edef] placeholder:text-gray-500" />
                    <input type="password" placeholder="password" className="p-5 border-b-2 w-[250px] border-[#384045] outline-none bg-transparent text-[#e9edef] placeholder:text-gray-500" />
                    <input type="file" id="file" className="hidden" />
                    <label htmlFor="file" className="flex items-center mt-4 gap-2.5 text-[#e9edef] text-[12px] cursor-pointer">
                        <img src={add} alt="" className="w-8" />
                        Add an avatar
                    </label>
                    <button className="bg-[#26a283] hover:bg-[#1b5c4c] text-[#e9edef] mt-7 rounded-md p-2.5 font-bold border-none cursor-pointer">Sign Up</button>
                    {err && <span className="text-error">Somthing went wrong</span>}
                </form>
                <p className="text-[#e9edef] mt-2.5 text-[12px]">You do have an account? <Link className="text-[#26a283] hover:text-[#1b5c4c]" to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register