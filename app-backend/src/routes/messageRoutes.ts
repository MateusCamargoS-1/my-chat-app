import { Router } from 'express';
import MessageController from '../controllers/messageController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/messages', authMiddleware, MessageController.createMessage);

router.get('/messages/:userId/contact/:contactId', authMiddleware, MessageController.getMessagesByContact);

router.get('/messages/sent/:userId', authMiddleware, MessageController.getMessagesSentByUser);

router.get('/messages/received/:userId', authMiddleware, MessageController.getMessagesReceivedByUser);

export default router;
