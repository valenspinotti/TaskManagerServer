import { Request, Response } from "express";
import { tasks } from "../data/tasks";
import { Task } from "../models/task.models";
import { v4 as uuidv4 } from "uuid";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getTasks = (req: AuthRequest, res: Response) => {
  const userTasks = tasks.filter((t) => t.userId === req.userId);
  res.json(userTasks);
};

export const createTask = (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  if (!title) {
    res.status(400).json({ message: "Se requiere un título" });
    return;
  }

  const newTask: Task = {
    id: uuidv4(),
    userId: req.userId!,
    title,
    description: description || "",
    status: req.body.status || "pending",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = tasks.find((t) => t.id === id && t.userId === req.userId);

  if (!task) {
    res.status(404).json({ message: "Tarea no encontrada" });
    return;
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.status = status ?? task.status;

  res.json(task);
};

export const deleteTask = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === id && t.userId === req.userId);

  if (index === -1) {
    res.status(404).json({ message: "Tarea no encontrada" });
    return;
  }

  tasks.splice(index, 1);
  res.status(204).send({ message: "Tarea borrada con éxito" });
};
