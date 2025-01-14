import prisma from '../database/prismaCliente';
import ContactModel from '../models/contactModels';
import { Contact } from '@prisma/client';

class ContactService {
  static async addContact(userId: number, contactId: number) {
    if (userId === contactId) {
      throw new Error("Você não pode adicionar a si mesmo como contato");
    }

    const existingContact = await prisma.contact.findFirst({
      where: {
        userId,
        contactId,
      },
    });

    if (existingContact) {
      throw new Error("Contato já existe na sua lista");
    }

    const newContact = await prisma.contact.create({
      data: {
        userId,
        contactId,
      },
    });

    return newContact;
  }

  static async removeContact(userId: number, contactId: number): Promise<Contact> {
    try {
      const removedContact = await ContactModel.removeContact(userId, contactId);
      return removedContact;
    } catch (error) {
      throw new Error('Erro ao remover contato: ' + error);
    }
  }

  static async getContacts(userId: number): Promise<Contact[]> {
    try {
      const contacts = await ContactModel.getContacts(userId);
      return contacts;
    } catch (error) {
      throw new Error('Erro ao buscar contatos: ' + error);
    }
  }
}

export default ContactService;
