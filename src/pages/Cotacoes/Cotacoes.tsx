import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "../../components/TextField.tsx/TextField";
import { addCotacao } from "../../../firebase/Services/createServices";
import {
  fetchFornecedores,
  fetchRequisicoes,
} from "../../../firebase/Services/fetchServices";
import { Cotacao } from "../../models/Entidades";
import styles from "./Cotacoes.module.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import Select from "../../components/Select/Select";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface Options {
  name: string;
  value: string;
}
const Cotacoes = () => {
  const { control, handleSubmit } = useForm<Cotacao>();
  const [fornecedores, setFornecedores] = useState<Options[]>([]);
  const [requisicoes, setRequisicoes] = useState<Options[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchFornecedores().then((fornecedores) => {
      const fornecedorOption = fornecedores.map((fornecedor) => {
        return { name: fornecedor.nome, value: fornecedor.cnpj };
      });
      setFornecedores(fornecedorOption);
    });
    fetchRequisicoes().then((requisicoes) => {
      const requisicoesOption = requisicoes.map((requisicao) => {
        return {
          name: requisicao.produtoName + " - " + requisicao.titulo,
          value: requisicao.id,
        };
      });
      setRequisicoes(requisicoesOption);
    });
  }, []);
  const onSubmit: SubmitHandler<Cotacao> = async (data) => {
    const fornecedor = fornecedores.find(
      (forn) => forn.value === data.fornecedorId
    );
    try {
      await addCotacao({
        ...data,
        dataCriacao: data.dataCriacao,
        dataValidade: data.dataValidade,
        fornecedorName: fornecedor?.name,
        requisicaoTitulo: requisicoes.find(
          (req) => req.value === data.requisicao
        )?.name,
      });
      toast.success("Cotação cadastrada com sucesso!");
      navigate(-1);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Cadastro de Cotação</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
            <Select
              options={requisicoes}
              label="Requisição"
              name="requisicao"
              id="requisicao"
              controllerProps={{
                control,
                name: "requisicao",
                defaultValue: "",
              }}
            />
            <TextField
              label="Data de Criação"
              name="dataCriacao"
              id="dataCriacao"
              controllerProps={{
                control,
                name: "dataCriacao",
                defaultValue: new Date().toISOString().substring(0, 10),
              }}
              type="date"
            />
            <TextField
              label="Data de Validade"
              name="dataValidade"
              id="dataValidade"
              controllerProps={{
                control,
                name: "dataValidade",
                defaultValue: "",
              }}
              type="date"
            />
          </div>
          <div className={styles.row}>
            <Select
              options={[
                { name: "Aberta", value: "Aberta" },
                { name: "Em cotação", value: "Em cotação" },
                { name: "Cotada", value: "Cotada" },
              ]}
              label="Status"
              name="status"
              id="status"
              controllerProps={{ control, name: "status", defaultValue: "" }}
            />
            <TextField
              label="Total"
              name="total"
              id="total"
              controllerProps={{ control, name: "total", defaultValue: "" }}
            />
            <TextField
              label="Observações"
              name="observacoes"
              id="observacoes"
              controllerProps={{
                control,
                name: "observacoes",
                defaultValue: "",
              }}
            />
          </div>
          <div className={styles.row}>
            {/* <Select
              options={[]}
              label="ID do Usuário"
              name="usuarioId"
              id="usuarioId"
              controllerProps={{ control, name: "usuarioId", defaultValue: "" }}
            /> */}
            <Select
              options={fornecedores}
              label="Fornecedor"
              name="fornecedorId"
              id="fornecedorId"
              controllerProps={{
                control,
                name: "fornecedorId",
                defaultValue: "",
              }}
            />
          </div>
          <CustomButton
            style={{ marginTop: "16px" }}
            label="Cadastrar"
            type="submit"
          />{" "}
        </form>
      </div>
    </div>
  );
};

export default Cotacoes;
