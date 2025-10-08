"use client"

import api from "@/lib/api";
import { useEffect, useState } from "react";

type Room={
    _id?:string;
    name:string
};
export default function Sidebar({
    currentRoom="global",
    onSelectRoom=(r)=>console.log(r)
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
    return(
        <div className="w-75 border-r h-full p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-3">Rooms</h2>

            {/* add room */}
            <div className="flex gap-2 mb-3">
                <input className="flex-1 border p-1 rounded" placeholder="New room name" value={newRoom} onChange={(e)=>setNewRoom(e.target.value)}/>
                <button className="bg-blue-500 text-white px-3 rounded" onClick={createRoom}>Add</button>
            </div>

            {/* room list */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <p className="text-sm text-gray-500">Loading...</p>
                ): rooms.length===0 ?(
                    <p className="text-sm text-gray-500">No rooms yet</p>
                ):(
                    rooms.map((r)=>(
                        <div key={r.name} onClick={()=>onSelectRoom}
                        className={`p-2 rounded cursor-pointer mb-1 ${r.name===currentRoom ? "bg-blue-100": "hover:bg-gray-100"}`}>
                            <div className="font-medium">{r.name}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}