import React, { useEffect, useState } from 'react'
import {user} from "../Join/Join"
import socketIO from "socket.io-client";
import "./Chat.css";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
let socket;
const ENDPOINT="http://localhost:4500/";
const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);
   const send=()=>{
   const message=document.getElementById('chatInput').value;
    socket.emit('message',{message,id});
    document.getElementById('chatInput').value="";
   }
console.log(user);
  useEffect(()=>{

     socket=socketIO(ENDPOINT,{transports:["websocket"]});
    socket.on("connect",()=>{
      alert("connected");
      setid(socket.id);
    })
    console.log(socket);
    socket.emit("joined",{user});  //send karega user backend ko
   
    socket.on('welcome',(data)=>{
      setMessages((messages)=>[...messages, data]);
      console.log(data.user,data.message);
    })    //on se receive karega and event ka name same hona chaiye jo frontend me used kiya tha
    socket.on('userJoined',(data)=>{  //on se receive karega on samme event userjoined
      setMessages((messages)=>[...messages, data]);
      console.log(data.user, data.message);
    })
    socket.on('leave',(data)=>{
      setMessages((messages)=>[...messages, data]);
      console.log(data.user, data.message);
    })
    return ()=>{
      socket.disconnect();
      socket.off();
    }
  },[])
  useEffect(()=>{
    socket.on('sendMessage', (data)=>{
      setMessages((messages)=>[...messages, data]);
      console.log(data.user, data.message, data.id);
    })
    return ()=>{
    socket.off();
    }
  },[messages])
  return (
    <div className='chatpage'>
      <div className='chatcontainer'>
        <div className='header'>
          <h2>Chatting App</h2>
          <a href='/'>Leave Chat</a>
        </div>
        <ReactScrollToBottom className='chatbox'>
         
         {messages.map((item, i) => 
               <Message user={item.id===id?'':item.user} message={item.message}  classs={item.id===id?'right':'left'}/>
        )}
        </ReactScrollToBottom>
        <div className='inputbox'>
            <input type='text' id="chatInput" placeholder='Type your message here...'/>
            <button onClick={send} className='sendbtn'>Send</button>
          </div>
      </div>
      
    </div>
  )
}

export default Chat
