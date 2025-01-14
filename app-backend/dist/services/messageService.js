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
const message_1 = __importDefault(require("../models/message"));
class MessageService {
    static createMessage(senderId, receiverId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = yield message_1.default.createMessage(senderId, receiverId, content);
                return newMessage;
            }
            catch (error) {
                throw new Error('Erro ao criar mensagem: ' + error);
            }
        });
    }
    static getMessagesByContact(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield message_1.default.getMessagesByContact(userId, contactId);
                return messages;
            }
            catch (error) {
                throw new Error('Erro ao buscar mensagens do contato: ' + error);
            }
        });
    }
    static getMessagesSentByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield message_1.default.getMessagesSentByUser(userId);
                return messages;
            }
            catch (error) {
                throw new Error('Erro ao buscar mensagens enviadas: ' + error);
            }
        });
    }
    static getMessagesReceivedByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield message_1.default.getMessagesReceivedByUser(userId);
                return messages;
            }
            catch (error) {
                throw new Error('Erro ao buscar mensagens recebidas: ' + error);
            }
        });
    }
}
exports.default = MessageService;
