"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY) {
    throw new Error('A chave secreta JWT (JWT_SECRET_KEY) não está definida nas variáveis de ambiente!');
}
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(403).json({
            success: false,
            message: 'Token não fornecido!',
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token inválido ou expirado!',
            details: error,
        });
    }
};
exports.default = authMiddleware;
