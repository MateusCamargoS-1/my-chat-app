import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, Typography, Button } from '@mui/material';

const ChatPage = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="chat-container">
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">Welcome, {user.name}</Typography>
        <Button variant="outlined" color="secondary">Start New Chat</Button>
      </Box>
    </div>
  );
};

export default ChatPage;
