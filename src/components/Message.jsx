import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { TbTriangleInvertedFilled } from 'react-icons/tb'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const ref = useRef()
  useEffect(() => {
    // ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [message])
  // console.log(new Date(message.date.seconds*1000));
  return (
    <div ref={ref} className={`message w-full gap-3 px-7 py-4 ${message.senderId === currentUser.uid ? 'items-start flex flex-row-reverse justify-start ' : ' items-start justify-start flex'}`}>
      <div className="messageInfo flex flex-col items-center">
        <img className='w-10 aspect-square object-cover rounded-full bg-dark_accent' src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span className='text-dark_secoundary_content'>Just Now</span>
      </div>
      {(message.image || message.text) && <div className={`message relative max-w-72 rounded-b-lg ${message.senderId === currentUser.uid ? 'bg-msg_owner rounded-l-lg' : "bg-msg_sender rounded-r-lg"}`}>
        {message.image && <img className={`p-1 z-40 relative rounded-lg`} src={message.image} alt="" />}
        <p className={`p-1 px-3 z-40 relative ${message.senderId === currentUser.uid ? "text-dark_primary_content" : " text-dark_primary"}`}>
          {message.text}
        </p>
        <TbTriangleInvertedFilled className={`w-5 h-5 text-4xl rounded-l-full z-10 absolute -top-[2.5px] ${message.senderId === currentUser.uid ? 'text-msg_owner right-0 -mr-2' : "text-msg_sender left-0 -ml-2"}`} />
      </div>}
    </div>
  )
}

export default Message