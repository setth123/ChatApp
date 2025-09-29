"use client";

import socket from "@/lib/socket";
import { useEffect, useState } from "react";

export default function Home() {
  const [room]=useState("global");
  const [message,setMessage]=useState("");
  const [messages,setMessages]=useState<{sender:string;content:string}[]>([]);

  useEffect(()=>{
    socket.emit("join_room",room);
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("receive_message");
    };

  },[room])
  function sendMessage() {
    if (message.trim() === "") return;
    socket.emit("send_message", { sender: "Me", content: message, room });
    setMessages((prev) => [...prev, { sender: "Me", content: message }]);
    setMessage("");
  }
  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto">
      <div className="flex-1 overflow-y-auto border p-3 space-y-2 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className="p-2 rounded-bg-white shadow">
            <b>{m.sender}: </b>{m.content}
          </div>
        ))}
      </div>
      <div className="flex p-2 border-t">
        <input className="flex-1 border p-2 rounded" value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder="Type message..."/>
        <button className="ml-2 bg-blue-500 text-white px-4 rounded" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
