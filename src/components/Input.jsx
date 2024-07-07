import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase/firebase'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { LuImagePlus } from 'react-icons/lu'
import { IoMdAttach } from 'react-icons/io'
import { IoSendSharp } from 'react-icons/io5'
import useChats from '../hooks/useChats'

const Input = () => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useChats()

  const [text, setText] = useState("")
  const [image, setImage] = useState(null)

  const handelSend = async () => {
    if (!currentUser) {
      console.error("User is not authenticated");
      return;
    }

    try {
      if (image) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, image);
        console.log("Uploading image:", image);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Error during upload:", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now()
          })
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [`${data.chatId}.lastMessage`]: { text },
        [`${data.chatId}.date`]: serverTimestamp()
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [`${data.chatId}.lastMessage`]: { text },
        [`${data.chatId}.date`]: serverTimestamp()
      });

      setText("");
      setImage(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className='input flex items-center justify-between w-full p-3 gap-5 bg-dark_neutral '>
      <div className="send flex items-center gap-5 px-3">
        <button>
          <IoMdAttach className='text-3xl text-dark_accent' />
        </button>
        <input type="file" style={{ display: 'none' }} className='' id='file' onChange={(e) => setImage(e.target.files[0])} />
        <label htmlFor="file">
          <LuImagePlus className='text-3xl cursor-pointer text-dark_accent' />
        </label>
      </div>
      <input type="text" placeholder='Type somthing...' className='w-full p-3 rounded-md outline-none bg-[#313b43] text-dark_accent_content placeholder:text-dark_accent' value={text} onChange={(e) => setText(e.target.value)} />
      <button>
        {(text != "" || image) && <button onClick={handelSend}><IoSendSharp className='text-3xl text-dark_accent' /></button>}
      </button>
    </div>
  )
}

export default Input