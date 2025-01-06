import { PrismaClient, User } from '@prisma/client';
import prisma from '../database/prismaCliente';

class UserModel {
  static async createUser(name: string, email: string, location: string, password: string): Promise<User> {
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          location,
        },
      });
      return newUser;
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error);
    }
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error('Erro ao buscar usuários: ' + error);
    }
  }

  static async getUserById(userId: number): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + error);
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      throw new Error('Erro ao buscar usuário por email: ' + error);
    }
  }
}

export default UserModel;
