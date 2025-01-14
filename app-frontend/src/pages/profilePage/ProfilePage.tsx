import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { setUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import FooterMenu from "../../components/FooterMenu";
import "./profilePage.css";

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({
    id: user?.id || 0,
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    dispatch(setUser({ user: editData, token: "" }));
    setOpenModal(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  if (!user) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Usuário não encontrado. Por favor, faça login novamente.
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="profile-container" maxWidth="sm">
      {/* Header */}
      <Box textAlign="center" mt={4}>
        <Avatar
          alt={user.name}
          sx={{
            width: 80,
            height: 80,
            margin: "auto",
            fontSize: 32,
            bgcolor: "primary.main",
          }}
        >
          {user.name.charAt(0)}
        </Avatar>
        <Typography variant="h5" mt={2} fontWeight="bold">
          {user.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user.email}
        </Typography>
      </Box>

      {/* Info Cards */}
      <Box mt={4}>
        <Card elevation={3} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Localização
            </Typography>
            <Typography>{user.location || "Não informado"}</Typography>
          </CardContent>
        </Card>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          fullWidth
          onClick={() => setOpenModal(true)}
        >
          Editar Perfil
        </Button>
      </Box>

      {/* Logout Button */}
      <Box mt={2} textAlign="center">
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          color="error"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      {/* Edit Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Editar Perfil
          </Typography>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            name="name"
            value={editData.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={editData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Localização"
            variant="outlined"
            fullWidth
            name="location"
            value={editData.location}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Nova Senha"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={editData.password}
            onChange={handleChange}
            margin="normal"
          />
          <Box mt={3} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Salvar Alterações
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Footer Menu */}
      <FooterMenu />
    </Container>
  );
};

export default ProfilePage;
