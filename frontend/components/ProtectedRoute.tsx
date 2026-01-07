"use client";

import { useAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({children}:{children:any}) {
  const {token} = useAuth();
  const router = useRouter();

  useEffect(()=>{
    if(!token && !localStorage.getItem("token")){
      router.push("/");
    }
  },[token]);

  return children;
}
