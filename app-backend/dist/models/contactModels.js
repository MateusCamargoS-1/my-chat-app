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
class ContactModel {
    static addContact(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContact = yield prismaCliente_1.default.contact.create({
                    data: {
                        userId,
                        contactId,
                    },
                });
                return newContact;
            }
            catch (error) {
                console.error('Erro ao adicionar contato:', error);
                throw new Error('Erro ao adicionar contato');
            }
        });
    }
    static removeContact(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removedContact = yield prismaCliente_1.default.contact.delete({
                    where: {
                        userId_contactId: {
                            userId,
                            contactId,
                        },
                    },
                });
                return removedContact;
            }
            catch (error) {
                console.error('Erro ao remover contato:', error);
                throw new Error('Erro ao remover contato');
            }
        });
    }
    static getContacts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield prismaCliente_1.default.contact.findMany({
                    where: {
                        userId,
                    },
                    include: {
                        contact: true,
                    },
                });
                return contacts;
            }
            catch (error) {
                console.error('Erro ao buscar contatos:', error);
                throw new Error('Erro ao buscar contatos');
            }
        });
    }
}
exports.default = ContactModel;
