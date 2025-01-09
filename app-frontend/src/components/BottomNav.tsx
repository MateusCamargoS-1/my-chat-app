// src/components/BottomNav.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import ChatIcon from '@mui/icons-material/Chat';

const BottomNav: React.FC = () => {
  return (
    <BottomNavigation
      sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 10 }}
    >
      <BottomNavigationAction
        label="Perfil"
        icon={<AccountCircleIcon />}
        component={NavLink}
        to="/profile"
      />
      <BottomNavigationAction
        label="Explorar"
        icon={<ExploreIcon />}
        component={NavLink}
        to="/explore"
      />
      <BottomNavigationAction
        label="Chat"
        icon={<ChatIcon />}
        component={NavLink}
        to="/chat"
      />
    </BottomNavigation>
  );
};

export default BottomNav;
