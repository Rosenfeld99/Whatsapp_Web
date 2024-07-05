import React, { useContext } from 'react'
import { Chat, Sidebar } from '../components'
import config from '../config/config';
import { AuthContext } from '../context/AuthContext';

const Home = () => {

  const { currentUser } = useContext(AuthContext)
  console.log(config.APIKEY_SECRET);


  return (
    <React.Fragment>
      {currentUser &&
        <div className='home flex items-center h-screen overflow-hidden justify-center w-full xl:p-5 bg-dark_primary'>
          <div className="container flex h-full flex-1 w-full">
            <Sidebar />
            <Chat />
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default Home