"use client"

import api from "@/lib/api";
import { useEffect, useState } from "react";

type Room={
    _id?:string;
    name:string
};
export default function Sidebar({
    currentRoom,
    onSelectRoom
}:{
    currentRoom:string,
    onSelectRoom:(r:string)=>void
}){
    const [rooms,setRooms]=useState<Room[]>([]);
    const [newRoom,setNewRoom]=useState("");
    const [loading,setLoading]=useState(false);

    async function loadRooms(){
        setLoading(true);
        try{
            const res=await api.get("/rooms");
            setRooms(res.data.rooms || []);
        }
        catch(err){
            alert("Load rooms error: "+err);
        }
        finally{setLoading(false)}
    }
    useEffect(()=>{
        loadRooms();
    },[])
    async function createRoom(){
        const name=newRoom.trim();
        if(name=="")return;
        try{
            const res=await api.post("/rooms",{name});
            setRooms((prev)=>[...prev,res.data.room]);
            setNewRoom("");
        }
        catch(err){
            alert("Create room error: "+err);
        }
    }
}