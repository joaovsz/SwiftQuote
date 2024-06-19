import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "../../components/TextField.tsx/TextField";
import { addCotacao } from "../../../firebase/Services/firebaseService";
import { Cotacao } from "../../models/Entidades";
import styles from "./Cotacoes.module.css";
import CustomButton from "../../components/CustomButton/CustomButton";
const Cotacoes = () => {
  const { control, handleSubmit } = useForm<Cotacao>();

  const onSubmit: SubmitHandler<Cotacao> = async (data) => {
    await addCotacao(data);
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Cadastro de Cotação</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            controllerProps={{ control, name: "observacoes", defaultValue: "" }}
          />
          <TextField
            label="ID do Usuário"
            name="usuarioId"
            id="usuarioId"
            controllerProps={{ control, name: "usuarioId", defaultValue: "" }}
          />
          <TextField
            label="ID do Fornecedor"
            name="fornecedorId"
            id="fornecedorId"
            controllerProps={{
              control,
              name: "fornecedorId",
              defaultValue: "",
            }}
          />
          <CustomButton label="Cadastrar" />{" "}
        </form>
      </div>
    </div>
  );
};

export default Cotacoes;
