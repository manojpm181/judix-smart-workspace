"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Search, PlusCircle, Trash2 } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadTasks = async () => {
    setLoading(true);
    const res = await api.get("/tasks");
    setTasks(res.data);
    setLoading(false);
  };

  const addTask = async () => {
    if (!title) return toast.error("Title required");
    await api.post("/tasks", { title, priority });
    setTitle("");
    toast.success("Task added");
    loadTasks();
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    toast.success("Task deleted");
    loadTasks();
  };

  const updateTask = async (id: string, data: any) => {
    await api.put(`/tasks/${id}`, data);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filtered = tasks
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter(t => (filter === "all" ? true : t.status === filter));

  return (
    <ProtectedRoute>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-gray-400">Manage your tasks smartly ✨</p>
        </motion.div>

        {/* Add Task */}
        <div className="glass p-4 rounded-xl flex gap-3 items-center mb-4">
          <input
            className="bg-gray-800/60 p-2 rounded w-full"
            placeholder="Task title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <select
            className="bg-gray-800/60 p-2 rounded"
            onChange={e => setPriority(e.target.value)}
          >
            <option value="normal">normal</option>
            <option value="high">high</option>
            <option value="low">low</option>
          </select>

          <button
            onClick={addTask}
            className="bg-indigo-600 px-4 py-2 rounded flex items-center gap-1"
          >
            <PlusCircle size={18} /> Add
          </button>
        </div>

        {/* Search */}
        <div className="glass p-3 rounded-xl flex items-center gap-2 mb-4">
          <Search />
          <input
            className="bg-transparent w-full outline-none"
            placeholder="Search tasks..."
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setFilter("all")} className="chip">All</button>
          <button onClick={() => setFilter("todo")} className="chip">Todo</button>
          <button onClick={() => setFilter("progress")} className="chip">In Progress</button>
          <button onClick={() => setFilter("done")} className="chip">Done</button>
        </div>

        {/* Tasks */}
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400">No tasks found</p>
        ) : (
          <div className="space-y-3">
            {filtered.map(t => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-4 rounded-xl flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{t.title}</p>

                  <div className="flex gap-3 items-center mt-1">
                    <span className={`text-xs ${
                      t.priority === "high" ? "text-red-400" :
                      t.priority === "low" ? "text-green-400" :
                      "text-blue-400"
                    }`}>
                      {t.priority}
                    </span>

                    <select
                      className="bg-gray-800/60 p-1 rounded text-xs"
                      value={t.status}
                      onChange={e =>
                        updateTask(t._id, { status: e.target.value })
                      }
                    >
                      <option value="todo">Todo</option>
                      <option value="progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>

                <Trash2
                  className="text-red-400 cursor-pointer"
                  onClick={() => deleteTask(t._id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
