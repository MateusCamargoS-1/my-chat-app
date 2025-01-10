import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser as setAuthUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import api from "../../services/api";
import "./loginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });
      const { user, token } = response.data.data;

      dispatch(setAuthUser({ user, token }));

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      navigate("/profile");
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  return (
    <div className="container">
      <Typography className="title">Bem-vindo de volta!</Typography>

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        margin="normal"
        size="small"
      />

      <TextField
        label="Senha"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
        margin="normal"
        size="small"
      />

      <Button
        variant="contained"
        className="button"
        onClick={handleLogin}
      >
        Entrar
      </Button>

      <Box className="signupText">
        <Typography variant="body2">Não tem uma conta?</Typography>
        <Button
          className="signupButton"
          onClick={() => navigate("/signup")}
        >
          Crie uma agora!
        </Button>
      </Box>
    </div>
  );
};

export default LoginPage;
