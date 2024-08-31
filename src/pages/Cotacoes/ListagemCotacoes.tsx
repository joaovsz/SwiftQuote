import { useEffect, useState } from "react";
import CustomTable from "../../components/Table/CustomTable";
import { Cotacao } from "../../models/Entidades";
import styles from "./Cotacoes.module.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { fetchCotacoes } from "../../../firebase/Services/fetchServices";
function ListagemCotacoes() {
  const navigate = useNavigate();
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  useEffect(() => {
    fetchCotacoes().then((cotacoes) => {
      setCotacoes(cotacoes);
      console.log(cotacoes);
    });
  }, []);
  return (
    <div className={styles.mainTable}>
      <div
        className={styles.row}
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <h2>Cotações Cadastradas</h2>
        <CustomButton
          label="Nova Cotação"
          onClick={() => navigate("/cotacoes/cadastro")}
        />
      </div>
      <CustomTable
        data={[]}
        columns={[
          { field: "status", header: "Status" },
          { field: "total", header: "Valor Total" },
          { field: "fornecedorId", header: "Fornecedor" },
          { field: "dataCriacao", header: "Data" },
        ]}
      />
    </div>
  );
}

export default ListagemCotacoes;
