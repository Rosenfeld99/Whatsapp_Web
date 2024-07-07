import React, { useContext, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { AuthContext } from '../context/AuthContext'
import { MdLogout } from 'react-icons/md'
import '../App.css'
import Dropdown from './Dropdown/Dropdown'
import { FiMoreVertical } from 'react-icons/fi'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    'Profile',
    'Settings',
    'Mode',
    'Logout'
  ];

  const handleDropdownOption = (option) => {
    switch (option) {
      case 'Profile':
        break;
      case 'Settings':
        break;
      case 'Mode':
        break;
      case 'Logout':
        signOut(auth)
        break;
      default:
        break;
    }
    setIsOpen(false); // Close the dropdown after an option is selected
  };
  return (
    <div className='navbar flex flex-row-reverse items-center justify-between gap-5 h-16 bg-dark_neutral text-dark_accent_content px-5 py-3'>
      {/* <span className=' text-3xl font-bold font-sans'>PChat</span> */}
      <Dropdown options={options} isOpen={isOpen} setIsOpen={setIsOpen} width={'w-40'} positionStyle={'relative'} handleOptionSelect={handleDropdownOption}>
        <FiMoreVertical className='text-2xl text-dark_accent' />
      </Dropdown>
      <div className="user flex items-center gap-5">
        {currentUser.photoURL ? <img src={currentUser.photoURL} alt="" className=' w-11 aspect-square object-cover rounded-full bg-dark_accent' /> : <div className='w-11 rounded-full h-11 animate-pulse bg-dark_accent' />}
        {currentUser.displayName ? <span className={`text-dark_primary_content font-semibold text-lg`}>{currentUser.displayName}</span> : <div className=' h-4 w-20 animate-pulse bg-dark_accent rounded' />}
      </div>
    </div>
  )
}

export default Navbar