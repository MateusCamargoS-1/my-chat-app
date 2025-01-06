import { Request, Response } from 'express';
import InterestService from '../services/interestService';

class InterestController {
  static async createInterest(req: Request, res: Response): Promise<void> {
    const { name, userId } = req.body;
    try {
      const interest = await InterestService.createInterest(name, userId);
      res.status(201).json(interest);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getInterestsByUserId(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    try {
      const interests = await InterestService.getInterestsByUserId(Number(userId));
      res.status(200).json(interests);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default InterestController;
