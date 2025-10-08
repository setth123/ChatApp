"use client";

import ChatWindow from "@/components/ChatWindow";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Home() {
  const[room,setRoom]=useState<string>("General");
  return (
    <div className="h-screen flex">
        <Sidebar currentRoom="{room}" onSelectRoom={(r)=>setRoom(r)}/>
        <div className="flex-1 flex flex-col">
          <ChatWindow room={room}/>
        </div>
    </div>
  );
}
