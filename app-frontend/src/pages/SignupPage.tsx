import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData, setError } from '../redux/signupSlice';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

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
      const response = await api.post('/signup', { name, email, location, password });
      console.log('Usuário criado com sucesso:', response.data);
      navigate('/login');
    } catch (err: any) {
      dispatch(setError('Erro ao cadastrar o usuário.'));
      console.error('Erro ao cadastrar:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center">Cadastro</Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <TextField
            label="Localização"
            variant="outlined"
            fullWidth
            margin="normal"
            name="location"
            value={location}
            onChange={handleChange}
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
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Criar Conta
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
