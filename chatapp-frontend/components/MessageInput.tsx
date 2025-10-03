"use client"

import { useState } from "react";

interface SuggestingProps{
    suggestions: string[];
    onPick: (text:string)=>void;
}


function Suggestions({suggestions,onPick}:SuggestingProps){
    if(suggestions.length==0)return null;
    return(
        <div className="flex gap-2 mt-2 flex-wrap">
            {suggestions.map((s,i)=>(
                <button
                    key={i}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full text-sm"
                    onClick={()=>onPick(s)}>{s}
                </button>
            ))}
        </div>
    )
}


//pass a func
export default function MessageInput({onSend}:{onSend:(msg:string)=>void}){
    const [message,setMessage]=useState("")
    const [suggestions,setSuggestions]=useState<string[]>([]);
    const [loading,setLoading]=useState(false)

    async function fetchSuggestion(text:string){
        setLoading(true);
        try{
            const res=await fetch("/api/suggest",{
                method:"POST",
                body:JSON.stringify({text}),
                headers:{"Content-Type":"application/json"}
            });
            const data=await res.json();
            setSuggestions(data);
        }
        catch(err){
            alert("AI Suggestion Error: "+err);
        }
        finally{
            setLoading(false);
        }
    }
    function handleSend(){
        if(message.trim()=="")return;
        onSend(message);
        setMessage("");
        setSuggestions([]);
        fetchSuggestion(message);
    }
    return(
        <div className="border-t p-2">
            <div className="flex">
                <input className="flex-1 border p-2 rounded"
                        value={message} onChange={(e)=>setMessage(e.target.value)}
                        placeholder="Type your message..."/>
                <button onClick={handleSend} className="ml-2 bg-blue-500 text-white px-4 rounded">Send</button>
            </div>
            <Suggestions suggestions={suggestions} onPick={(text)=>setMessage(text)}/>
        </div>
    )
}