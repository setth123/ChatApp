"use client"

import api from "@/lib/api";
import { useAuth } from "@/useAuth";
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
            <form onSubmit={handleLogin} className='bg-white p-6 rounded-xl shadow-md space-y-3 w-80'>
                <h1 className='text-xl font-bold'>Login</h1>
                <input
                    type="text" placeholder="Username" 
                    className="w-full border p-2 rounded"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}/>
                <input
                    type="password" placeholder="Password"
                    className="w-full border p-2 rounded"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    )
}