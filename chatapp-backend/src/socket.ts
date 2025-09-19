import {Server} from "socket.io";

export default function initSocket(io: Server) {
    io.on("connection", (socket) => {
        console.log("User connected",socket.id);

        socket.on("join_room",(room)=>{
            socket.join(room);
            console.log(`User join room: ${room}`);
        });
        socket.on("send_message",(data)=>{
            const {sender,content,room}=data;
            //handle message
        });
        socket.on("disconnect",()=>{
            console.log("User disconnected",socket.id);
        });
    });
}