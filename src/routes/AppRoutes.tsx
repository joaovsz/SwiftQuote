import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import 'remixicon/fonts/remixicon.css';
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import LoginPage from "../pages/LoginPage/LoginPage";
import Cotacoes from "../pages/Cotacoes/Cotacoes";
import Fornecedores from "../pages/Fornecedores/Fornecedores";

export const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "login", element: <LoginPage /> },
            { path: "cadastro", element: <div>Cadastro</div> },
            { path: "cotacoes", element: <Cotacoes /> },
            { path: "fornecedores", element: <Fornecedores /> }
        ]
    },
]);