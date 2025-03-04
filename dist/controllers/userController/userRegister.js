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
exports.userRegister = void 0;
const User_1 = __importDefault(require("../../models/User"));
const uuid_1 = require("uuid");
const password_1 = require("../../services/password");
const userRegister = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lastName, firstName, email, password } = request.body;
        //Validate request body
        if (!lastName || !firstName || !email || !password) {
            response.status(400).json({
                error: true,
                message: "All fields (lastName, firstName, email, password) are required.",
            });
            return;
        }
        const existingEmail = yield User_1.default.findOne({ where: { email } });
        if (existingEmail) {
            response.status(409).json({
                error: true,
                message: `User with email ${email} already exists.`,
            });
            return;
        }
        const id = (0, uuid_1.v4)();
        const hashedPassword = yield (0, password_1.hashPassword)(password);
        // Create new user
        const newUser = yield User_1.default.create({
            id,
            email,
            firstName,
            lastName,
            password: hashedPassword,
        });
        response.status(201).json({
            message: "User registration successful",
            error: false,
            data: newUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userRegister = userRegister;
