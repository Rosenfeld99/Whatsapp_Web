import React from 'react'
import {Chats, Navbar, Search} from '../components'

const Sidebar = () => {
  return (
    <div className='xl:w-1/3 w-full bg-dark_secoundary border-r-[1px] border-r-[#313b43]'>
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar