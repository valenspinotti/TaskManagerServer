import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { taskRoutes } from "./routes/tasks.routes";
import sequelize from "./config/db";
import "./config/models/user.model";
import "./config/models/task.models";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((error) => {
    console.error("No se pudo conectar a la base de datos:", error);
  });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
