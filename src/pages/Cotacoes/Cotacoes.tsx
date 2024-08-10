import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "../../components/TextField.tsx/TextField";
import { addCotacao } from "../../../firebase/Services/createServices";
import { fetchFornecedores } from "../../../firebase/Services/fetchServices";
import { Cotacao } from "../../models/Entidades";
import styles from "./Cotacoes.module.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import Select from "../../components/Select/Select";
import { useEffect, useState } from "react";
interface Options {
  name: string;
  value: string;
}
const Cotacoes = () => {
  const { control, handleSubmit } = useForm<Cotacao>();
  const [fornecedores, setFornecedores] = useState<Options[]>([]);
  useEffect(() => {
    fetchFornecedores().then((fornecedores) => {
      const fornecedorOption = fornecedores.map((fornecedor) => {
        return { name: fornecedor.nome, value: fornecedor.cnpj };
      });
      setFornecedores(fornecedorOption);
    });
  }, []);
  const onSubmit: SubmitHandler<Cotacao> = async (data) => {
    await addCotacao(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Cadastro de Cotação</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
            <TextField
              label="Produto"
              name="produto"
              id="produto"
              controllerProps={{
                control,
                name: "produto",
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
            <TextField
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
          <CustomButton style={{ marginTop: "16px" }} label="Cadastrar" />{" "}
        </form>
      </div>
    </div>
  );
};

export default Cotacoes;
