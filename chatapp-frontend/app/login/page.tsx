"use client"

import api from "@/lib/api";
import { useAuth } from "@/store/useAuth";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react"

export default function LoginPage(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const setToken=useAuth((s)=>s.token ? s.setToken : s.setToken);
    const router=useRouter();

    async function handleLogin(e:React.FormEvent){
        e.preventDefault();
        try{
            const res=await api.post("/auth/login",{username,password});
            setToken(res.data.token);
            router.push("/");
        }
        catch(err){
            alert("Login failed");
        }
    }
    return(
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form>

            </form>
        </div>
    )
}