import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { taskRoutes } from "./routes/tasks.routes";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
