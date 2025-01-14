import MessageModel from '../models/message';
import { Message } from '@prisma/client';

class MessageService {
  static async createMessage(senderId: number, receiverId: number, content: string): Promise<Message> {
    try {
      const newMessage = await MessageModel.createMessage(senderId, receiverId, content);
      return newMessage;
    } catch (error) {
      throw new Error('Erro ao criar mensagem: ' + error);
    }
  }

  static async getMessagesByContact(userId: number, contactId: number): Promise<Message[]> {
    try {
      const messages = await MessageModel.getMessagesByContact(userId, contactId);
      return messages;
    } catch (error) {
      throw new Error('Erro ao buscar mensagens do contato: ' + error);
    }
  }

  static async getMessagesSentByUser(userId: number): Promise<Message[]> {
    try {
      const messages = await MessageModel.getMessagesSentByUser(userId);
      return messages;
    } catch (error) {
      throw new Error('Erro ao buscar mensagens enviadas: ' + error);
    }
  }

  static async getMessagesReceivedByUser(userId: number): Promise<Message[]> {
    try {
      const messages = await MessageModel.getMessagesReceivedByUser(userId);
      return messages;
    } catch (error) {
      throw new Error('Erro ao buscar mensagens recebidas: ' + error);
    }
  }
}

export default MessageService;
