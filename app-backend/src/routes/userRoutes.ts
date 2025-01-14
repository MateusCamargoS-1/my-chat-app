import { Router } from 'express';
import UserController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import validateUser from '../middleware/validationMiddleware';

const router = Router();

router.post('/signup', validateUser, UserController.createUser);

router.post('/login', UserController.login);

router.get('/users', authMiddleware, UserController.getAllUsers);

router.get('/users/:userEmail', authMiddleware, UserController.getUserByEmail);

export default router;
