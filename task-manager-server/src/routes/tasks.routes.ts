import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers";
import { authenticateToken } from "../middlewares/auth.middleware";

const taskRoutes = Router();

taskRoutes.get("/", authenticateToken, getTasks);
taskRoutes.post("/", authenticateToken, createTask);
taskRoutes.put(`/:id`, authenticateToken, updateTask);
taskRoutes.delete("/:id", authenticateToken, deleteTask);

export { taskRoutes };
