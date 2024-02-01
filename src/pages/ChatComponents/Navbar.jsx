import React from 'react'
import './navbar.css'
// import { BsThreeDotsVertical } from 'react-icons/bs';
import DropdownNav from '../../mini-components/DropdownNav';
import { getUserAuth } from '../../utils/Context';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/FirebaseConfig';


const Navbar = ({Overlay}) => {
  const { User, logOut } = getUserAuth();
 
  // console.log(User)
  return (
    <div className='navbar-container'>
      <nav>
        <ul>
          <div className='nav-left'>
           <img src={User.photoURL} alt="img" />
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
