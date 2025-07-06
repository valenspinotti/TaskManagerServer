import React, { useEffect, useState } from "react";
import { Task } from "../types/task";
import { createTask } from "../services/taskService";

interface Props {
  initialTask?: Task;
  mode?: "create" | "edit";
  onSubmit?: (data: Partial<Task>) => void;
}

const TaskForm = ({ initialTask, onSubmit, mode = "create" }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "in progress" | "completed">(
    "pending"
  );
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setStatus(initialTask.status);
    }
  }, [initialTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createdAt = new Date().toISOString();
    let newTask;
    try {
      newTask = await createTask({
        title,
        description,
        status,
        createdAt,
      });
      onSubmit?.(newTask);
      if (mode === "create") {
        setTitle("");
        setDescription("");
        setStatus("pending");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // const initialTask: Task = {
  //   id: "",
  //   title: "",
  //   description: "",
  //   status: "pending",
  //   createdAt: new Date().toISOString(),
  // };

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
      <button
        type="submit"
        className={`bg-blue-500 text-white p-2 rounded${
          mode === "edit"
            ? "bg-yellow-500 hover:bg-yellow-600 "
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {mode === "create" ? "Create Task" : "Update Task"}
      </button>
    </form>
  );
};

export default TaskForm;
