import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { TbTriangleInvertedFilled } from 'react-icons/tb'
import '../App.css'
import { FaChevronDown } from 'react-icons/fa'
import Dropdown from './Dropdown/Dropdown'


const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  const [image_option, setImageOption] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    'Download',
    'Share',
    'Remove'
  ];


  const ref = useRef()
  useEffect(() => {
    // ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [message])
  // console.log(new Date(message.date.seconds*1000));
  console.log(message);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div ref={ref} className={`message relative w-full gap-3 px-7 py-4 ${message.senderId === currentUser.uid ? 'items-start flex flex-row-reverse justify-start ' : ' items-start justify-start flex'}`}>
      <div className="messageInfo flex flex-col items-center">
        <img className='w-10 aspect-square object-cover rounded-full bg-dark_accent' src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
      </div>
      {(message.image || message.text) && <div className={`message relative max-w-72 rounded-b-lg ${message.senderId === currentUser.uid ? 'bg-msg_owner_dark rounded-l-lg' : "bg-msg_sender_dark rounded-r-lg"}`}>
        {message.image &&
          <div className=""
            onMouseLeave={() => !isOpen && setImageOption(null)}
          >
            {image_option == message?.id &&
              <Dropdown options={options} isOpen={isOpen} setIsOpen={setIsOpen} width={"w-32"} doFunc={() => setImageOption(null)} positionStyle={' absolute top-0 left-0 z-50"'}>
                <FaChevronDown className='text-2xl text-dark_primary_content' />
              </Dropdown>
            }
            <img
              onMouseEnter={() => setImageOption(message?.id || null)}

              className={`image_placeholder p-1 z-40 relative rounded-lg h-full`}
              src={message.image} alt="" />
          </div>
        }

        <p className={`p-1 px-3 z-40 relative items-end text-dark_primary_content ${message.senderId === currentUser.uid ? " flex" : "  flex flex-row-reverse"}`}>
          <span className={`text-[#a7abad] font-semibold pt-2 text-xs ${message.senderId === currentUser.uid ? "pr-3" : "pl-3"}`}>{formatTime(message.date)}</span>
          {message.text}
        </p>
        <TbTriangleInvertedFilled className={`w-5 h-5 text-4xl rounded-l-full z-10 absolute -top-[2.5px] ${message.senderId === currentUser.uid ? 'text-msg_owner_dark right-0 -mr-2' : "text-msg_sender_dark left-0 -ml-2"}`} />
      </div>}
    </div>
  )
}

export default Message