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
const messageService_1 = __importDefault(require("../services/messageService"));
class MessageController {
    static createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senderId, receiverId, content } = req.body;
            try {
                const message = yield messageService_1.default.createMessage(senderId, receiverId, content);
                res.status(201).json(message);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    static getMessagesByContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, contactId } = req.params;
            try {
                const messages = yield messageService_1.default.getMessagesByContact(Number(userId), Number(contactId));
                res.status(200).json(messages);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    static getMessagesSentByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const messages = yield messageService_1.default.getMessagesSentByUser(Number(userId));
                res.status(200).json(messages);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    static getMessagesReceivedByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const messages = yield messageService_1.default.getMessagesReceivedByUser(Number(userId));
                res.status(200).json(messages);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
}
exports.default = MessageController;
