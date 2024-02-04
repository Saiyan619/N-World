import React from 'react'
// import { useEffect } from 'react'
import './sidebar.css'
import { getUserAuth } from '../../utils/Context'

const Sidebar = ({lastChatMess, selectSearchedUser, selectedUser, chatMess, Overlay, displayClickUser, selectUser, userList, SearchedUser, name, age, setage, setname, adddoc, searchQuery }) => {
  const { User } = getUserAuth();

// console.log(lastChatMess.text)
console.log(displayClickUser.uid)
  return (
    <div className='sidebar-container'>

      <button className='close-btn' onClick={Overlay}>close menu</button>

      <span style={{color:'white', paddingLeft:'7px'}}>Find a Friend</span>
      <div style={{padding:'5px', display:'flex', alignItems:'center', flexDirection:'column'}}>
      <input className='search-input' type="text" onChange={(e)=>{setname(e.target.value)}} value={name} placeholder='Type in Exact name here....'/>
      <button style={{ padding: '7px 20px', color: 'white', backgroundColor: 'blue',border:'1px solid white', borderRadius:'5px', marginTop:'5px'}} onClick={searchQuery}>Find</button>
      </div>     
     
      <div className='search-user'>
      {SearchedUser.map((items,index) => {
        return  <div style={{marginBottom:'20px'}} key={index} onClick={()=>{selectUser(items)}} className={'friends-chat-list'}>
        <img src={items.Img} alt="profilepicture" />
          <span style={{ fontSize: '18px' }}>{items.username}</span>
          <span></span>
        </div>
      })}
      </div>
        

      <h1 style={{ color: 'white' }}>Chats</h1>
      <div className='Users-list'>
      {userList.map((items,index) => {
        return <div key={index} style={{backgroundColor:displayClickUser.uid === items.id ? ' rgb(12, 0, 116)' : ' rgb(25, 6, 201)'}} onClick={() => { selectUser(items) }} className={'friends-chat-list'}>
          {/* {items.uid} */}
        <img src={items.Img} alt="profilepicture" />
          <span style={{ fontSize: '18px' }}>{items.username}</span>
          
          <span style={{ padding: '4px', backgroundColor: items.isOnline ? 'green' : 'red' }}></span>
         
          {lastChatMess?.to === items.uid ? lastChatMess.text : ''  }
        </div>
      })}
       
        </div>

      
    </div>
  )
}

export default Sidebar
