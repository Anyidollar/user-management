import { Sequelize } from "sequelize";

export const database = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});
