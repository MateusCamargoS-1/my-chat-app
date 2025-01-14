"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const protectRoutes_1 = __importDefault(require("./routes/protectRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://felas3.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
app.use('/api', userRoutes_1.default);
app.use('/api', contactRoutes_1.default);
app.use('/api', messageRoutes_1.default);
app.use('/api/protected', authMiddleware_1.default, protectRoutes_1.default);
app.get('/', (req, res) => {
    res.status(200).send('Servidor funcionando!');
});
app.use((req, res, next) => {
    const error = new Error('Rota não encontrada!');
    res.status(404).json({ message: error.message });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
exports.default = app;
