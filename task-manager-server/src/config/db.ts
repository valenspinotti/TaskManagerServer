import { Sequelize } from "sequelize";

const sequelize = new Sequelize("task_manager", "root", "120994vs41", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default sequelize;
