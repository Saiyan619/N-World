import React from 'react'
import './navbar.css'
// import { BsThreeDotsVertical } from 'react-icons/bs';
import DropdownNav from '../../mini-components/DropdownNav';
import { getUserAuth } from '../../utils/Context';
import profilePic from '/icons8-user-50(1).png'


const Navbar = ({Overlay}) => {
  const { User } = getUserAuth();
 
  return (
    <div className='navbar-container'>
      <nav>
        <ul>
          <div className='nav-left'>
            <img src={User.photoURL === '' ? profilePic : User.photoURL } alt="img" />
            <span className='profile_name'>{User.displayName}</span>
            </div>
          <span className='chats' onClick={Overlay}>My Chats</span>
          <span><DropdownNav /></span>

     
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
     {/* <span><BsThreeDotsVertical size={20} /></span> */}
