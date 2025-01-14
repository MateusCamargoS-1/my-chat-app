import { PrismaClient, Message } from '@prisma/client';
import prisma from '../database/prismaCliente';

class MessageModel {
  static async createMessage(senderId: number, receiverId: number, content: string): Promise<Message> {
    try {
      const newMessage = await prisma.message.create({
        data: {
          senderId,
          receiverId,
          content,
        },
      });
      return newMessage;
    } catch (error) {
      console.error('Erro ao criar mensagem:', error);
      throw new Error('Erro ao criar mensagem');
    }
  }

  static async getMessagesByContact(userId: number, contactId: number): Promise<Message[]> {
    try {
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: contactId },
            { senderId: contactId, receiverId: userId },
          ],
        },
      });
      return messages;
    } catch (error) {
      console.error('Erro ao buscar mensagens do contato:', error);
      throw new Error('Erro ao buscar mensagens do contato');
    }
  }

  static async getMessagesSentByUser(userId: number): Promise<Message[]> {
    try {
      const messages = await prisma.message.findMany({
        where: {
          senderId: userId,
        },
      });
      return messages;
    } catch (error) {
      console.error('Erro ao buscar mensagens enviadas:', error);
      throw new Error('Erro ao buscar mensagens enviadas');
    }
  }

  static async getMessagesReceivedByUser(userId: number): Promise<Message[]> {
    try {
      const messages = await prisma.message.findMany({
        where: {
          receiverId: userId,
        },
      });
      return messages;
    } catch (error) {
      console.error('Erro ao buscar mensagens recebidas:', error);
      throw new Error('Erro ao buscar mensagens recebidas');
    }
  }
}

export default MessageModel;
