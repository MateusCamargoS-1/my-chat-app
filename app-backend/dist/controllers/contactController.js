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
const contactService_1 = __importDefault(require("../services/contactService"));
const userService_1 = __importDefault(require("../services/userService"));
class ContactController {
    static addContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            const { contactEmail } = req.body;
            if (!userId) {
                res.status(400).json({ message: "Usuário não autenticado" });
                return;
            }
            if (!contactEmail) {
                res.status(400).json({ message: "E-mail do contato não fornecido" });
                return;
            }
            try {
                const contactUser = yield userService_1.default.getUserByEmail(contactEmail);
                if (!contactUser) {
                    res.status(404).json({ message: "Usuário não encontrado com esse e-mail" });
                    return;
                }
                const contactId = contactUser.id;
                const newContact = yield contactService_1.default.addContact(userId, contactId);
                res.status(201).json(newContact);
            }
            catch (error) {
                console.error("Erro ao adicionar contato:", error);
                res.status(500).json({ message: "Erro interno do servidor" });
            }
        });
    }
    static removeContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const contactId = Number(req.params.contactId);
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            if (!userId) {
                res.status(400).json({ message: 'Usuário não autenticado' });
                return;
            }
            try {
                const removedContact = yield contactService_1.default.removeContact(userId, contactId);
                res.status(200).json(removedContact);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    static getContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            if (!userId) {
                res.status(400).json({ message: 'Usuário não autenticado' });
                return;
            }
            try {
                const contacts = yield contactService_1.default.getContacts(userId);
                res.status(200).json(contacts);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
}
exports.default = ContactController;
