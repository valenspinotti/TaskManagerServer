import { Request, Response } from "express";
import Task from "../config/models/task.models";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getTasks = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  try {
    const userTasks = await Task.findAll({ where: { userId } });
    res.json(userTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "No userId: Unauthorized" });
    }
    if (!title) {
      res.status(400).json({ message: "Title required" });
    }
    const newTask = await Task.create({
      title,
      description,
      status: status || "pending",
      userId,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const userId = req.userId;

  try {
    const task = await Task.findOne({ where: { id, userId } });

    if (!task) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error({ message: "Update failed" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const task = await Task.findOne({ where: { id, userId } });

    if (!task) {
      res.status(400).json({ message: "Task not found" });
      return;
    }
    await task.destroy();
    res.status(200).send({ message: "Task succesfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Task could not be deleted", error });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ where: { id } });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(404).json({ message: "Task not found", error });
  }
};
