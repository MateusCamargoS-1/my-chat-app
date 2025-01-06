import { Request, Response } from "express";
import UserService from "../services/userService";

import { generateToken } from '../utils/generateToken';
import { comparePassword, hashPassword } from '../utils/hashPassword';

class UserController {
  static async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password, location } = req.body;
    
    try {
      const hashedPassword = await hashPassword(password);
      const user = await UserService.createUser(name, email, location, hashedPassword);
      res.status(201).json(user);
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ message: error });
      }
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ message: error });
      }
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    try {
      const user = await UserService.getUserById(Number(userId));
      if (!user) {
        if (!res.headersSent) {
          res.status(404).json({ message: "Usuário não encontrado" });
        }
        return; 
      }

      res.status(200).json(user);
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ message: error });
      }
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        if (!res.headersSent) {
          return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }
      }

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado ou não autenticado.' });
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        if (!res.headersSent) {
          return res.status(401).json({ success: false, message: 'Senha inválida' });
        }
      }

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado ou não autenticado.' });
      }

      const token = generateToken(user.id);

      if (!res.headersSent) {
        return res.status(200).json({
          success: true,
          message: 'Login bem-sucedido',
          data: { user, token },
        });
      }
    } catch (error) {
      if (!res.headersSent) {
        return res.status(500).json({ success: false, message: 'Erro no login', details: error });
      }
    }
  }

  static async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!res.headersSent) {
        res.status(200).json(user);
      }
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ message: error });
      }
    }
  }
}

export default UserController;
