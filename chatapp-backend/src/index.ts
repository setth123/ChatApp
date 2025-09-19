import dotenv from 'dotenv';
import connectDB from './config/db';
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import authRouter from './routes/auth';

dotenv.config();
connectDB();

const app=express();
//socket
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"*",
    },
})
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({extended:true}));

app.use("/api/auth",authRouter);
