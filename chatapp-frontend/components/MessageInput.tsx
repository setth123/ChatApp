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
            console.log()
        }
    }
}