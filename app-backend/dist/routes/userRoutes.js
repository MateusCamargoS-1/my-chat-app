"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const validationMiddleware_1 = __importDefault(require("../middleware/validationMiddleware"));
const router = (0, express_1.Router)();
router.post('/signup', validationMiddleware_1.default, userController_1.default.createUser);
router.post('/login', userController_1.default.login);
router.get('/users', authMiddleware_1.default, userController_1.default.getAllUsers);
router.get('/users/:userEmail', authMiddleware_1.default, userController_1.default.getUserByEmail);
exports.default = router;
