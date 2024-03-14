import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, query, where, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db, storage } from '../utils/FirebaseConfig';
import { Link } from 'react-router-dom'
import '../pages/signup.css';
import { updateProfile } from 'firebase/auth';
import { getUserAuth } from '../utils/Context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Loader from '../mini-components/Loader';


const SignUp = () => {

 
    const { User, signUp } = getUserAuth();
    const navigate = useNavigate();
  
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
  const [username, setUsername] = useState('');
  const [Img, setImg] = useState('')
  // const [Useloader, setUseloader] = useState(true)
  
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
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //Reference to the path you want it to be stored in
      const ImgRef = ref(storage, `avatar/${res.user.uid}`);
      
      // Upload image and get download URL
      const snap = await uploadBytes(ImgRef, Img);
      const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
  
      // Update user profile with display name and photoURL
      await updateProfile(res.user, { displayName: username, photoURL: url });
  
      // Save additional user data to Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        username,
        email,
        password,
        Img: url,
        isOnline:true
      });
  
      // Redirect to /chats
      console.log('signed up')

      navigate('/chats');
  
    } catch (error) {
      console.log('cant sign up')
      console.error('User creation error:', error.message. error);
    }
  };
  
  
  // console.log(User)
  // console.log(Img.name)
  

  return (
   
    <div>
        {User ? <Loader /> : null}
    <div className='signup-main-container'>
    <div className='signup-sub-main-container'>
          <span className='signup'>SignUp</span>
          <h4>Welcome : {User?.email}</h4>
      <input type="text" onChange={handleUsername} value={username}  className= 'email-password-input' placeholder='username'/>
      <input type="email" onChange={handleEmail} value={email}  className= 'email-password-input' placeholder='Email'/>
      <input type="password" onChange={handlePassword} value={password}  className='email-password-input' placeholder='password' />
      <label
  style={{
    display: 'inline-block',
    padding: '10px 15px',
    backgroundColor: '#3498db',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
              marginTop: '10px',
              overflow:'hidden'
  }}
>
  Upload Profile pic here
  <input
    type="file"
    onChange={(e) => { setImg(e.target.files[0]) }}
    // style={{ display: 'none' }}
  />
</label>      <button onClick={handleSubmit}>Sign Up</button>
      <div className='remember-me'>
        <div className='remember-me-1'>
            <input type="checkbox" name="" id="" /><span>Remember me</span>
            </div>
        <span>Need Help?</span>
      </div>
      <p>you already have an account?<Link to='/'>Login</Link></p>
        </div>
      </div>
  </div>

  )
}



export default SignUp
