import React, { useContext } from 'react'
import { Chat, Sidebar } from '../components'
import config from '../config/config';

const Home = () => {

  console.log(config.APIKEY_SECRET);

  return (
    <div className='home flex items-center h-screen justify-center w-full xl:p-5 bg-dark_primary'>
      <div className="container flex h-full flex-1 w-full">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home