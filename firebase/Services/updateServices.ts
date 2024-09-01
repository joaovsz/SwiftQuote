import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.ts";
import {
    Usuario,
    Cotacao,
    Fornecedor,
    Contato,
    Produto,
    Requisicao,
} from "../../src/models/Entidades.ts";
  
export const updateRequisicao = async (
  id: string,
  requisicao: Partial<Requisicao>
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const requisicaoDocRef = doc(db, "requisicoes", id);

    await updateDoc(requisicaoDocRef, requisicao);

    return {
      success: true,
      message: "Requisição atualizada com sucesso",
    };
  } catch (error) {
    console.error("Erro ao atualizar requisição:", error);
    return {
      success: false,
      message: "Erro ao atualizar requisição",
    };
  }
};
