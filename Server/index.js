const http=require("http");
const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const socketIo=require("socket.io");
const path=require("path");
const app=express();

dotenv.config();
//------deployment---
const __dirname1=path.resolve();
app.use(express.static(path.join(__dirname1,'../chaat/build')));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname1,'../','chaat','build','index.html'));
});
//-----deployment


const port=4500|| process.env.PORT; //online jab host karenge to jo bhi port milega wo lelega

const users=[{}];
app.use(cors());

const server=http.createServer(app);


const io=socketIo(server);
io.on("connection",(socket)=>{
    console.log("new connection");

    socket.on(`joined`,({user})=>{  //on means receive karna data frontend se 
        users[socket.id]=user;
        console.log(`${user} has joined`)
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined`});  //emit mtlb bhejega and jisne join kiya usko chorke sabko
        socket.emit('welcome',{user:"Admin",message:`Welcome to the chat ${users[socket.id]}`})//ye usko send hoga jo group me aaya h 
    })
   
    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});

    })

  socket.on('disconnect',()=>{
    socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`})
      console.log(`user left`);
  })
   
})
server.listen(port,()=>{
    console.log(`server is working ${port}`);
})