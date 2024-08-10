import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./Fornecedores.module.css";
import { Fornecedor } from "../../models/Entidades";
import TextField from "../../components/TextField.tsx/TextField";
import CustomButton from "../../components/CustomButton/CustomButton";
import { addFornecedor } from "../../../firebase/Services/createServices";
import { useEffect, useState } from "react";
import { useDebounce } from "../../Hooks/useDebounce";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { fornecedorSchema } from "./Schema";
const Fornecedores = () => {
  const [viacep, setViacep] = useState();
  const { debounce } = useDebounce();
  const { control, handleSubmit, watch, setValue } = useForm<Fornecedor>({
    defaultValues: {
      nome: "",
      cnpj: "",
      cep: "",
      logradouro: "",
      bairro: "",
      complemento: "",
      cidade: "",
      estado: "",
      telefone: "",
      email: "",
    },
    resolver: zodResolver(fornecedorSchema),
  });

  const onSubmit: SubmitHandler<Fornecedor> = async (data) => {
    try {
      const res = await addFornecedor(data);
      console.log(res);
      res.success && toast.success("Fornecedor adicionado com sucesso");
    } catch (error) {
      toast.error((error as Error).message);
    }
    return;
  };
  useEffect(() => {
    if (!watch("cep")?.length) {
      setValue("cep", "");
    }
    debouncedCep(watch("cep"));
  }, [watch("cep")]);

  async function getEndereco(cep: string) {
    if (cep.length < 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (res.ok) {
        const data = await res.json();
        setValue("logradouro", data.logradouro);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
        setValue("bairro", data.bairro);
        setValue("complemento", data.complemento);
      }
    } catch (error) {
      toast.error("CEP inválido");
    }
  }
  const debouncedCep = debounce(getEndereco, 1000);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Cadastro de Fornecedor</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
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
          </div>
          <div className={styles.row}>
            <TextField
              label="CEP"
              id="cep"
              type="number"
              name="cep"
              style={{ maxWidth: "150px" }}
              controllerProps={{ name: "cep", control }}
            />
            <TextField
              label="Logradouro"
              id="logradouro"
              name="logradouro"
              controllerProps={{ name: "logradouro", control }}
            />
          </div>
          <div className={styles.row}>
            <TextField
              label="Bairro"
              id="bairro"
              type="string"
              name="bairro"
              controllerProps={{ name: "bairro", control }}
            />
            <TextField
              label="Complemento"
              id="complemento"
              name="complemento"
              controllerProps={{ name: "complemento", control }}
            />
          </div>
          <div className={styles.row}>
            <TextField
              label="Cidade"
              id="cidade"
              style={{ width: "80%" }}
              name="cidade"
              controllerProps={{ name: "cidade", control }}
            />
            <TextField
              label="Estado"
              id="estado"
              name="estado"
              style={{ minWidth: "80px", maxWidth: "20%" }}
              controllerProps={{ name: "estado", control }}
            />
          </div>
          <div className={styles.row}>
            <TextField
              label="Telefone"
              id="telefone"
              name="telefone"
              controllerProps={{ name: "telefone", control }}
            />
            <TextField
              label="Email"
              id="email"
              type="email"
              name="email"
              controllerProps={{ name: "email", control }}
            />
          </div>
          <CustomButton
            type="submit"
            label={"Cadastrar Fornecedor"}
            style={{ marginTop: "16px", maxWidth: "500px", width: "100%" }}
          />
        </form>
      </div>
    </div>
  );
};

export default Fornecedores;
