import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addProduto } from "../../../firebase/Services/firebaseService";
import TextField from "../../components/TextField.tsx/TextField";
import { Produto } from "../../models/Entidades";
import styles from "./Produto.module.css";
import CustomButton from "../../components/CustomButton/CustomButton";
const ProdutoPage: React.FC = () => {
  const { control, handleSubmit } = useForm<Produto>();

  const onSubmit: SubmitHandler<Produto> = async (data) => {
    await addProduto(data);
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
          <TextField
            label="Quantidade"
            name="quantidade"
            id="quantidade"
            controllerProps={{ control, name: "quantidade", defaultValue: "" }}
          />
          <CustomButton label="Cadastrar Produto" />
        </form>
      </div>
    </div>
  );
};

export default ProdutoPage;
