// import React from "react";
// import { Task } from "../types/task";
// import { Navigate, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// interface Props {
//   tasks: Task[];
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
// }

export const TaskList = () => {
  //   const [tasks, setTasks] = useState<Task[]>([]);
  //   let navigate = useNavigate();
  //   <div className="bg-gray-100 min-h-screen py-8 px-4">
  //     <h2 className="text-xl font-semibold mt-8 mb-4">Your Tasks</h2>
  //     <ul className="space-y-3">
  //       {tasks.length === 0 ? (
  //         <li>No tasks available. Please add some tasks.</li>
  //       ) : (
  //         tasks.map((task: Task) => (
  //           <li
  //             key={task.id}
  //             className="p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors"
  //           >
  //             <h3 className="font-semibold">{task.title}</h3>
  //             <p className="text-sm text-gray-600">{task.description}</p>
  //             <span
  //               className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
  //                 task.status === "completed"
  //                   ? "bg-green-200 text-green-800"
  //                   : task.status === "in-progress"
  //                   ? "bg-yellow-200 text-yellow-800"
  //                   : "bg-gray-200 text-gray-800"
  //               }`}
  //             >
  //               Status: {task.status}
  //             </span>
  //             <p className="text-sm text-gray-500 mt-2">
  //               Created at: {new Date(task.createdAt).toLocaleString()}
  //             </p>
  //             <button
  //               onClick={() => navigate(`/edit/${task.id}`)}
  //               className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
  //             >
  //               Edit
  //             </button>
  //             <button
  //               onClick={async () => {
  //                 try {
  //                   const token = localStorage.getItem("token");
  //                   if (!token) {
  //                     navigate("/login");
  //                     return;
  //                   }
  //                   await axios.delete(
  //                     `http://localhost:3000/api/tasks/${task.id}`,
  //                     {
  //                       headers: { Authorization: `Bearer ${token}` },
  //                     }
  //                   );
  //                   setTasks((prevTasks) =>
  //                     prevTasks.filter((t) => t.id !== task.id)
  //                   );
  //                 } catch (error) {
  //                   console.error("Error deleting task:", error);
  //                 }
  //               }}
  //               className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
  //             >
  //               Delete
  //             </button>
  //           </li>
  //         ))
  //       )}
  //     </ul>
  //   </div>;
};

// if (!tasks || tasks.length === 0) {
//   if (!tasks || tasks.length === 0) {
//     return (
//       <div className="text-center text-gray-500">
//         No tasks available. Please add some tasks.
//       </div>
//     );
//   }
//   return (
//     <ul className="space-y-4">
//       {tasks.map((task) => (
//         <li
//           key={task.id}
//           className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer"
//         >
//           <h3 className="font-bold">{task.title}</h3>
//           <p className="text-sm text-gray-600">{task.description}</p>
//           <p className="text-xs text-gray-400 mt-2">Status: {task.status}</p>
//         </li>
//       ))}
//     </ul>
//   );
// };
