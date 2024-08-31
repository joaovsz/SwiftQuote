import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import minimalLogo from "../../assets/minimalLogoWhite.svg";
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
      label: "Requisições",
      icon: "ri-file-list-line",
      command: () => navigate("/requisicoes"),
    },
    {
      label: "Cotações",
      icon: "ri-file-list-line",
      command: () => navigate("/cotacoes"),
    },
    {
      label: "Contatos",
      icon: "ri-file-list-line",
      command: () => navigate("/contatos"),
    },
    {
      label: "Produtos",
      icon: "ri-file-list-line",
      command: () => navigate("/produtos"),
    },
    {
      label: "Fornecedores",
      icon: "ri-contacts-line",
      command: () => navigate("/fornecedores"),
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
    <img alt="logo" src={minimalLogo} height="30" className="mr-2" />
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
    <Menubar model={items} start={start} end={end} className={styles.header} />
  );
};

export default Header;
