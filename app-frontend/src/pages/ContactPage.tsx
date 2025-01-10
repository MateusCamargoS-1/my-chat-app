import React from "react";
import FooterMenu from "../components/FooterMenu";

const ContactsPage: React.FC = () => {
  return (
    <div style={{ paddingBottom: "80px" }}>
      <h1>Lista de Contatos</h1>
      <p>Aqui vai o conteúdo da lista de contatos.</p>
      
      <FooterMenu />
    </div>
  );
};

export default ContactsPage;
