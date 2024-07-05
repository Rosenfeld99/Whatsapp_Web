import React, { useContext, useState } from 'react'
import { Input, Messages } from '../components'
import { ChatContext } from '../context/ChatContext'
import { FaVideo } from 'react-icons/fa'
import { FiMoreVertical } from 'react-icons/fi'
import { MdOutlineSearch } from 'react-icons/md'
import '../App.css'
import Dropdown from './Dropdown/Dropdown'

const Chat = () => {

  const options = [
    'Profile',
    'Settings',
    'Logout'
  ];

  const [isOpen, setIsOpen] = useState(false);

  const { data } = useContext(ChatContext)
  // console.log(data);
  return (
    <div className=' hidden chat-back bg-dark_secoundary max-h-screen flex-1 xl:flex flex-col justify-between'>
      <div className="flex items-center justify-between h-16 bg-dark_neutral px-5 py-3">
        <span className=' flex items-center gap-3'>
          {data.user?.photoURL && <img src={data.user?.photoURL} className=' w-11 aspect-square object-cover rounded-full' alt="profile avatar" />}
          <span className='text-dark_neutral_content font-semibold text-lg'>{data.user?.displayName}</span>
        </span>
        <div className="chatIcons flex items-center gap-3">
          <FaVideo className='text-2xl text-dark_accent opacity-50' />
          <MdOutlineSearch className=" text-2xl ml-4 text-dark_accent" />
          <Dropdown options={options} isOpen={isOpen} setIsOpen={setIsOpen} width={'w-40'} positionStyle={'relative'}>
            <FiMoreVertical className='text-2xl text-dark_accent' />
          </Dropdown>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat