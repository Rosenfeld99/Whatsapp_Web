import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Dropdown from './Dropdown/Dropdown';
import { FaChevronDown } from 'react-icons/fa';
import useChats from '../hooks/useChats';

const Message = ({ message, smallDevice }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useChats()
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    'Download',
    'Share',
    'Remove'
  ];

  const downloadImage = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching image: ${response.statusText}`);
      }

      const blob = await response.blob();
      const urlObject = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = urlObject;
      link.download = 'downloaded_image.jpg'; // You can dynamically set the filename here if needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };


  const shareImage = async (url) => {
    try {
      const blob = await fetch(url).then((res) => res.blob());
      const file = new File([blob], 'shared_image.jpg', { type: blob.type });
      const filesArray = [file];
      const shareData = {
        files: filesArray,
        title: 'Shared Image'
      };
      navigator.share(shareData);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDropdownOption = (option) => {
    switch (option) {
      case 'Download':
        downloadImage(message.image);
        break;
      case 'Share':
        shareImage(message.image);
        break;
      case 'Remove':
        // Handle remove functionality
        break;
      default:
        break;
    }
    setIsOpen(false); // Close the dropdown after an option is selected
  };

  return (
    <div className={`message relative w-full gap-3 px-7 py-4 ${message.senderId === currentUser.uid ? 'items-start flex flex-row-reverse justify-start ' : ' items-start justify-start flex'}`}>
      {!smallDevice && <div className="messageInfo flex flex-col items-center">
        <img className='w-10 aspect-square object-cover rounded-full bg-dark_accent' src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
      </div>}
      {(message.image || message.text) && <div className={`message relative max-w-72 rounded-b-lg ${message.senderId === currentUser.uid ? 'bg-msg_owner_dark rounded-l-lg' : "bg-msg_sender_dark rounded-r-lg"}`}>
        {message.image &&
          <div>
            <Dropdown options={options} isOpen={isOpen} setIsOpen={setIsOpen} sideOpenDropdown={message.senderId === currentUser.uid ? 'right-0' : 'left-0'} width={"w-32"} positionStyle={'absolute top-0 left-0 z-50'} handleOptionSelect={handleDropdownOption}>
              <FaChevronDown className='text-2xl text-dark_primary_content' />
            </Dropdown>
            <img className={`image_placeholder p-1 z-40 relative rounded-lg h-full`} src={message.image} alt="" />
          </div>
        }

        <p className={`p-1 px-3 z-40 relative items-end text-dark_primary_content ${message.senderId === currentUser.uid ? " flex" : "  flex flex-row-reverse"}`}>
          {message.text}
        </p>
      </div>}
    </div>
  );
};

export default Message;
