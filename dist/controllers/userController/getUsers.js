"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const User_1 = __importDefault(require("../../models/User"));
const getUsers = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { pageNumber, pageSize } = request.query;
        const page = parseInt(pageNumber) || 0;
        const size = parseInt(pageSize) || 10;
        if (page < 0 || size <= 0) {
            response.status(400).json({
                error: true,
                message: "Invalid pagination parameters. pageNumber must be >= 0, pageSize must be > 0.",
            });
            return;
        }
        const { count, rows: users } = yield User_1.default.findAndCountAll({
            offset: page * size,
            limit: size,
            order: [["createdAt", "DESC"]],
        });
        response.status(200).json({
            error: false,
            message: "Users retrieved successfully",
            totalUsers: count,
            currentPage: page,
            pageSize: size,
            totalPages: Math.ceil(count / size),
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
