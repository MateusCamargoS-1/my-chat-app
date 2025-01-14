"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateUser = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(30).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        location: joi_1.default.string().min(3).max(100).required(),
    }).strict();
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
};
exports.default = validateUser;
