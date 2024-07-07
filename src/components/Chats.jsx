import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { AuthContext } from '../context/AuthContext';
import '../App.css';
import useChats from '../hooks/useChats';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch, data } = useChats()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser.uid) {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        setLoading(false);
      });

      return () => {
        unsub();
      };
    }
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  console.log(chats);

  return (
    <div className="chats flex flex-col min-h-screen overflow-y-scroll">
      {loading ? (
        [1, 2, 3, 4, 5]?.map((index) => (
          <div key={index} className="userChat flex items-center gap-5 p-3 border-b border-b-[#313b43]">
            <div className="w-12 h-12 rounded-full animate-pulse bg-dark_accent"></div>
            <div className="userChatInfo flex flex-col space-y-2">
              <div className="h-4 w-20 animate-pulse bg-dark_accent rounded"></div>
              <div className="h-3 w-32 animate-pulse bg-dark_accent rounded"></div>
            </div>
          </div>
        ))
      ) : (
        chats && Object?.entries(chats)?.sort((a, b) => b[1]?.date - a[1]?.date)?.map((chat) => {
          console.log(chat);
          return (

            <div
              className={` flex items-center gap-5 p-3 text-dark_neutral_content border-b border-b-[#313b43] hover:bg-[#313b436e] ${chat[0] == data?.chatId && "bg-[#323b42]"}`}
              key={chat && chat[0]}
              onClick={() => handleSelect(chat[1]?.userInfo)}
            >
              <img
                src={chat[1]?.userInfo?.photoURL}
                className="w-12 aspect-square object-cover rounded-full bg-dark_accent"
                alt=""
              />
              <div className="userChatInfo">
                <span className="font-semibold text-lg">{chat[1]?.userInfo?.displayName}</span>
                <p>{chat[1]?.lastMessage?.text}</p>
              </div>
            </div>

          )
        })
      )}
    </div>
  );
};

export default Chats;
