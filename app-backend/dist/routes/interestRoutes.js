"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interestController_1 = __importDefault(require("../controllers/interestController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post('/interests', authMiddleware_1.default, interestController_1.default.createInterest);
router.get('/interests/:userId', authMiddleware_1.default, interestController_1.default.getInterestsByUserId);
exports.default = router;
