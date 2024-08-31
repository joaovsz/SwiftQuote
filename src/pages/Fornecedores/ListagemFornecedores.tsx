import { useEffect, useState } from "react";
import CustomTable from "../../components/Table/CustomTable";
import { Fornecedor } from "../../models/Entidades";
import styles from "./Fornecedores.module.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { fetchFornecedores } from "../../../firebase/Services/fetchServices";
function ListagemFornecedores() {
  const navigate = useNavigate();
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  useEffect(() => {
    fetchFornecedores().then((fornecedor) => {
      setFornecedores(fornecedor);
    });
  }, []);
  return (
    <div className={styles.mainTable}>
      <div
        className={styles.row}
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <h2>Fornecedores Cadastrados</h2>
        <CustomButton
          label="Novo Fornecedor"
          onClick={() => navigate("/fornecedores/cadastro")}
        />
      </div>
      <CustomTable
        data={fornecedores}
        columns={[
          { field: "nome", header: "Nome" },
          { field: "telefone", header: "Telefone" },
          { field: "email", header: "Email" },
          { field: "cidade", header: "Cidade" },
        ]}
      />
    </div>
  );
}

export default ListagemFornecedores;
