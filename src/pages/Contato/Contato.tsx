import { useForm, SubmitHandler } from "react-hook-form";
import { addContato } from "../../../firebase/Services/createServices";
import TextField from "../../components/TextField.tsx/TextField";
import { Contato } from "../../models/Entidades";
import styles from "./Contato.module.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import Select from "../../components/Select/Select";
const Contatos = () => {
  const { control, handleSubmit, reset } = useForm<Contato>();

  const onSubmit: SubmitHandler<Contato> = async (data) => {
    console.log(data);
    await addContato(data);
    reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Cadastro de Contatos</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nome"
            name="nome"
            id="nome"
            controllerProps={{ control, name: "nome", defaultValue: "" }}
          />
          <TextField
            label="Telefone"
            name="telefone"
            id="telefone"
            controllerProps={{ control, name: "telefone", defaultValue: "" }}
          />
          <TextField
            label="Email"
            name="email"
            id="email"
            controllerProps={{ control, name: "email", defaultValue: "" }}
          />
          <TextField
            label="Cargo"
            name="cargo"
            id="cargo"
            controllerProps={{ control, name: "cargo", defaultValue: "" }}
          />
          <Select
            label="ID do Fornecedor"
            name="fornecedorId"
            id="fornecedorId"
            controllerProps={{
              control,
              name: "fornecedor",
              defaultValue: "",
            }}
            options={[{ name: "Fornecedor 1", code: "1" }]}
          />
          <CustomButton style={{ marginTop: "16px" }} label="Cadastrar" />{" "}
        </form>
      </div>
    </div>
  );
};

export default Contatos;
