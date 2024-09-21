import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  blockUser,
  fetchColaboradores,
} from "../../../firebase/Services/fetchServices";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomTable from "../../components/Table/CustomTable";
import { Usuario } from "../../models/Entidades";
import styles from "./Usuarios.module.css";
import { Button } from "primereact/button";
import { toast } from "react-toastify";

function Usuarios() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<Usuario[]>([]);
  const [toggleBlock, setToggleBlock] = useState(false);
  useEffect(() => {
    fetchColaboradores().then((users) => {
      setUsers(users);
    });
  }, []);
  const blockUserId = async (id: string, block: boolean) => {
    try {
      await blockUser(id, block);
      block
        ? toast.success("Usuário bloqueado com sucesso!")
        : toast.success("Usuário desbloqueado com sucesso!");
    } catch (error) {
      console.error((error as Error).message);
    }
    setToggleBlock(!toggleBlock);
  };
  useEffect(() => {
    fetchColaboradores().then((users) => {
      setUsers(users);
    });
  }, [toggleBlock]);

  const actionTemplate = (rowData: Usuario) => {
    return (
      <Button
        icon="pi pi-trash"
        className={rowData.blocked ? "p-button-success" : "p-button-danger"}
        onClick={() => {
          blockUserId(rowData.id, !rowData.blocked);
        }}
        label={rowData.blocked ? "Desbloquear" : "Bloquear"}
      />
    );
  };
  return (
    <div className={styles.mainTable}>
      <div
        className={styles.row}
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <h2>Usuários</h2>
        <CustomButton
          label="Nova Requisição"
          onClick={() => navigate("/requisicoes/cadastro")}
        />
      </div>
      <CustomTable
        block={true}
        actionTemplate={actionTemplate}
        data={users}
        columns={[
          { field: "id", header: "Id" },
          { field: "nome", header: "Usuário" },
          { field: "telefone", header: "Telefone" },
          {
            field: "",
            header: "Ações",
          },
        ]}
      />
    </div>
  );
}

export default Usuarios;
