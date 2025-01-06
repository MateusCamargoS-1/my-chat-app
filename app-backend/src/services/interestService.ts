import InterestModel from '../models/interest';
import { Interest } from '@prisma/client';

class InterestService {
  static async createInterest(name: string, userId: number): Promise<Interest> {
    try {
      const newInterest = await InterestModel.createInterest(name, userId);
      return newInterest;
    } catch (error) {
      throw new Error('Erro ao criar interesse: ' + error);
    }
  }

  static async getInterestsByUserId(userId: number): Promise<Interest[]> {
    try {
      const interests = await InterestModel.getInterestsByUserId(userId);
      return interests;
    } catch (error) {
      throw new Error('Erro ao buscar interesses: ' + error);
    }
  }
}

export default InterestService;
