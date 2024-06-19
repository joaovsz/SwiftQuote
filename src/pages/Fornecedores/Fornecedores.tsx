import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./Fornecedores.module.css";
import { Fornecedor } from "../../models/Entidades";
import TextField from "../../components/TextField.tsx/TextField";
import CustomButton from "../../components/CustomButton/CustomButton";
import {addFornecedor} from  '../../../firebase/Services/firebaseService'
const Fornecedores = () => {
  const { control, handleSubmit } = useForm<Fornecedor>({
    defaultValues: {
      nome: "",
      cnpj: "",
      endereco: "",
      telefone: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<Fornecedor> = async (data) => {
    await addFornecedor(data);
};

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Cadastro de Fornecedor</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nome"
            id="nome"
            name="nome"
            controllerProps={{ name: "nome", control }}
          />
          <TextField
            label="CNPJ"
            id="cnpj"
            name="cnpj"
            controllerProps={{ name: "cnpj", control }}
          />
          <TextField
            label="Endereço"
            id="endereco"
            name="endereco"
            controllerProps={{ name: "endereco", control }}
          />
          <TextField
            label="Telefone"
            id="telefone"
            name="telefone"
            controllerProps={{ name: "telefone", control }}
          />
          <TextField
            label="Email"
            id="email"
            name="email"
            controllerProps={{ name: "email", control }}
          />
          <CustomButton
            label={"Cadastrar Fornecedor"}
            style={{ maxWidth: "500px", width: "100%" }}
          />
        </form>
      </div>
    </div>
  );
};

export default Fornecedores;
