import { PrismaClient, Interest } from '@prisma/client';
import prisma from '../database/prismaCliente';

class InterestModel {
  static async createInterest(name: string, userId: number): Promise<Interest> {
    try {
      const newInterest = await prisma.interest.create({
        data: {
          name,
          userId,
        },
      });
      return newInterest;
    } catch (error) {
      console.error('Erro ao criar interesse:', error);
      throw new Error('Erro ao criar interesse');
    }
  }

  static async getInterestsByUserId(userId: number): Promise<Interest[]> {
    try {
      const interests = await prisma.interest.findMany({
        where: {
          userId,
        },
      });
      return interests;
    } catch (error) {
      console.error('Erro ao buscar interesses:', error);
      throw new Error('Erro ao buscar interesses');
    }
  }
}

export default InterestModel;
