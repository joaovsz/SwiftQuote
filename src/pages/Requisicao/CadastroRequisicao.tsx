import { useForm } from "react-hook-form";
import styles from "./Requisicao.module.css";
import { Produto, Requisicao } from "../../models/Entidades";
import CustomButton from "../../components/CustomButton/CustomButton";
import Select from "../../components/Select/Select";
import TextField from "../../components/TextField.tsx/TextField";
import { useEffect, useState } from "react";
import { fetchProdutos } from "../../../firebase/Services/fetchServices";
import { addRequisicao } from "../../../firebase/Services/createServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
interface Options {
  name: string;
  value: string | number;
}

interface CadastroRequisicaoProps {
  isOpen: boolean;
  onClose: () => void;
}

function CadastroRequisicao() {
  const { control, handleSubmit, getValues } = useForm<Requisicao>();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Options[]>([]);

  useEffect(() => {
    fetchProdutos().then((produtos) => {
      console.log(produtos);
      setProdutos(
        produtos.map((produto) => ({
          name: produto.descricao,
          value: produto.id,
        }))
      );
    });
  }, []);

  async function onSubmit(data: Requisicao) {
    setIsLoading(true);
    try {
      const produto = produtos.find((p) => p.value === data.idProduto);
      await addRequisicao({
        ...data,
        usuarioId: user?.uid!,
        usuarioName: user?.displayName!,
        produtoName: produto?.name,
        dataCriacao: new Date(),
        cotacoes: "",
        status: "Aberta",
      });
      toast.success("Requisição cadastrada com sucesso!");
      setIsLoading(false);
      navigate(-1);
    } catch (error) {
      setIsLoading(false);
      toast.error((error as Error).message);
    }
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
              name="idProduto"
              id="idProduto"
              controllerProps={{
                control,
                name: "idProduto",
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
            isLoading={isLoading}
          />{" "}
        </form>
      </div>
    </div>
  );
}

export default CadastroRequisicao;
