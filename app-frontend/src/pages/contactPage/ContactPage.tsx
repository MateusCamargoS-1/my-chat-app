import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Fab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Container,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FooterMenu from "../../components/FooterMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import api from "../../services/api";
import "./contactsPage.css";

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newContactEmail, setNewContactEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [alert, setAlert] = useState<{ message: string; severity: "success" | "error" | "info" | "warning" } | null>(null);

  // Pegando o token e o userId do Redux
  const { token, user } = useSelector((state: RootState) => state.auth);  // Pegando o estado de autenticação
  const userId = user?.id;  // Pegando o ID do usuário logado
  const navigate = useNavigate();

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const contacts = response.data.map((item: any) => item.contact);
      setContacts(contacts);
    } catch (error: any) {
      console.error("Erro ao buscar contatos:", error);
      setAlert({
        message: error.response?.data?.message || "Erro ao carregar contatos.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchContacts();
  }, [token]);

  const handleAddContact = async () => {
    if (newContactEmail.trim()) {
      setLoadingAction(true);
      try {
        const existingContact = contacts.find((contact) => contact.email === newContactEmail);
        if (existingContact) {
          setAlert({ message: "Este contato já está na sua lista!", severity: "warning" });
          return;
        }
        await api.post(
          "/contacts",
          { contactEmail: newContactEmail, userId }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNewContactEmail("");
        setOpenDialog(false);
        await fetchContacts();
        setAlert({ message: "Contato adicionado com sucesso!", severity: "success" });
      } catch (error: any) {
        console.error("Erro ao adicionar contato:", error);
        setAlert({
          message: error.response?.data?.message || "Erro ao adicionar contato.",
          severity: "error",
        });
      } finally {
        setLoadingAction(false);
      }
    }
  };

  const handleDeleteContact = async (contactId: number) => {
    setLoadingAction(true);
    try {
      await api.delete(`/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchContacts();
      setAlert({ message: "Contato excluído com sucesso!", severity: "success" });
    } catch (error: any) {
      console.error("Erro ao excluir contato:", error);
      setAlert({
        message: error.response?.data?.message || "Erro ao excluir contato.",
        severity: "error",
      });
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewContactEmail("");
  };

  const handleContactClick = (contactId: number) => {
    navigate(`/chat/${contactId}`);
  };

  return (
    <Container className="contacts-container">
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Contatos
      </Typography>

      {loading ? (
        <Box className="loading-box">
          <CircularProgress />
          <Typography variant="body1" color="textSecondary" style={{ marginTop: 8 }}>
            Carregando contatos...
          </Typography>
        </Box>
      ) : contacts.length === 0 ? (
        <Typography variant="body1" align="center" color="textSecondary">
          Sua lista de contatos está vazia.
        </Typography>
      ) : (
        <List>
          {contacts.map((contact) => (
            <ListItem key={contact.id} className="contact-item" onClick={() => handleContactClick(contact.id)}>
              <ListItemAvatar>
                <Avatar>{contact.name?.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={contact.name} secondary={contact.email} />
              <Button
                variant="outlined"
                color="secondary"
                disabled={loadingAction}
                onClick={() => handleDeleteContact(contact.id)}
              >
                {loadingAction ? <CircularProgress size={20} /> : "Excluir"}
              </Button>
            </ListItem>
          ))}
        </List>
      )}

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpenDialog(true)}
        className="add-button"
      >
        <AddIcon />
      </Fab>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Adicionar Novo Contato</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email do Contato"
            type="email"
            fullWidth
            value={newContactEmail}
            onChange={(e) => setNewContactEmail(e.target.value)}
            disabled={loadingAction}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary" disabled={loadingAction}>
            Cancelar
          </Button>
          <Button onClick={handleAddContact} color="primary" disabled={loadingAction}>
            {loadingAction ? <CircularProgress size={20} /> : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>

      {alert && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setAlert(null)}
        >
          <Alert severity={alert.severity} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}

      <FooterMenu />
    </Container>
  );
};

export default ContactsPage;
