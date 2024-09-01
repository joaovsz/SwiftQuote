import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Requisicao } from "../../models/Entidades";
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from "./Requisicao.module.css";
import CustomTable from "../../components/Table/CustomTable";
import { fetchRequisicoes } from "../../../firebase/Services/fetchServices";

function RequisicaoListagem() {
  const navigate = useNavigate();
  const [requisicoes, setRequisicoes] = useState<Requisicao[]>([]);
  useEffect(() => {
    fetchRequisicoes().then((requisicoes) => {

      setRequisicoes(requisicoes);
    });
  }, []);
  return (
    <div className={styles.mainTable}>
      <div
        className={styles.row}
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <h2>Requisições Cadastradass</h2>
        <CustomButton
          label="Nova Requisição"
          onClick={() => navigate("/requisicoes/cadastro")}
        />
      </div>
      <CustomTable
        data={requisicoes}
        columns={[
          { field: "titulo", header: "Título" },
          { field: "status", header: "Status" },
          { field: "produtoName", header: "Produto" },
        ]}
      />
    </div>
  );
}

export default RequisicaoListagem;
