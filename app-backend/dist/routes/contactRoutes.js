"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = __importDefault(require("../controllers/contactController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post('/contacts', authMiddleware_1.default, contactController_1.default.addContact);
router.delete('/contacts/:contactId', authMiddleware_1.default, contactController_1.default.removeContact);
router.get('/contacts', authMiddleware_1.default, contactController_1.default.getContacts);
exports.default = router;
