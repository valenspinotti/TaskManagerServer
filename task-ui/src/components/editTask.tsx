import React, { useEffect, useState } from "react";
import TaskForm from "./taskForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Task } from "../types/task";
import { getTaskById, updateTask } from "../services/taskService";

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const foundTask = await getTaskById(id!);
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
      updateTask(id!, updatedTask);
      alert("Task updated successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating task", error);
      alert("Failed to update task");
    }
  };

  if (!task) {
    return (
      <div className="flex-col items-center justify-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <p className="text-center mt-10">Loading task...</p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/dashboard")}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }
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
