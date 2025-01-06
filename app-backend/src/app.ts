import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import authMiddleware from './middleware/authMiddleware';
import protectedRoutes from './routes/protectRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/protected', authMiddleware, protectedRoutes);

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

export default app;
