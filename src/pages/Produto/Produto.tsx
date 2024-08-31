import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addProduto } from "../../../firebase/Services/createServices";
import TextField from "../../components/TextField.tsx/TextField";
import { Produto } from "../../models/Entidades";
import styles from "./Produto.module.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import { toast } from "react-toastify";
const ProdutoPage: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<Produto>({
    defaultValues: {
      nome: "",
      descricao: "",
      precoUnitario: 0,
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit: SubmitHandler<Produto> = async (data) => {
    setIsLoading(true);
    try {
      if (
        data.nome === "" ||
        data.descricao === "" ||
        data.precoUnitario === 0
      ) {
        toast.error("Preencha todos os campos!");
        return;
      }
      await addProduto(data);
      setIsLoading(false);
      toast.success("Produto cadastrado com sucesso!");
      reset();
    } catch (error) {
      setIsLoading(false);

      alert((error as Error).message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Cadastro de Produtos</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nome"
            name="nome"
            id="nome"
            controllerProps={{ control, name: "nome", defaultValue: "" }}
          />
          <TextField
            label="Descrição"
            name="descricao"
            id="descricao"
            controllerProps={{ control, name: "descricao", defaultValue: "" }}
          />
          <TextField
            label="Preço Unitário"
            name="precoUnitario"
            id="precoUnitario"
            controllerProps={{
              control,
              name: "precoUnitario",
              defaultValue: "",
            }}
          />

          <CustomButton
            isLoading={isLoading}
            style={{ marginTop: "16px" }}
            label="Cadastrar Produto"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ProdutoPage;
