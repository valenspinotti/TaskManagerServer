export type TaskStatus = "pending" | "completed";

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}
