import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import api from "../services/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });
      const { user } = response.data.data;
      dispatch(setUser(user));
      
      navigate("/profile");
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  return (
    <div className="login-container">
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
