import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.ts";
import {
  Usuario,
  Cotacao,
  Fornecedor,
  Contato,
  Produto,
} from "../../src/models/Entidades.ts";

const fetchCollection = async <T>(collectionName: string): Promise<T[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => doc.data() as T);
  } catch (e) {
    console.error(`Erro ao buscar documentos de ${collectionName}: `, e);
    return [];
  }
};

export const fetchUsuarios = async (): Promise<Usuario[]> => {
  return fetchCollection<Usuario>("usuarios");
};

export const fetchCotacoes = async (): Promise<Cotacao[]> => {
  return fetchCollection<Cotacao>("cotacoes");
};

export const fetchFornecedores = async (): Promise<Fornecedor[]> => {
  return fetchCollection<Fornecedor>("fornecedores");
};

export const fetchContatos = async (): Promise<Contato[]> => {
  return fetchCollection<Contato>("contatos");
};

export const fetchProdutos = async (): Promise<Produto[]> => {
  return fetchCollection<Produto>("produtos");
};
