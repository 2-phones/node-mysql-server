import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();
const port = 8080;
const socketSever = http.createServer(app).listen(port, () => {
  console.log(`서버 정상적으로 열렷음 포트번호 : ${port}`);
});

const socket = new Server(socketSever, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json({ strict: false }));

app.get("/", (req, res) => {
  res.send("서버 열렸음요!!!");
});

socket.on("connect", (msg) => {
  msg.on("message", (test) => {
    console.log(`메세지요청 왔음! : ${test}`);
    socket.emit("message", test);
  });
});
