import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Task } from "../types/task";
import TaskForm from "../components/taskForm";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    // alert("Task created successfully!");
    navigate("/dashboard");
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
    <div className="dashboard p-6 max-w-3xl mx-auto">
      <h1>Task Manager Dashboard</h1>

      <TaskForm
        OntaskCreated={(newTask) => {
          handleTaskCreated(newTask);
        }}
      />
      <h2>Your Tasks</h2>
      <ul>
        {tasks.length === 0 ? (
          <li>No tasks available. Please add some tasks.</li>
        ) : (
          tasks.map((task: Task) => (
            <li key={task.id} className="p-4 border rounded-lg mb-4">
              <h3 className="font-bold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                Status: {task.status}
              </p>
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
  );
}
