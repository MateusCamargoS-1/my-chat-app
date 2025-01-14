import { Request, Response } from 'express';
import ContactService from '../services/contactService';
import UserService from '../services/userService';

class ContactController {
  static async addContact(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    const { contactEmail } = req.body; 
  
    if (!userId) {
      res.status(400).json({ message: "Usuário não autenticado" });
      return;
    }
  
    if (!contactEmail) {
      res.status(400).json({ message: "E-mail do contato não fornecido" });
      return;
    }
  
    try {
      const contactUser = await UserService.getUserByEmail(contactEmail);
  
      if (!contactUser) {
        res.status(404).json({ message: "Usuário não encontrado com esse e-mail" });
        return;
      }
  
      const contactId = contactUser.id;

      const newContact = await ContactService.addContact(userId, contactId);
  
      res.status(201).json(newContact);
    } catch (error) {
      console.error("Erro ao adicionar contato:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
  

  static async removeContact(req: Request, res: Response): Promise<void> {
    const contactId = Number(req.params.contactId); 
    const userId = req.user?.userId;
  
    if (!userId) {
      res.status(400).json({ message: 'Usuário não autenticado' });
      return;
    }
  
    try {
      const removedContact = await ContactService.removeContact(userId, contactId);
      res.status(200).json(removedContact);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  

  static async getContacts(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(400).json({ message: 'Usuário não autenticado' });
      return;
    }

    try {
      const contacts = await ContactService.getContacts(userId);
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default ContactController;
