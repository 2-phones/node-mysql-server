import express from "express";
import cors from "cors";
import {Server} from "socket.io";
import http from "http";



const app = express();
const PORT = process.env.PORT || 8080;
const socketSever = http.createServer().listen(PORT,  () => {
    console.log(`서버 정상적으로 열렷음 `);
});

const socket = new Server( socketSever ,{
    cors : {
        origin : '*'
    }
});

app.use(cors());

app.get('/' , (req,res) => {
    res.send('서버 열렸음요!!!');
});

socket.on('connect' , msg => {
    msg.on("message", test => {
        console.log(`메세지요청 왔음! : ${test.user}`);
        socket.emit("message" , test.user);
    })
});


