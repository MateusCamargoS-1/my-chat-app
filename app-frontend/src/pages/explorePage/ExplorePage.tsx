import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Button, List, ListItem, Avatar, Snackbar, Alert } from "@mui/material";
import api from "../../services/api";
import FooterMenu from "../../components/FooterMenu";
import "./explorePage.css";

interface User {
  id: number;
  name: string;
  email: string;
  location: string;
}

const ExplorePage: React.FC = () => {
  const [recommendedUsers, setRecommendedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const [usersResponse, contactsResponse] = await Promise.all([
          api.get<User[]>("/users", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          api.get<User[]>("/contacts", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);

        const allUsers = usersResponse.data;
        const userContacts = contactsResponse.data;

        const contactIds = userContacts.map((contact) => contact.id);
        const currentUserId = parseInt(localStorage.getItem("userId") || "0", 10);

        const filteredUsers = allUsers.filter(
          (user) =>
            user.id !== currentUserId &&
            !contactIds.includes(user.id) &&
            user.location === localStorage.getItem("location")
        );

        setRecommendedUsers(filteredUsers);
      } catch (err) {
        setError("Erro ao carregar recomendações. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedUsers();
  }, []);

  const handleAddContact = async (contactId: number) => {
    try {
      await api.post(
        "/contacts",
        { contactId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRecommendedUsers((prev) =>
        prev.filter((user) => user.id !== contactId)
      );
      setSuccessMessage("Contato adicionado com sucesso!");
    } catch (err) {
      setError("Erro ao adicionar contato. Tente novamente.");
    }
  };

  return (
    <Box className="explore-page" sx={{ paddingBottom: "80px" }}>
      <Typography variant="h4" className="explore-title" gutterBottom>
        Explorar Contatos
      </Typography>
      <Typography variant="body1" className="explore-subtitle">
        Recomendamos pessoas próximas à sua localização para adicionar como contato.
      </Typography>

      {loading ? (
        <Box className="loading-container">
          <CircularProgress />
          <Typography variant="body1" className="loading-text">
            Carregando recomendações...
          </Typography>
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" className="error-message">
          {error}
        </Typography>
      ) : recommendedUsers.length === 0 ? (
        <Typography variant="body1" className="no-recommendations">
          Nenhum usuário encontrado para recomendar.
        </Typography>
      ) : (
        <List className="user-list">
          {recommendedUsers.map((user) => (
            <ListItem key={user.id} className="user-list-item">
              <Avatar alt={user.name} src={`https://i.pravatar.cc/150?u=${user.email}`} />
              <Box className="user-info">
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.location}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddContact(user.id)}
              >
                Adicionar
              </Button>
            </ListItem>
          ))}
        </List>
      )}

      <FooterMenu />

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage(null)}>
        <Alert onClose={() => setSuccessMessage(null)} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ExplorePage;
