import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Requisicao } from "../../models/Entidades";
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from "./Requisicao.module.css";
import CustomTable from "../../components/Table/CustomTable";
import {
  excludeReq,
  fetchRequisicoes,
} from "../../../firebase/Services/fetchServices";
import { Button } from "primereact/button";

function RequisicaoListagem() {
  const navigate = useNavigate();
  const [requisicoes, setRequisicoes] = useState<Requisicao[]>([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetchRequisicoes().then((requisicoes) => {
      setRequisicoes(requisicoes);
    });
  }, [excludeReq]);

  const actionTemplate = (rowData: Requisicao) => {
    return (
      <Button
        icon="pi pi-trash"
        className={"p-button-danger"}
        onClick={async () => {
          await excludeReq(rowData.id);
          setRefresh(!refresh);
        }}
        label={"Excluir"}
      />
    );
  };
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
        block={true}
        actionTemplate={actionTemplate}
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
