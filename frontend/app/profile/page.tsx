"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Profile(){

  const [user,setUser]=useState<any>(null);
  const [loading,setLoading]=useState(true);

  const loadUser = async()=>{
    const res = await api.get("/users/me");
    setUser(res.data);
    setLoading(false);
  };

  const save = async()=>{
    await api.put("/users/me", user);
    toast.success("Profile updated");
  };

  useEffect(()=>{ loadUser(); },[]);

  if(loading) return <p>Loading...</p>

  return(
    <ProtectedRoute>
      <Navbar/>

      <div className="p-6 max-w-3xl mx-auto">

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <h2 className="text-2xl font-bold mb-6">My Profile</h2>

          <div className="glass p-6 rounded-2xl space-y-4">

            <input
              value={user.name}
              onChange={e=>setUser({...user,name:e.target.value})}
              className="bg-gray-800/60 p-3 rounded w-full"
            />

            <input
              disabled
              value={user.email}
              className="bg-gray-800/20 p-3 rounded w-full text-gray-400"
            />

            <button
              onClick={save}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded"
            >
              Save Changes
            </button>

          </div>
        </motion.div>

      </div>
    </ProtectedRoute>
  );
}
