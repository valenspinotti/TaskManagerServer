import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from "../controllers/task.controllers";
import { authenticateToken } from "../middlewares/auth.middleware";

const taskRoutes = Router();

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

taskRoutes.get("/", authenticateToken, asyncHandler(getTasks));
taskRoutes.post("/", authenticateToken, asyncHandler(createTask));
taskRoutes.put(`/:id`, authenticateToken, asyncHandler(updateTask));
taskRoutes.delete("/:id", authenticateToken, asyncHandler(deleteTask));
taskRoutes.get("/:id", authenticateToken, asyncHandler(getTaskById));

export { taskRoutes };
