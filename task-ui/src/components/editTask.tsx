import React, { useEffect, useState } from "react";
import TaskForm from "./taskForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Task } from "../types/task";
import axios from "axios";

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const foundTask = res.data.find((t: Task) => t.id === id);
        if (!foundTask) {
          return alert("Task not found");
        }
        setTask(foundTask);
      } catch (error) {
        console.error("Task not found", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdateTask = async (updatedTask: Partial<Task>) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task updated successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating task", error);
      alert("Failed to update task");
    }
  };

  if (!task) return <p className="text-center mt-10">Cargando tarea...</p>;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
        <TaskForm initialTask={task} onSubmit={handleUpdateTask} mode="edit" />
      </div>
    </div>
  );
};

export default EditTask; // This component is a placeholder for the edit task functionality.
