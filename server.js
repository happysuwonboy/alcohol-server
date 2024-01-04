import './env.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cartRouter from './router/cartRouter.js';
import paymentRouter from './router/paymentRouter.js';
import receiptRouter from './router/receiptRouter.js';

const server = express();
const PORT = 8000;

server.use(cors({
    origin : `http://localhost:3000`,
    credentials : true,
    methods : ['GET', 'POST', 'PUT', 'DELETE']
}))

server.use(express.json())
server.use(express.urlencoded())
server.use(cookieParser())
server.use('/cart', cartRouter);
server.use('/payment', paymentRouter);
server.use('/receipt', receiptRouter);

server.listen(PORT, ()=>{console.log(`listening on ${PORT}...`)})