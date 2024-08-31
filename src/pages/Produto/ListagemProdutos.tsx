import { useEffect, useState } from "react";
import CustomTable from "../../components/Table/CustomTable";
import { Fornecedor, Produto } from "../../models/Entidades";
import styles from "./Produto.module.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import {
  fetchFornecedores,
  fetchProdutos,
} from "../../../firebase/Services/fetchServices";
function ListagemProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  useEffect(() => {
    fetchProdutos().then((produtos) => {
      setProdutos(produtos);
    });
  }, []);
  return (
    <div className={styles.mainTable}>
      <div
        className={styles.row}
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <h2>Produtos Cadastrados</h2>
        <CustomButton
          label="Novo Produto"
          onClick={() => navigate("/produtos/cadastro")}
        />
      </div>
      <CustomTable
        data={produtos}
        columns={[
          { field: "nome", header: "Nome" },
          { field: "descricao", header: "Descrição" },
          { field: "precoUnitario", header: "Preço Médio" },
        ]}
      />
    </div>
  );
}

export default ListagemProdutos;
