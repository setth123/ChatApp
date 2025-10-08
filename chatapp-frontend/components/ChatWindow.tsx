"use client";

import api from "@/lib/api";
import socket from "@/lib/socket";
import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";

type Message={
    _id?:string;
    sender:string;
    content:string;
    room:string;
    createAt?:string;
}

export default function ChatWindow({room}:{room:string}) {
    const [messages,setMessages]=useState<Message[]>([]);
    const [loading,setLoading]=useState(false);
    const [user,setUsers]=useState<string[]>([]);
    const bottomRef=useRef<HTMLDivElement|null>(null);

    //get username from local storage
    const username=typeof window!=="undefined"?localStorage.getItem("username")||"Anonymous":"Anonymous";

    useEffect(()=>{
        if(!room) return;
        let mounted=true;
        async function loadHistory() {
            setLoading(true);
            try{
                const res=await api.get(`/messages/${room}`);
                if(!mounted)return;
                setMessages(res.data.messages||[]);
            }
            catch(err){ alert("Load messages failed");}
            finally {if(mounted)setLoading(false);}
        }
        loadHistory();
        
        //join room
        socket.emit("join_room",room);

        //listener
        function onReceive(msg:Message){
            if(msg.room===room)setMessages(prev=>[...prev,msg]);
        }
        function onRoomUsers(list:string[]){
            setUsers(list);
        }
        socket.on("receive_message",onReceive);
        socket.on("room_users",onRoomUsers);
        return()=>{
            mounted=false;
            socket.emit("leave_room",{room,username});
            socket.off("receive_message",onReceive);
            socket.off("room_users",onRoomUsers);
        }
    },[room,username])
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages])
    async function handleSend(msg:string){
        if(msg.trim()==="")return;
        const payload: Message={
            sender:username,
            content:msg,
            room,
        }
        socket.emit("send_message",payload);
        setMessages((prev)=>[...prev,{...payload,createAt:new Date().toISOString()}]);
    }
    return(
        <div className="flex-1 flex flex-col h-full ">
            <div className="border-b p-3 flex itmes-center justify-between">
                <div>
                    <h3 className="font-semibold">{room||"Select a room"}</h3>
                    <p className="text-sm text-gray-500">{user.length} online</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                {loading?(
                    <p className="text-sm text-gray-500">Loading...</p>
                ):messages.length===0?(
                    <p className="text-sm text-gray-500">No messages</p>
                ):(
                    messages.map((m,i)=>(
                        <div key={m._id??i} className={`p-2 rounded ${m.sender===username ? "bg-blue-100 self-end":"bg-white"}`}>
                            <div className="text-xs text-gray-500">{m.sender}</div>
                            <div className="mt-1 text-gray-600">{m.content} </div>
                            <div className="text-xs text-gray-400 mt-1">{m.createAt ? new Date(m.createAt).toLocaleDateString():""}</div>
                        </div>
                    ))
                )}
                <div ref={bottomRef}/>
            </div>
            <MessageInput onSend={handleSend}/>
        </div>
    )
}