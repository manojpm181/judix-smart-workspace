"use client";

import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup(){
  const router = useRouter();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const register = async(e:any)=>{
    e.preventDefault();
    await api.post("/auth/signup",{name,email,password});
    router.push("/");
  };

  return(
    <div className="min-h-screen grid place-items-center">
      <div className="p-8 bg-gray-900 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Create Account</h2>
        <form onSubmit={register} className="space-y-3">
          <input className="w-full p-2 bg-gray-800 rounded" placeholder="Name" onChange={e=>setName(e.target.value)}/>
          <input className="w-full p-2 bg-gray-800 rounded" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
          <input className="w-full p-2 bg-gray-800 rounded" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
          <button className="w-full bg-indigo-600 p-2 rounded">Signup</button>
        </form>
      </div>
    </div>
  )
}
