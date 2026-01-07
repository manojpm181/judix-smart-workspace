"use client";

import { useAuth } from "@/store/authStore";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar(){
  const {logout} = useAuth();
  const router = useRouter();

  return(
    <nav className="backdrop-blur bg-gray-900/30 border-b border-white/10 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
        Judix Smart Workspace
      </h1>

      <div className="flex gap-4 items-center">
        <User className="cursor-pointer" onClick={()=>router.push('/profile')} />
        <LogOut className="cursor-pointer text-red-400" onClick={logout}/>
      </div>
    </nav>
  );
}
