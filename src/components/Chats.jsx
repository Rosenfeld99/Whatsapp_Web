import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
const Chats = () => {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getUser = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });

      return () => {
        unsub()
      }
    }

    currentUser.uid && getUser()
  }, [currentUser.uid])

  const handelSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u })
  }
  // console.log(Object.entries(chats));
  return (
    <div className='chats flex flex-col'>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (

        <div className="userChat flex items-center gap-5 p-3  text-dark_neutral_content border-b border-b-[#313b43] hover:bg-[#313b436e]" key={chat[0]} onClick={() => handelSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} className=' w-12 aspect-square object-cover rounded-full' alt="" />
          <div className="userChatInfo">
            <span className=' font-semibold text-lg'>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Chats