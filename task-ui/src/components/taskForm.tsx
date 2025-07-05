import React, { useState } from "react";
import { Task } from "../types/task";
import { createTask } from "../services/taskService";

interface Props {
  OntaskCreated: (task: Task) => void;
}

const TaskForm = ({ OntaskCreated }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "in progress" | "completed">(
    "pending"
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdAt = new Date().toISOString();
      const newTask = await createTask({
        title,
        description,
        status,
        createdAt,
      });
      OntaskCreated(newTask);
      setTitle("");
      setDescription("");
      setStatus("pending");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
        required
      />
      <br />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />
      <br />
      <label className="block mb-2">Status:</label>
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as "pending" | "in progress" | "completed")
        }
        className="border p-2 rounded mb-2 w-full"
      >
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>

        <option value="completed">Completed</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
