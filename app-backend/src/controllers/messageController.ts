import { Request, Response } from 'express';
import MessageService from '../services/messageService';

class MessageController {
  static async createMessage(req: Request, res: Response): Promise<void> {
    const { senderId, receiverId, content } = req.body;
    try {
      const message = await MessageService.createMessage(senderId, receiverId, content);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getMessagesByContact(req: Request, res: Response): Promise<void> {
    const { userId, contactId } = req.params;

    try {
      const messages = await MessageService.getMessagesByContact(Number(userId), Number(contactId));
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getMessagesSentByUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    try {
      const messages = await MessageService.getMessagesSentByUser(Number(userId));
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getMessagesReceivedByUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    try {
      const messages = await MessageService.getMessagesReceivedByUser(Number(userId));
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default MessageController;
