"use client";

import { api } from "@/utils/api";
import { useAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Login() {
  const { setAuth } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      setAuth(res.data.user, res.data.token);
      localStorage.setItem("token", res.data.token);

      router.push("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl bg-gray-900 shadow-xl w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Judix Smart Workspace
        </h1>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            className="w-full p-2 rounded bg-gray-800 outline-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-2 rounded bg-gray-800 outline-none"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 p-2 rounded transition">
            Login
          </button>
        </form>

        <p className="text-sm mt-3 text-center">
          No account?{" "}
          <a href="/signup" className="text-indigo-400 hover:underline">
            Signup
          </a>
        </p>
      </motion.div>
    </div>
  );
}
