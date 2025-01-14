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
const prismaCliente_1 = __importDefault(require("../database/prismaCliente"));
class MessageModel {
    static createMessage(senderId, receiverId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = yield prismaCliente_1.default.message.create({
                    data: {
                        senderId,
                        receiverId,
                        content,
                    },
                });
                return newMessage;
            }
            catch (error) {
                console.error('Erro ao criar mensagem:', error);
                throw new Error('Erro ao criar mensagem');
            }
        });
    }
    static getMessagesByContact(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield prismaCliente_1.default.message.findMany({
                    where: {
                        OR: [
                            { senderId: userId, receiverId: contactId },
                            { senderId: contactId, receiverId: userId },
                        ],
                    },
                });
                return messages;
            }
            catch (error) {
                console.error('Erro ao buscar mensagens do contato:', error);
                throw new Error('Erro ao buscar mensagens do contato');
            }
        });
    }
    static getMessagesSentByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield prismaCliente_1.default.message.findMany({
                    where: {
                        senderId: userId,
                    },
                });
                return messages;
            }
            catch (error) {
                console.error('Erro ao buscar mensagens enviadas:', error);
                throw new Error('Erro ao buscar mensagens enviadas');
            }
        });
    }
    static getMessagesReceivedByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield prismaCliente_1.default.message.findMany({
                    where: {
                        receiverId: userId,
                    },
                });
                return messages;
            }
            catch (error) {
                console.error('Erro ao buscar mensagens recebidas:', error);
                throw new Error('Erro ao buscar mensagens recebidas');
            }
        });
    }
}
exports.default = MessageModel;
