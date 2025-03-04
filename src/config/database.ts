import { Sequelize } from "sequelize";

const isTest = process.env.NODE_ENV === "test";

export const database = new Sequelize({
  dialect: "sqlite",
  storage: isTest ? ":memory:" : "./database.sqlite",
  logging: false,
});
