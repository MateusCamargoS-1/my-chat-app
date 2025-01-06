import { Router } from 'express';
import UserController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import validateUser from '../middleware/validationMiddleware';

const router = Router();

router.post('/users', validateUser, UserController.createUser);

router.get('/users', authMiddleware, UserController.getAllUsers);

router.get('/users/:userId', authMiddleware, UserController.getUserById);

export default router;
