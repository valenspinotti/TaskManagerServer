import axios from "axios";
import { Task } from "../types/task";

const API_URL = "http://localhost:3001/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTask = async (taskData: {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
}): Promise<Task> => {
  const token = localStorage.getItem("token");
  const res = await axios.post(API_URL, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
