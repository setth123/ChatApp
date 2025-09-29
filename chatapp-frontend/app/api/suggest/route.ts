import api from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const body=await req.json();
    const res=await api.post("/ai/suggest",body);
    return NextResponse.json(res.data);
}