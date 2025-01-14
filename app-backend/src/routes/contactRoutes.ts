import { Router } from 'express';
import ContactController from '../controllers/contactController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/contacts', authMiddleware, ContactController.addContact);

router.delete('/contacts/:contactId', authMiddleware, ContactController.removeContact);

router.get('/contacts', authMiddleware, ContactController.getContacts);

export default router;
