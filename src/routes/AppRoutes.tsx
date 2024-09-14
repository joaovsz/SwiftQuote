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
import ListagemCotacoes from "../pages/Cotacoes/ListagemCotacoes";
import ListagemFornecedores from "../pages/Fornecedores/ListagemFornecedores";
import CadastroRequisicao from "../pages/Requisicao/CadastroRequisicao";
import ListagemProdutos from "../pages/Produto/ListagemProdutos";
import ListagemContatos from "../pages/Contato/ListagemContatos";
import RequisicaoListagem from "../pages/Requisicao/Requisicao";
import Usuarios from "../pages/Usuarios/Usuarios";

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
          { path: "cotacoes", element: <ListagemCotacoes /> },
          { path: "cotacoes/cadastro", element: <Cotacoes /> },
          { path: "fornecedores", element: <ListagemFornecedores /> },
          { path: "fornecedores/cadastro", element: <Fornecedores /> },
          { path: "produtos", element: <ListagemProdutos /> },
          { path: "produtos/cadastro", element: <Produto /> },
          { path: "contatos", element: <ListagemContatos /> },
          { path: "contatos/cadastro", element: <Contato /> },
          { path: "requisicoes", element: <RequisicaoListagem /> },
          { path: "requisicoes/cadastro", element: <CadastroRequisicao /> },
          { path: "usuarios", element: <Usuarios /> },
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
