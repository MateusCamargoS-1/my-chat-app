import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { Button, Container, Typography, Card, CardContent, Avatar, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { setUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import FooterMenu from "../../components/FooterMenu";
import './profilePage.css';

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({
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
    <Container className="profile-container">
      <div className="profile-header">
        <Avatar alt="Profile Picture" className="profile-avatar" />
        <Typography variant="h4" className="profile-name">{user.name}</Typography>
      </div>

      <Card className="profile-card">
        <CardContent>
          <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
          <Typography variant="body1"><strong>Localização:</strong> {user.location}</Typography>
        </CardContent>
      </Card>

      <div className="profile-actions">
        <IconButton onClick={() => setOpenModal(true)} className="settings-button">
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={handleLogout} className="logout-button">
          <LogoutIcon />
        </IconButton>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)} className="edit-modal">
        <div className="modal-content">
          <Typography variant="h6" className="modal-title">Editar Perfil</Typography>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            name="name"
            value={editData.name}
            onChange={handleChange}
            className="modal-input"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={editData.email}
            onChange={handleChange}
            className="modal-input"
          />
          <TextField
            label="Localização"
            variant="outlined"
            fullWidth
            name="location"
            value={editData.location}
            onChange={handleChange}
            className="modal-input"
          />
          <TextField
            label="Nova Senha"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            value={editData.password}
            onChange={handleChange}
            className="modal-input"
          />
          <Button variant="contained" onClick={handleSaveChanges} className="save-changes-btn">
            Salvar Alterações
          </Button>
        </div>
      </Modal>
      <FooterMenu />
    </Container>
  );
};

export default ProfilePage;
