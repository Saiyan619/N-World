import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../pages/login.css';
import Loader from '../mini-components/Loader';
import { getUserAuth } from '../utils/Context';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../utils/FirebaseConfig';


const Login = () => {

    const { User, login } = getUserAuth();
    const navigate = useNavigate();
  
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
  const [username, setUsername] = useState('');
  const [handleLoginErr, sethandleLoginErr] = useState('')

  
 

    function handleUsername(e) {
      setUsername(e.target.value);
        console.log(e.target.value)
    }function handleEmail(e) {
      setemail(e.target.value);
      console.log(e.target.value)
    }
    function handlePassword(e) {
      setpassword(e.target.value);
      console.log(password)
    }
  const handleSubmit = async () => {
      try {
        await login(email, password);
      
        console.log("User logged in successfully. Updating isOnline to true.");
        if (!User) {
          sethandleLoginErr('Error with credentials.Please Click Again and give it a few seconds 👼')
          console.log('unexist')
        } 
        const userId = User.uid
        console.log(userId)
      
        const updateRef = doc(db, "users", User.uid);
        await updateDoc(updateRef, {
          isOnline: true
        });
          
        
     
        console.log("Update successful. Navigating to /chats.");
      
        
          navigate('/chats');
       
        
       
      
      } catch (error) {
        console.error("Error during login:", error);
      }
      
    }
// console.log(User)
  return (
   
    <div>
       
    <div className='signup-main-container'>
    <div className='signup-sub-main-container'>
      <span className='signup'>login</span>
      {/* <input type="email" onChange={handleUsername} value={username}  className= 'email-password-input' placeholder='Email'/> */}
      <input type="email" onChange={handleEmail} value={email}  className= 'email-password-input' placeholder='Email'/>
      <input type="password" onChange={handlePassword} value={password}  className='email-password-input' placeholder='password' />
          <button onClick={handleSubmit}>Login</button>
          <p style={{ color: 'red' }}>{handleLoginErr}</p> 
      <div className='remember-me'>
        <div className='remember-me-1'>
            <input type="checkbox" name="" id="" /><span>Remember me</span>
            </div>
        <span>Need Help?</span>
      </div>
      <p>Don't have an account?<Link to='/signup'> Sign Up</Link></p>
      </div>
      </div>
  </div>

  )
}

export default Login
