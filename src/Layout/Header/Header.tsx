import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import Slogo from "../../assets/SLogo.png";
import styles from "./Header.module.css";
import { logout } from "../../../firebase/Services/authService";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
const Header = () => {
  const menu = useRef<Menu>(null);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const items = [
    {
      id: "req",
      label: "Requisições",
      icon: "ri-file-list-line",
      command: () => navigate("/requisicoes"),
    },
    {
      id: "cot",
      label: "Cotações",
      icon: "ri-file-list-line",
      command: () => navigate("/cotacoes"),
    },
    {
      id: "contacts",
      label: "Contatos",
      icon: "ri-file-list-line",
      command: () => navigate("/contatos"),
    },
    {
      id: "prod",
      label: "Produtos",
      icon: "ri-file-list-line",
      command: () => navigate("/produtos"),
    },
    {
      id: "forn",
      label: "Fornecedores",
      icon: "ri-contacts-line",
      command: () => navigate("/fornecedores"),
    },
    {
      id: "users",
      label: "Usuários",
      icon: "ri-user-line",
      command: () => navigate("/usuarios"),
    },
  ];

  const userMenuItems = [
    {
      label: "Criar conta de administrador",
      icon: "pi pi-user",
      command: () => {
        isAdmin
          ? navigate("/signup", { state: { isAdmin: true } })
          : toast.error("Você não tem permissão para acessar essa página");
      },
    },
    {
      label: "Sair",
      icon: "ri-logout-box-line",
      command: async () => {
        await logout();
      },
    },
  ];

  const start = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img alt="logo" src={Slogo} height="30" className="mr-2" />
      <span style={{ fontWeight: "bold" }}>Swift Quote</span>
    </div>
  );

  const end = (
    <>
      <Menu model={userMenuItems} popup ref={menu} id="popup_menu" />
      <Button
        icon="ri-user-line"
        className="p-button-rounded p-button-secondary p-button-text"
        onClick={(event) => menu.current?.toggle(event)}
      />
    </>
  );

  return (
    <Menubar
      model={isAdmin ? items : items.filter((i) => i.id == "req")}
      start={start}
      end={end}
      className={styles.header}
    />
  );
};

export default Header;
