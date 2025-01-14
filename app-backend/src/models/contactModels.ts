import { PrismaClient, Contact } from '@prisma/client';
import prisma from '../database/prismaCliente';

class ContactModel {
  static async addContact(userId: number, contactId: number): Promise<Contact> {
    try {
      const newContact = await prisma.contact.create({
        data: {
          userId,
          contactId,
        },
      });
      return newContact;
    } catch (error) {
      console.error('Erro ao adicionar contato:', error);
      throw new Error('Erro ao adicionar contato');
    }
  }

  static async removeContact(userId: number, contactId: number): Promise<Contact> {
    try {
      const removedContact = await prisma.contact.delete({
        where: {
          userId_contactId: {
            userId,
            contactId,
          },
        },
      });
      return removedContact;
    } catch (error) {
      console.error('Erro ao remover contato:', error);
      throw new Error('Erro ao remover contato');
    }
  }

  static async getContacts(userId: number): Promise<Contact[]> {
    try {
      const contacts = await prisma.contact.findMany({
        where: {
          userId,
        },
        include: {
          contact: true,
        },
      });
      return contacts;
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
      throw new Error('Erro ao buscar contatos');
    }
  }
}

export default ContactModel;
