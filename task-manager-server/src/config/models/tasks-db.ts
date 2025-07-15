// import { DataTypes, Model, Optional } from "sequelize";
// import sequelize from "../db";

// interface TaskAttributes {
//   id: string;
//   userId?: string;
//   title: string;
//   description?: string;
//   status: "pending" | "in progress" | "completed";
//   createdAt: Date;
// }

// interface TaskCreationAttributes
//   extends Optional<TaskAttributes, "id" | "createdAt"> {}

// class Task
//   extends Model<TaskAttributes, TaskCreationAttributes>
//   implements TaskAttributes
// {
//   public id!: string;
//   public userId?: string;
//   public title!: string;
//   public description?: string;
//   public status!: "pending" | "in progress" | "completed";
//   public createdAt!: Date;
// }

// Task.init(
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//       allowNull: false,
//     },
//     userId: {
//       type: DataTypes.STRING,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.ENUM("pending", "in progress", "completed"),
//       allowNull: false,
//       defaultValue: "pending",
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     sequelize,
//     modelName: "Task",
//     tableName: "tasks",
//     timestamps: false,
//   }
// );
