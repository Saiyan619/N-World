import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, query, where, onSnapshot, doc, setDoc, serverTimestamp, orderBy, deleteDoc } from "firebase/firestore";
import { db, storage } from '../utils/FirebaseConfig';
import Navbar from './ChatComponents/Navbar';
import ChatRoom from './ChatComponents/ChatRoom';
import Sidebar from './ChatComponents/Sidebar';
import Button from '@mui/material/Button';
import './chat.css'
import { getUserAuth } from '../utils/Context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const Chat = () => {
  const [name, setname] = useState('')
  const [age, setage] = useState('')
  const [userList, setUserList] = useState([])
  const [SearchedUser, setSearchedUser] = useState([])
  const [displayClickUser, setdisplayClickUser] = useState({})
  const [text, settext] = useState('')
  const [chatMess, setchatMess] = useState([])
  const [overlay, setoverlay] = useState(false);
  const [SendImg, setSendImg] = useState('');
  const [OpeningText, setOpeningText] = useState('Start a conversation👋👋 ');
  const [lastChatMess, setlastChatMess] = useState('')
  // const [messageId, setmessageId] = useState('');

  function Overlay() {
    setoverlay(!overlay)
  }
  

    const navigate = useNavigate();
  const { User, logOut } = getUserAuth();
  
  const User1 = User.uid;


    useEffect(() => {
     User ? navigate('/chats') : navigate('/chats')
    }, [])
  


  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "!=", User1));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({...doc.data(), id:doc.id});
    setUserList(users)
    // console.log(User1)
    //     const User2 = displayClickUser.uid;
    //     console.log(User2)
    //     const id = User1 > User2 ? `${User1 + User2}` : `${User2 + User1}`
    //     console.log(id)
    
    //     const lastMessagesRef = collection(db, "messages", id, 'chat');
    // const lastMsgQuery = query(lastMessagesRef, orderBy('createdAt', 'desc'));
    
    //       onSnapshot(lastMsgQuery, (querySnapshot) => {
    //         let lastMsgs = []
    //         querySnapshot.forEach((doc) => {
    //           // console.log(doc.id, ' => ', doc.data());
    //           lastMsgs.push(doc.data())
    //         });
    //         if (lastMsgs) {
    //           setlastChatMess(lastMsgs[0])
    //         }
    //         else {
    //           console.log('error')
    //         }
    //       })
   
  });
  return unsubscribe()
});
    
  }, [])

  
  const selectUser = async (user) => {
    setdisplayClickUser(user)
      const User2 = user.uid;
      const id = User1 > User2 ? `${User1 + User2}` : `${User2 + User1}`;
      const messagesRef = collection(db, "messages", id, 'chat');
      const q = query(messagesRef, orderBy('createdAt', 'asc'));
      console.log(user)
      onSnapshot(q, (querySnapshot) => {
        let msgs = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data());
          msgs.push(doc.data());
        });
          setchatMess(msgs);
        setOpeningText(!OpeningText);
        setoverlay(!overlay)
        // console.log(chatMess) 
      });
    if (user) {
      return chatMess
    }

  };

  const selectMessageId = async (cid) => {
  //   console.log(cid)
  //   console.log(User1)
  //   const User2 = displayClickUser.uid;
  //   console.log(User2)
  //   const id = User1 > User2 ? `${User1 + User2}` : `${User2 + User1}`
  //   console.log(id)
// try {
//   const q = query(collection(db, "messages", id, 'chat'), where('id', '==', cid));
//   const querySnapshot = await getDocs(q);

//   if (querySnapshot.size === 0) {
//     console.log("No document found with the specified 'cid' value.");
//     return;
//   }

//   // Assuming there's only one document with the specified 'cid', delete it
//   await deleteDoc(querySnapshot.docs[0].ref);

//   console.log("Message deleted successfully");
// } catch (error) {
//   console.error("Error deleting message:", error);
// }
    
  }


  const deleteMessage = async (cid) => {
    console.log(User1)
    const User2 = displayClickUser.uid;
    console.log(User2)
    const id = User1 > User2 ? `${User1 + User2}` : `${User2 + User1}`
    console.log(cid)

    try {
      const q = query(collection(db, "messages", id, 'chat'), where('id', '==', cid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 0) {
        console.log("No document found with the specified 'cid' value.");
        return;
      }

      // Assuming there's only one document with the specified 'cid', delete it
      await deleteDoc(querySnapshot.docs[0].ref);

      console.log("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  }


  const sendMessage = async () => {
    console.log(User1)
    const User2 = displayClickUser.uid;
    console.log(User2)
    const id = User1 > User2 ? `${User1 + User2}` : `${User2 + User1}`
    console.log(id)

    // const messagesRef = collection(db, 'messages');
    try {
      const currentTimestamp = Math.floor(new Date().getTime() / 1000);
      const formattedTimestamp = new Date(currentTimestamp * 1000).toLocaleString();
      const ImgRef = ref(storage, `MessageImg/${User.uid}`);

      let url;
      if (SendImg) {
        const snap = await uploadBytes(ImgRef, SendImg);
        const Geturl = await getDownloadURL(ref(storage, snap.ref.fullPath))
        url = Geturl
        console.log(SendImg)
      }
     
      const messageId = `${id}-${currentTimestamp}`;
      const docRef = await addDoc(collection(db, "messages", id, 'chat'), {
        id:messageId,
        text,
        from: User1,
        to: User2,
        createdAt: formattedTimestamp,
        image: url || '',
        // isOnline:true
      })
     
      const messagesRef = collection(db, "messages", id, 'chat');
      const q = query(messagesRef, orderBy('createdAt', 'asc'))

      onSnapshot(q, (querySnapshot) => {
        let msgs = []
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          msgs.push(doc.data())
        });
        setchatMess(msgs)
        setSendImg('')
        settext('')
      }) 

      const lastMessageId = `${id}-${currentTimestamp}`;
      // const lastMessageId = `${id}-lastMessage`; // Use a fixed ID for the last message
const lastMessageDocRef = doc(collection(db, "lastmessages"), lastMessageId);

// Create or overwrite the document with the last message
await setDoc(lastMessageDocRef, {
  id: lastMessageId,
  text,
  from: User1,
  to: User2,
  createdAt: formattedTimestamp,
});

const lastMessagesRef = collection(db, "messages", id, 'chat');
const lastMsgQuery = query(lastMessagesRef, orderBy('createdAt', 'desc'));

      onSnapshot(lastMsgQuery, (querySnapshot) => {
        let lastMsgs = []
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          lastMsgs.push(doc.data())
        });
        
        if (lastMsgs) {
          setlastChatMess(lastMsgs[0])
        }
        else {
          console.log('error')
        }
      })
    
    } catch (error) {
      console.error(error)
    }
  }

 

  
 

  const selectSearchedUser = async(user) => {
    setdisplayClickUser(user)
    const User2 = user.uid;
    const id = User1 > User2 ? `${User1 + User2}` : `${User2 + User1}`;
    const messagesRef = collection(db, "messages", id, 'chat');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    console.log(user)
    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        msgs.push(doc.data());
      });
        setchatMess(msgs);
        console.log(chatMess)
      setOpeningText(!OpeningText);
      // console.log(chatMess) 
    });
  if (user) {
    return chatMess
  }

  }
  const searchQuery = async(id) => {
    const UsersRef = collection(db, "users");

    // Create a query against the collection.
      const q = query(UsersRef, where("username", "==", name))
    try {
onSnapshot(q, (querySnapshot) => {
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });

    console.log(users)
    setSearchedUser(users)
  });
});

    } catch (error) {
      console.error(error)
    }
  }
 

  return (
    <div className='chat'>
    <div className='chat-main-container'>
        <div className='Navbar'><Navbar Overlay={Overlay} /></div>
        
        <div className='side-nd-chatroom'>
          
          <div className={overlay ? 'sidebar' : 'sidebar_active'}>
            
            <Sidebar
              name={name}
              age={age}
              setname={setname}
              setage={setage}
              searchQuery={searchQuery}
              SearchedUser={SearchedUser}
              userList={userList}
              selectUser={selectUser}
              displayClickUser={displayClickUser}
              User1={User1}
              Overlay={Overlay}
              chatMess={chatMess}
              SendImg={SendImg}
              selectSearchedUser={selectSearchedUser}
              lastChatMess={lastChatMess}
            />
          </div>

          <div className={overlay ? 'chatroom' : 'chatroom_active'}>
            <ChatRoom
              displayClickUser={displayClickUser}
              text={text}
              settext={settext}
              chatMess={chatMess}
              sendMessage={sendMessage}
              selectUser={selectUser}
              User1={User1}
              setOpeningText={setOpeningText}
              OpeningText={OpeningText}
              setSendImg={setSendImg}
              selectMessageId={selectMessageId}
              deleteMessage={deleteMessage}
              selectSearchedUser={selectSearchedUser}
            />

          </div>
          </div>
    </div>
    </div>
  )
}

export default Chat
