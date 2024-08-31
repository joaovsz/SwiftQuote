import { useNavigate } from "react-router-dom";
import styles from "./Contato.module.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomTable from "../../components/Table/CustomTable";
import { fetchContatos } from "../../../firebase/Services/fetchServices";
import { useEffect, useState } from "react";
import { Contato } from "../../models/Entidades";
function ListagemContatos() {
  const navigate = useNavigate();
  const [contatos, setContatos] = useState<Contato[]>([]);
  useEffect(() => {
    fetchContatos().then((contatos) => {
      setContatos(contatos);
    });
  }, []);
  return (
    <div className={styles.mainTable}>
      <div
        className={styles.row}
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <h2>Contatos de Fornecedores</h2>
        <CustomButton
          label="Novo Contato"
          onClick={() => navigate("/contatos/cadastro")}
        />
      </div>
      <CustomTable
        data={contatos}
        columns={[
          { field: "nome", header: "Nome" },
          { field: "email", header: "Email" },
          { field: "telefone", header: "Número" },
          { field: "cargo", header: "Cargo" },
          { field: "fornecedorName", header: "Fornecedor" },
        ]}
      />
    </div>
  );
}

export default ListagemContatos;
