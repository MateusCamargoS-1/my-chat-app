"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = __importDefault(require("../controllers/messageController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post('/messages', authMiddleware_1.default, messageController_1.default.createMessage);
router.get('/messages/:userId/contact/:contactId', authMiddleware_1.default, messageController_1.default.getMessagesByContact);
router.get('/messages/sent/:userId', authMiddleware_1.default, messageController_1.default.getMessagesSentByUser);
router.get('/messages/received/:userId', authMiddleware_1.default, messageController_1.default.getMessagesReceivedByUser);
exports.default = router;
