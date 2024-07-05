import React, { useContext, useEffect, useState } from 'react'
import { Message } from '../components'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { FaChevronDown } from 'react-icons/fa'

const Messages = () => {
  const { data } = useContext(ChatContext)
  const [messages, setMessages] = useState([])

  // console.log(data);

  useEffect(() => {
    const getChat = () => {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };

    }
    data?.chatId && getChat()
  }, [data?.chatId]);

  console.log(messages);
  return (
    <div className=' h-full overflow-y-scroll relative'>
      {messages.map((m) => (

        <Message message={m} key={m.id} />
      ))}
      {/* <button
        onClick={scrollToBottom}
        className='fixed bottom-24 mx-5 bg-dark_neutral w-12 h-12 shadow-md shadow-[#000000b0] rounded-full flex items-center justify-center'
      >
        <FaChevronDown className='text-2xl text-dark_accent' />
      </button> */}
    </div>
  )
}

export default Messages