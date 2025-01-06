import UserModel from '../models/user';
import { User } from '@prisma/client';

class UserService {
  static async createUser(name: string, email: string, location: string, hashedPassword: string): Promise<User> {
    try {
      const newUser = await UserModel.createUser(name, email, location, hashedPassword);
      return newUser;
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error);
    }
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      const users = await UserModel.getAllUsers();
      return users;
    } catch (error) {
      throw new Error('Erro ao buscar usuários: ' + error);
    }
  }

  static async getUserById(userId: number): Promise<User | null> {
    try {
      const user = await UserModel.getUserById(userId);
      return user;
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + error);
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await UserModel.getUserByEmail(email);
      return user;
    } catch (error) {
      throw new Error('Erro ao buscar usuário por email: ' + error);
    }
  }
}

export default UserService;
