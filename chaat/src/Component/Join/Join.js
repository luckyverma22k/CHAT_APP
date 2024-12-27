import React, { useState } from 'react'
import "./Join.css";
import logo from "../../../src/logooo.png";
import { Link } from 'react-router-dom';
let user;
const sendUser=()=>{
    user=document.getElementById("joininput").value;
        document.getElementById("joininput").value="";
}

const Join = () => {
   
const [name,setname]=useState("");

const handleLoginClick = (event) => {
  if (!name ) {
    event.preventDefault(); 
    alert('Please fill out name');
  } else {
    sendUser();
  }
};

  return (
   
      <div className='joinPage'>
        <div className='joinContainer'>
            <img src={logo} alt="" />
          <h1>Join the ChatRoom</h1>
          <input type="text" onChange={(e)=>setname(e.target.value)} placeholder='Enter Your NickName' id='joininput'/>
          <input type="text"  onChange={(e)=>setname(e.target.value)} placeholder='Enter Your Name'  id='joininput' />
          <Link to='/chat' onClick={handleLoginClick}>
          <button className='joinBtn'>Join</button>
        </Link>
        </div>
      </div> 
  
  )
}

export default Join;
export {user};