"use client"

interface SuggestingProps{
    suggestions: string[];
    onPick: (text:string)=>void;
}

function Suggestions({suggestions,onPick}:SuggestingProps){
    if(suggestions.length==0)return null;
    return(
        <div className="flex gap-2">

        </div>
    )
}