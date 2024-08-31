import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomButton from "../../components/CustomButton/CustomButton";
import styles from "./Requisicao.module.css";

function Requisicao() {
  const navigate = useNavigate();

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
    </div>
  );
}

export default Requisicao;
