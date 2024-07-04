import React, { useContext, useEffect, useState } from 'react'
import { Message } from '../components'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'

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
    <div className='messages overflow-y-scroll'>
      {messages.map((m) => (

        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messages