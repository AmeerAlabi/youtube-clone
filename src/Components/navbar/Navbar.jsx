import React from 'react'
import menu from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search  from '../../assets/search.png'
import upload from '../../assets/upload.png'
import more from '../../assets/more.png'
import notification from '../../assets/notification.png'
import profile from '../../assets/jack.png'
import { Link } from 'react-router-dom'
import user from '../../assets/user_profile.jpg'
import './Navbar.css'
const Navbar = ({setSidebar}) => {
  return (
   <nav className="flex-div navbar   p-[10px] shadow-custom bg-white sticky top-0 z-[10] justify-between "> 
    <div className="nav-left flex-div"> 
        <img src={menu} alt="" className='menu-icon w-[22px] mr-[25px] ' onClick={() =>setSidebar(prev=>!prev)} /> 
        <Link to='/'><img src={logo} alt="" className='logo w-[130px] ' /></Link>
    </div>

    <div className="nav-middle   ">
        <div className="search-box flex-div border-[1px] border-[#ccc] mr-[15px] p-[9px] rounded-[25px] ">
        <input type="text" placeholder='Search' className=' bg-transparent w-[400px] outline-none ' />
        <img src={search} alt="" className=' w-[15px] ' />
            </div>
    </div>

    <div className="nav-right flex-div">
        <img src={upload} alt="" className='w-[25px] mr-[25px]' />
        <img src={more} alt="" className='w-[25px] mr-[25px]' />
        <img src={notification} alt="" className='w-[25px] mr-[25px]' />
        <img src={user} alt=""  className='w-[35px] mr-[25px] user-icon rounded-full'/>
    </div>
   </nav>
  )
}

export default Navbar
