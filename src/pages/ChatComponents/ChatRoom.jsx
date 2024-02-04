import React from "react";
import { useRef, useEffect, useState } from "react";
import "./chatroom.css";
import { getUserAuth } from "../../utils/Context";
import MultilineTextFields from "../../components/textArea";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { blue } from "@mui/material/colors";
import LongMenu from "../../mini-components/messageOption";


const ChatRoom = ({
  User1,
  displayClickUser,
  text,
  settext,
  sendMessage,
  chatMess,
  selectUser,
  OpeningText,
  setOpeningText,
  SendImg,
  setSendImg,
  selectMessageId,
  deleteMessage}) => {
  
  const { User } = getUserAuth();
  useEffect(() => {
    () => { selectUser(User) };
  }, []);



  return (
    <div className="chatroom-container">
      <div className="displayClickUser-con">
        <span className="displayClickUser">{displayClickUser.username}</span>
      </div>

      <div style={{color:'black', fontSize:'30px',display:'flex',justifyContent:'center'}}>{OpeningText}</div>

      <div className="messages-main-container">
      {chatMess.map((msg, index) => {
        return (
          <div key={index} className="chat-container">
          {/* <div className={`chat-bubble ${msg.from === User1 ? "sender" : "receiver"}`}> */}
          <div  className={`chat-bubble ${msg.from === User1 ? "sender" : "receiver"}`}>        
              <img style={{ width: '100%' }} src={msg.image} />
              <div style={{ display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
              {msg.text}<LongMenu deleteMessage={deleteMessage} id={msg.id} />
              </div>
             <p style={{fontSize:'10px'}}> {msg.createdAt}</p>
          </div>
          </div>
        );
      })} 
</div>

      <div className="input-con">
      <MultilineTextFields
        settext={settext}
        text={text}
        />
        
        <div className="something">
        
          <label
  style={{
    display: 'inline-block',
    padding: '10px 15px',
    backgroundColor: '#3498db',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  }}
>
  Upload Image
  <input
    type="file"
    onChange={(e) => { setSendImg(e.target.files[0]) }}
    style={{ display: 'none' }}
  />
</label>
       <Stack direction="row" spacing={2}>
      <Button onClick={sendMessage} variant="contained" endIcon={<SendIcon />}>
        send
      </Button>
        </Stack>
        </div>
        </div>
      {/* <input className="message-input" value={text} onChange={(e) => {settext(e.target.value);}} type="text" /> */}
      {/* <button className="send-button" onClick={sendMessage}>send message</button> */}
    </div>
  );
};

export default ChatRoom;
