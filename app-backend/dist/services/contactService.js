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
const contactModels_1 = __importDefault(require("../models/contactModels"));
class ContactService {
    static addContact(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId === contactId) {
                throw new Error("Você não pode adicionar a si mesmo como contato");
            }
            const existingContact = yield prismaCliente_1.default.contact.findFirst({
                where: {
                    userId,
                    contactId,
                },
            });
            if (existingContact) {
                throw new Error("Contato já existe na sua lista");
            }
            const newContact = yield prismaCliente_1.default.contact.create({
                data: {
                    userId,
                    contactId,
                },
            });
            return newContact;
        });
    }
    static removeContact(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removedContact = yield contactModels_1.default.removeContact(userId, contactId);
                return removedContact;
            }
            catch (error) {
                throw new Error('Erro ao remover contato: ' + error);
            }
        });
    }
    static getContacts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield contactModels_1.default.getContacts(userId);
                return contacts;
            }
            catch (error) {
                throw new Error('Erro ao buscar contatos: ' + error);
            }
        });
    }
}
exports.default = ContactService;
