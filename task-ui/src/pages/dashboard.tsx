import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Task } from "../types/task";
import TaskForm from "../components/taskForm";
import { deleteTask, updateTaskStatus } from "../services/taskService";
import { TaskList } from "../components/taskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const handleTaskCreated = (data: Partial<Task>) => {
    const newTask: Task = {
      id: data.id ?? crypto.randomUUID(),
      title: data.title ?? "",
      description: data.description ?? "",
      status: data.status ?? "pending",
      createdAt: data.createdAt ?? new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    // alert("Task created successfully!");
    navigate("/dashboard");
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const cycleTask = (
    current: string
  ): "pending" | "in progress" | "completed" => {
    if (current === "pending") return "in progress";
    if (current === "in progress") return "completed";
    if (current === "completed") return "pending";
    return "pending"; // Default case
  };

  const handleStatusUpdate = async (task: Task) => {
    const nextStatus = cycleTask(task.status);
    const updated = await updateTaskStatus(task.id, nextStatus);
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, status: updated.status } : t
      )
    );
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return navigate("/login");
        }
        const response = await axios.get("http://localhost:3001/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [navigate]);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Task Manager Dashboard
          </h1>
        </div>

        <TaskForm // No initial task for creating a new one
          mode="create"
          onSubmit={handleTaskCreated}
        />
        <h2 className="text-xl font-semibold mt-8 mb-4">Your Tasks</h2>
        <ul className="space-y-3">
          {tasks.length === 0 ? (
            <li>No tasks available. Please add some tasks.</li>
          ) : (
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onStatusUpdate={handleStatusUpdate}
              onEdit={(taskId) => navigate(`/edit-task/${taskId}`)}
            />
          )}
        </ul>
        <br />
        <button
          onClick={() => navigate("/login")}
          className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
