import React, { useContext, useEffect, useState } from 'react'
import { Chat, Sidebar } from '../components'
import config from '../config/config';
import { AuthContext } from '../context/AuthContext';
import useChats from '../hooks/useChats';

const Home = () => {

  const { data } = useChats()
  const { currentUser } = useContext(AuthContext)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <React.Fragment>
      {currentUser &&
        <div className='home flex items-center h-screen overflow-hidden justify-center w-full xl:p-5 bg-dark_primary'>
          <div className="container flex h-full flex-1 w-full">
            {/* mobile */}
            {screenWidth < 1264 &&
              <React.Fragment>
                {data?.chatId
                  ? <Chat  smallDevice={true}/>
                  : <Sidebar />
                }
              </React.Fragment>
            }
            {/* desktop */}
            {screenWidth > 1264 &&
              <React.Fragment>
                <Sidebar />
                <Chat />
              </React.Fragment>
            }
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default Home