import './env.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import homeRouter from './router/homeRouter.js';
import imgRouter from './router/imgRouter.js';
import cartRouter from './router/cartRouter.js';
import paymentRouter from './router/paymentRouter.js';
import receiptRouter from './router/receiptRouter.js';
import alcoholdetailRouter from './router/alcoholdetailRouter.js';
import findAlcoholRouter from './router/findAlcoholRouter.js';
import joinRouter from './router/joinRouter.js';
import mypageRouter from './router/mypageRouter.js';
import loginRouter from './router/loginRouter.js';
import adminPageRouter from './router/adminPageRouter.js';

const server = express();
const httpServer = http.createServer(server);
const io = new Server(httpServer);
const PORT = 8000;

server.use(
  cors({
    origin: [`http://localhost:3000`, `http://localhost:3001`],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

server.use(express.json());
server.use(express.urlencoded());
server.use(cookieParser());

server.use('/home', homeRouter);
server.use('/getimg', imgRouter);
server.use('/findalcohol', findAlcoholRouter);
server.use('/alcoholdetail', alcoholdetailRouter);
server.use('/cart', cartRouter);
server.use('/payment', paymentRouter);
server.use('/receipt', receiptRouter);
server.use('/join', joinRouter);
server.use('/mypage', mypageRouter);
server.use('/login', loginRouter);
server.use('/adminpage', adminPageRouter);



{/** socket server */}

let connectedUsers = []; // 접속한 유저들
let chatRooms = {}; // 채팅방 (유저별)

io.on('connection', (socket) => {

  socket.on('connect', () => {
    console.log('user connected', socket.id);
  })

  socket.on('connectedUser', (userData) => {
    // 유저 아이디 정상적으로 넘어올 경우, 접속한 유저 데이터를 저장
    if (userData.user_id && !chatRooms[userData.user_id]) {
        connectedUsers.push({...userData, socketId : socket.id})
    }
    socket.emit('getChatRoomId', `ChatRoom-${userData.user_id}`)
  })


  socket.on('joinChatRoom', chatRoomId => {
    if (!chatRooms[chatRoomId]) {
        chatRooms[chatRoomId] = {messages : [], connectedSockets : [socket.id]}
        console.log(`${chatRoomId} has been created`);
    } else {
        chatRooms[chatRoomId].connectedSockets.push(socket.id)
    }
    socket.join(chatRoomId)
    console.log(`${socket.id} has joined ${chatRoomId}`);
    io.to(chatRoomId).emit('getPrevMessage', chatRooms[chatRoomId].messages)
    io.to(chatRoomId).emit('getConnectedSockets', chatRooms[chatRoomId].connectedSockets)
  })


  socket.on('chatMessage', (data) => {
     const chatRoomId = data.chatRoomId
     chatRooms[chatRoomId].messages.push(data.message)
     io.to(chatRoomId).emit('chatMessage', data.message)
  });


  // disconnect 시, 해당 유저의 데이터와 채팅방 데이터를 모두 삭제함
  socket.on('disconnect', () => {
    try {
    const disconnectUserId = connectedUsers.filter(user=>user.socketId===socket.id)[0]?.user_id
    const chatRoomId = `ChatRoom-${disconnectUserId}`
    const chatRoomConnects = chatRooms[chatRoomId].connectedSockets
    const disconnectIdx = chatRoomConnects.indexOf(socket.id)
    connectedUsers = connectedUsers.filter(user=>user.socketId !== socket.id) // 유저 접속 정보 삭제
    chatRoomConnects.splice(disconnectIdx, 1) // 채팅방 객체에서 방금 나간 유저의 소켓정보 삭제
    const connectedUserCount = chatRoomConnects.length;
    console.log(`[${socket.id}] has left ${chatRoomId}`)
    if (connectedUserCount===0) {
        delete chatRooms[chatRoomId]
        console.log(`${chatRoomId} has been deleted`);
    } else {
        console.log(`${connectedUserCount} user left in ${chatRoomId}`);
        io.to(chatRoomId).emit('getConnectedSockets',chatRooms[chatRoomId].connectedSockets)
    }
    } catch {
        console.log('unexpected disconnect');
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on ${PORT}...`);
});
