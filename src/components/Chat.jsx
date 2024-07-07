import React, { useContext, useState } from 'react'
import { Input, Messages } from '../components'
import { FaVideo } from 'react-icons/fa'
import { FiMoreVertical } from 'react-icons/fi'
import { MdOutlineSearch } from 'react-icons/md'
import '../App.css'
import Dropdown from './Dropdown/Dropdown'
import { IoArrowBack } from 'react-icons/io5'
import useChats from '../hooks/useChats'

const Chat = ({ smallDevice }) => {

  const options = [
    'Profile',
    'Settings',
    'Logout'
  ];

  const [isOpen, setIsOpen] = useState(false);

  const { data, dispatch } = useChats()

  const handleBackClick = () => {
    dispatch({ type: "RESET_STATE" });
  };
  console.log(data?.chatId);
  return (
    <React.Fragment>
      {data?.chatId ? <div className='  chat-back bg-dark_secoundary max-h-screen flex-1 flex flex-col justify-between'>
        <div className="flex items-center justify-between h-16 bg-dark_neutral px-1 lg:px-5 py-3">
          <span className=' flex items-center gap-3'>
            {smallDevice && <IoArrowBack className='text-2xl text-dark_accent opacity-50' onClick={handleBackClick} />}
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
        <Messages smallDevice={smallDevice} />
        <Input />
      </div> :
        <div className=' relative bg-dark_secoundary max-h-screen flex-1 w-full flex-col flex items-center justify-center'>
          <div className="text-dark_neutral_content text-6xl font-semibold">PChat</div>
          <img src="/cover_whatsapp.png" className='w-96 h-72 object-cover' alt="" />
        </div>}
    </React.Fragment>
  )
}

export default Chat