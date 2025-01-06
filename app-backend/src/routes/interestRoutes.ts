import { Router } from 'express';
import InterestController from '../controllers/interestController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/interests', authMiddleware, InterestController.createInterest);

router.get('/interests/:userId', authMiddleware, InterestController.getInterestsByUserId);

export default router;
