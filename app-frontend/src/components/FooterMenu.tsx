import React from "react";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, AccountBox, Explore } from "@mui/icons-material";

const FooterMenu: React.FC = () => {
  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "#fff",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
      }}
      showLabels
    >
      <BottomNavigationAction
        component={Link}
        to="/profile"
        label="Perfil"
        icon={<Home />}
      />
      <BottomNavigationAction
        component={Link}
        to="/contacts"
        label="Contatos"
        icon={<AccountBox />}
      />
      <BottomNavigationAction
        component={Link}
        to="/explore"
        label="Explorar"
        icon={<Explore />}
      />
    </BottomNavigation>
  );
};

export default FooterMenu;
