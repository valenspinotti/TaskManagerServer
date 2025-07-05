import React from "react";
import { Task } from "../types/task";

interface Props {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onStatusUpdate: (task: Task) => void;
  onEdit: (taskId: string) => void;
}

export const TaskList = ({
  tasks,
  onDelete,
  onStatusUpdate,
  onEdit,
}: Props) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No tasks available. Please add some tasks.
      </div>
    );
  }
  return (
    <ul className="space-y-3">
      {tasks.map((task: Task) => (
        <li
          key={task.id}
          className="p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex justify-between items-center">
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
          </div>
          <button
            onClick={() => onStatusUpdate(task)}
            className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-200"
          >
            Change Status
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Created at: {new Date(task.createdAt).toLocaleString()}
          </p>
          <button
            onClick={() => onEdit(task.id)}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit task
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
