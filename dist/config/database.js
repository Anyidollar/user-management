"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_1 = require("sequelize");
const isTest = process.env.NODE_ENV === "test";
exports.database = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: isTest ? ":memory:" : "./database.sqlite",
    logging: false,
});
