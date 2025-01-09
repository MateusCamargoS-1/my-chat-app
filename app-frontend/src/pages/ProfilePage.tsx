import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Container, Typography, Card, CardContent } from '@mui/material';

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

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
    <Container sx={{ paddingBottom: '64px' }}>
      <Card>
        <CardContent>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Typography variant="body1">Localização: {user.location}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
