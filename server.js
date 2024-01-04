import './env.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import homeRouter from './router/homeRouter.js';

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


server.listen(PORT, ()=>{console.log(`listening on ${PORT}...`)})