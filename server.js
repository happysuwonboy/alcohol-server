import './env.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import homeRouter from './router/homeRouter.js';
import imgRouter from './router/imgRouter.js';
import cartRouter from './router/cartRouter.js';
import paymentRouter from './router/paymentRouter.js';
import receiptRouter from './router/receiptRouter.js';
import alcoholdetailRouter from './router/alcoholdetailRouter.js';
import findAlcoholRouter from './router/findAlcoholRouter.js';


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

server.use('/', homeRouter);
server.use('/getimg', imgRouter)
server.use('/findalcohol', findAlcoholRouter);
server.use('/alcoholdetail', alcoholdetailRouter)
server.use('/cart', cartRouter);
server.use('/payment', paymentRouter);
server.use('/receipt', receiptRouter);


server.listen(PORT, ()=>{console.log(`listening on ${PORT}...`)})