import React from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData, setError } from "../../redux/signupSlice";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import './signup/signupPage.css';

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, location, password, error } = useSelector(
    (state: RootState) => state.signup
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setSignupData({
        name,
        email,
        location,
        password,
        error,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/signup", { name, email, location, password });
      console.log("Usuário criado com sucesso:", response.data);
      navigate("/login");
    } catch (err: any) {
      dispatch(setError("Erro ao cadastrar o usuário."));
      console.error("Erro ao cadastrar:", err);
    }
  };

  return (
    <Container maxWidth="sm" className="container">
      <Typography className="title">Crie sua conta</Typography>
      {error && <Typography className="errorText">{error}</Typography>}
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={name}
          onChange={handleChange}
          className="input"
        />
        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={email}
          onChange={handleChange}
          className="input"
        />
        <TextField
          label="Localização"
          variant="outlined"
          fullWidth
          margin="normal"
          name="location"
          value={location}
          onChange={handleChange}
          className="input"
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          value={password}
          onChange={handleChange}
          className="input"
        />
        <Button type="submit" variant="contained" fullWidth className="button">
          Criar Conta
        </Button>
      </form>

      <Box className="linkText">
        <Typography variant="body2">Já tem uma conta?</Typography>
        <Button
          className="linkButton"
          onClick={() => navigate("/login")}
        >
          Faça login
        </Button>
      </Box>
    </Container>
  );
};

export default SignupPage;
