import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig.ts";
import {
  Usuario,
  Cotacao,
  Fornecedor,
  Contato,
  Produto,
  Requisicao,
} from "../../src/models/Entidades.ts";

const fetchCollection = async <T>(collectionName: string): Promise<T[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as T)
    );
  } catch (e) {
    console.error(`Erro ao buscar documentos de ${collectionName}: `, e);
    return [];
  }
};

export const fetchUsuarios = async (): Promise<Usuario[]> => {
  return await fetchCollection<Usuario>("usuarios");
};

export const fetchCotacoes = async (): Promise<Cotacao[]> => {
  return await fetchCollection<Cotacao>("cotacoes");
};
export const fetchRequisicoes = async (): Promise<Requisicao[]> => {
  return await fetchCollection<Requisicao>("requisicoes");
};
export const fetchFornecedores = async (): Promise<Fornecedor[]> => {
  return await fetchCollection<Fornecedor>("fornecedores");
};

export const fetchContatos = async (): Promise<Contato[]> => {
  return await fetchCollection<Contato>("contatos");
};

export const fetchProdutos = async (): Promise<Produto[]> => {
  return await fetchCollection<Produto>("produtos");
};
export const fetchColaboradores = async (): Promise<Usuario[]> => {
  return await fetchCollection<Usuario>("usuarios");
};
export const blockUser = async (
  userId: string,
  blockStatus: boolean
): Promise<void> => {
  try {
    return await updateDoc(doc(db, "usuarios", userId), {
      blocked: blockStatus,
    });
  } catch (e) {
    console.error("Erro ao bloquear usuário: ", e);
  }
};
export const excludeReq = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "requisicoes", id));
  } catch (e) {
    console.error("Erro ao excluir requisição: ", e);
  }
};
export const updateReqCount = async (
  id: string,
  count: number
): Promise<void> => {
  try {
    console.log(count);
    await updateDoc(doc(db, "requisicoes", id), {
      countCotacoes: count,
      status:
        count === 1 || count == 2
          ? "Em cotação"
          : count >= 3
          ? "Cotada"
          : "Cotada",
    });
  } catch (e) {
    console.error("Erro ao atualizar contagem de cotações: ", e);
  }
};
export const getCotacoesPorProduto = async (
  produtoId: number
): Promise<Cotacao[]> => {
  try {
    const q = query(
      collection(db, "cotacoes"),
      where("produtos.id", "==", produtoId)
    );
    const querySnapshot = await getDocs(q);
    const cotacoes: Cotacao[] = [];
    querySnapshot.forEach((doc) => {
      cotacoes.push(doc.data() as Cotacao);
    });
    return cotacoes;
  } catch (error) {
    console.error("Erro ao consultar cotações: ", error);
    return [];
  }
};
