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
const user_1 = __importDefault(require("../models/user"));
class UserService {
    static createUser(name, email, location, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_1.default.createUser(name, email, location, hashedPassword);
                return newUser;
            }
            catch (error) {
                throw new Error('Erro ao criar usuário: ' + error);
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.getAllUsers();
                return users;
            }
            catch (error) {
                throw new Error('Erro ao buscar usuários: ' + error);
            }
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.getUserById(userId);
                return user;
            }
            catch (error) {
                throw new Error('Erro ao buscar usuário: ' + error);
            }
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.getUserByEmail(email);
                return user;
            }
            catch (error) {
                throw new Error('Erro ao buscar usuário por email: ' + error);
            }
        });
    }
}
exports.default = UserService;
