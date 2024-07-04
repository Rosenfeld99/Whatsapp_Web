import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { AuthContext } from '../context/AuthContext'
import { MdLogout } from 'react-icons/md'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='navbar flex flex-row-reverse items-center justify-between gap-5 h-16 bg-dark_neutral text-dark_accent_content px-5 py-3'>
      <span className=' text-3xl font-bold font-sans'>PChat</span>
      <div className="user flex items-center gap-5">
        <img src={currentUser.photoURL} alt="" className=' w-11 aspect-square object-cover rounded-full' />
        <span className=' text-dark_primary_content font-semibold text-lg'>{currentUser.displayName}</span>
        <button className='bg-dark_accent px-5 py-2 rounded-md flex items-center gap-3' onClick={() => signOut(auth)}>Logout <MdLogout className='text-2xl' /></button>
      </div>
    </div>
  )
}

export default Navbar