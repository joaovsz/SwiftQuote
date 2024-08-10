import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import "remixicon/fonts/remixicon.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import LoginPage from "../pages/LoginPage/LoginPage";
import Cotacoes from "../pages/Cotacoes/Cotacoes";
import Fornecedores from "../pages/Fornecedores/Fornecedores";
import Produto from "../pages/Produto/Produto";
import Contato from "../pages/Contato/Contato";
import SignupPage from "../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "cadastro", element: <div>Cadastro</div> },
          { path: "cotacoes", element: <Cotacoes /> },
          { path: "fornecedores", element: <Fornecedores /> },
          { path: "produtos", element: <Produto /> },
          { path: "contatos", element: <Contato /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);
