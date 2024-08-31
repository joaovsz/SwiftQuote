import { useForm, SubmitHandler } from "react-hook-form";
import { addContato } from "../../../firebase/Services/createServices";
import TextField from "../../components/TextField.tsx/TextField";
import { Contato } from "../../models/Entidades";
import styles from "./Contato.module.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import Select from "../../components/Select/Select";
import { useState, useEffect } from "react";
import { fetchFornecedores } from "../../../firebase/Services/fetchServices";
import { toast } from "react-toastify";
interface Options {
  name: string;
  value: string;
}
const Contatos = () => {
  const { control, handleSubmit, reset, getValues } = useForm();
  const [fornecedores, setFornecedores] = useState<Options[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFornecedores().then((fornecedores) => {
      const fornecedorOption = fornecedores.map((fornecedor) => {
        return { name: fornecedor.nome, value: fornecedor.cnpj };
      });
      setFornecedores(fornecedorOption);
    });
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      await addContato({
        ...data,
        fornecedorName: fornecedores
          .filter((forn) => forn.value === data.fornecedorId)
          .map((f) => f.name),
      });
      reset();
      toast.success("Contato cadastrado com sucesso!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error((error as Error).message);
    }
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
          <CustomButton
            style={{ marginTop: "16px" }}
            label="Cadastrar"
            isLoading={isLoading}
            type="submit"
          />{" "}
        </form>
      </div>
    </div>
  );
};

export default Contatos;
