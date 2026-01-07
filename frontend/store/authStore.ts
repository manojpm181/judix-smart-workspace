import { create } from "zustand";

interface AuthState {
  user:any;
  token:string | null;
  setAuth:(u:any,t:string)=>void;
  logout:()=>void;
}

export const useAuth = create<AuthState>((set)=>({
  user:null,
  token:null,
  setAuth:(user,token)=>set({user,token}),
  logout:()=>{
    localStorage.removeItem("token");
    set({user:null,token:null});
  }
}));
