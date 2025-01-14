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
const userService_1 = __importDefault(require("../services/userService"));
const generateToken_1 = require("../utils/generateToken");
const hashPassword_1 = require("../utils/hashPassword");
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, location } = req.body;
            try {
                const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
                const user = yield userService_1.default.createUser(name, email, location, hashedPassword);
                res.status(201).json(user);
            }
            catch (error) {
                if (!res.headersSent) {
                    res.status(500).json({ message: error });
                }
            }
        });
    }
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.default.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                if (!res.headersSent) {
                    res.status(500).json({ message: error });
                }
            }
        });
    }
    static getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userEmail } = req.params;
            try {
                const user = yield userService_1.default.getUserByEmail(userEmail);
                if (!user) {
                    if (!res.headersSent) {
                        res.status(404).json({ message: "Usuário não encontrado" });
                    }
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                if (!res.headersSent) {
                    res.status(500).json({ message: error });
                }
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield userService_1.default.getUserByEmail(email);
                if (!user) {
                    if (!res.headersSent) {
                        res.status(404).json({ success: false, message: 'Usuário não encontrado' });
                    }
                }
                if (!user) {
                    res.status(404).json({ message: 'Usuário não encontrado ou não autenticado.' });
                    return;
                }
                const isPasswordValid = yield (0, hashPassword_1.comparePassword)(password, user.password);
                if (!isPasswordValid) {
                    if (!res.headersSent) {
                        res.status(401).json({ success: false, message: 'Senha inválida' });
                    }
                }
                if (!user) {
                    res.status(404).json({ message: 'Usuário não encontrado ou não autenticado.' });
                }
                const token = (0, generateToken_1.generateToken)(user.id);
                if (!res.headersSent) {
                    res.status(200).json({
                        success: true,
                        message: 'Login bem-sucedido',
                        data: { user, token },
                    });
                }
            }
            catch (error) {
                if (!res.headersSent) {
                    res.status(500).json({ success: false, message: 'Erro no login', details: error });
                }
            }
        });
    }
    static getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!res.headersSent) {
                    res.status(200).json(user);
                }
            }
            catch (error) {
                if (!res.headersSent) {
                    res.status(500).json({ message: error });
                }
            }
        });
    }
}
exports.default = UserController;
