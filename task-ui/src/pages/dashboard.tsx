import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Task } from "../types/task";
import TaskForm from "../components/taskForm";
import { deleteTask, updateTaskStatus } from "../services/taskService";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const handleTaskCreated = (newTask: Task) => {
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
          navigate("/login");
          return;
        }
        const response = await axios.get("http://localhost:3000/api/tasks", {
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

        <TaskForm
          OntaskCreated={(newTask) => {
            handleTaskCreated(newTask);
          }}
        />
        <h2 className="text-xl font-semibold mt-8 mb-4">Your Tasks</h2>
        <ul className="space-y-3">
          {tasks.length === 0 ? (
            <li>No tasks available. Please add some tasks.</li>
          ) : (
            tasks.map((task: Task) => (
              <li
                key={task.id}
                className="p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    task.status === "completed"
                      ? "bg-green-200 text-green-800"
                      : task.status === "in progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  Status: {task.status}
                </span>
                <button
                  onClick={() => handleStatusUpdate(task)}
                  className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-200"
                >
                  Change Status
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Created at: {new Date(task.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => navigate(`/edit/${task.id}`)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit task
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))
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
