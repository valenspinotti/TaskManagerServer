import React from "react";
import { Task } from "../types/task";

interface Props {
  tasks: Task[];
}

export const TaskList = ({ tasks }: Props) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No tasks available. Please add some tasks.
      </div>
    );
  }
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <h3 className="font-bold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-xs text-gray-400 mt-2">Status: {task.status}</p>
        </li>
      ))}
    </ul>
  );
};
