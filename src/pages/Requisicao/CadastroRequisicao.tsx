import { useForm } from "react-hook-form";
import styles from "./Requisicao.module.css";
import { Produto, Requisicao } from "../../models/Entidades";
import CustomButton from "../../components/CustomButton/CustomButton";
import Select from "../../components/Select/Select";
import TextField from "../../components/TextField.tsx/TextField";
import { useEffect, useState } from "react";
import { fetchProdutos } from "../../../firebase/Services/fetchServices";
interface Options {
  name: string;
  value: string | number;
}

interface CadastroRequisicaoProps {
  isOpen: boolean;
  onClose: () => void;
}

function CadastroRequisicao() {
  const { control, handleSubmit } = useForm<Requisicao>();
  const [isLoading, setIsLoading] = useState(false);

  const [produtos, setProdutos] = useState<Options[]>([]);
  useEffect(() => {
    fetchProdutos().then((produtos) => {
      setProdutos(
        produtos.map((produto) => ({
          name: produto.descricao,
          value: produto.id,
        }))
      );
    });
  }, []);

  function onSubmit(data: Requisicao) {
    console.log(data);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Nova Requisição</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
            <Select
              options={produtos}
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
              label="Título"
              name="titulo"
              id="titulo"
              controllerProps={{
                control,
                name: "titulo",
                defaultValue: "",
              }}
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
          <CustomButton
            style={{ marginTop: "16px" }}
            label="Cadastrar"
            type="submit"
          />{" "}
        </form>
      </div>
    </div>
  );
}

export default CadastroRequisicao;
