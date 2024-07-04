import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { AuthContext } from '../context/AuthContext';
import { MdOutlineSearch } from 'react-icons/md';

const Search = () => {
  const { currentUser } = useContext(AuthContext)
  const [userName, setUserName] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const handelSearch = async () => {
    const q = query(collection(db, 'users'), where('displayName', "==", userName))

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
        // console.log(doc);
      });
    } catch (error) {
      console.log(error);
      setErr(true)
    }
  }

  const handelKey = (e) => {
    e.code == "Enter" && handelSearch()
  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) { }

    setUser(null);
    setUserName("")
  };

  return (
    <div className='search'>
      <div className="m-3 bg-[#313b43] rounded-md flex items-center flex-row-reverse ">
        <input className=' bg-transparent p-3 w-full outline-none placeholder:text-dark_accent text-dark_accent_content' type="text" placeholder='Find user' value={userName} onKeyDown={handelKey} onChange={(e) => { setUserName(e.target.value) }} />
        <MdOutlineSearch className=" text-3xl ml-4 text-dark_accent" />
      </div>
      {err && <span>User not foun!</span>}
      {user && <div className=" flex items-center gap-5 p-3 border-b border-b-[#313b43] hover:bg-[#313b436e]" onClick={handleSelect}>
        <img className=' w-12 aspect-square object-cover rounded-full' src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span className=' font-semibold text-dark_neutral_content text-lg'>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search