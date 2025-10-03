import api from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const text=await req.json();
    const body=[`Can you explain more about "${text}"?`,
    "That’s interesting, tell me more!",
    "I see, how do you feel about that?",]
    const res=await api.post("/ai/suggest",body);
    return NextResponse.json(res.data);
}