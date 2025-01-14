import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import api from "../../services/api";

const ChatPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    severity: "success" | "error" | "info" | "warning";
  } | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const contacts = response.data.map((item: any) => item.contact);
      setContacts(contacts);
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
      setAlert({
        message: 'Erro ao carregar contatos.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (contactId: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/messages/${user.id}/contact/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
      setAlert({
        message: "Erro ao carregar mensagens.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedContact || !newMessage.trim()) {
      setAlert({
        message: "Por favor, insira a mensagem.",
        severity: "warning",
      });
      return;
    }

    try {
      await api.post(
        "/messages",
        {
          senderId: user.id,
          receiverId: selectedContact.id,
          content: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewMessage("");
      fetchMessages(selectedContact.id);
      setAlert({
        message: "Mensagem enviada com sucesso!",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setAlert({
        message: "Erro ao enviar mensagem.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact.id);
    }
  }, [selectedContact]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, {user.name}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Contatos
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {contacts.map((contact: any) => (
              <ListItem
                component="button"
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                sx={{ marginBottom: 1 }}
              >
                <ListItemText
                  primary={contact.name}
                  secondary={`Email: ${contact.email}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {selectedContact && (
        <>
          <Typography variant="h5" gutterBottom>
            Conversa com {selectedContact.name}
          </Typography>
          <Box
            sx={{
              marginBottom: 2,
              maxHeight: 400,
              overflowY: "auto",  // Permite o scroll apenas nesta área
              border: "1px solid #ddd",
              borderRadius: 1,
              padding: 1,
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <List>
                {messages.map((message: any) => (
                  <ListItem
                    key={message.id}
                    sx={{ borderBottom: "1px solid #ddd" }}
                  >
                    <ListItemText
                      primary={message.content}
                      secondary={`Enviado por: ${
                        message.senderId === user.id
                          ? "Você"
                          : selectedContact.name
                      }`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          <TextField
            label="Digite sua mensagem"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            disabled={loading}
            sx={{ marginBottom: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Enviar"
            )}
          </Button>
        </>
      )}

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

      {/* Botão para voltar para a tela de contatos */}
      <Button
        variant="outlined"
        onClick={() => setSelectedContact(null)}
        sx={{ marginTop: 2 }}
      >
        Voltar para Contatos
      </Button>
    </Box>
  );
};

export default ChatPage;
