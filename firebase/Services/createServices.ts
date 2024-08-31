import { setDoc, doc, WithFieldValue, DocumentData } from "firebase/firestore";
import { db } from "../firebaseConfig.ts";
import { v4 } from "uuid";
import {
  Usuario,
  Cotacao,
  Fornecedor,
  Contato,
  Produto,
} from "../../src/models/Entidades.ts";

const addDocumentToCollection = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  id: string,
  data: T
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    await setDoc(doc(db, collectionName, id), data);
    return {
      success: true,
      message: `${collectionName.slice(0, -1)} adicionado com sucesso`,
    }; // Return success
  } catch (error) {
    return {
      success: false,
      message: `Erro ao adicionar ${collectionName.slice(0, -1)}`,
    };
  }
};

export const addUsuario = async (
  usuario: Usuario
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const result = await addDocumentToCollection<Usuario>(
      "usuarios",
      usuario.id,
      usuario
    );
    console.log(result.message);
    return result;
  } catch (error) {
    console.error("Erro ao adicionar usuario:", error);
    throw new Error("Erro ao adicionar usuario");
  }
};

export const addCotacao = async (
  cotacao: Cotacao
): Promise<{
  success: boolean;
  message: string;
}> => {
  const myuuid = v4();

  try {
    const result = await addDocumentToCollection<Cotacao>(
      "cotacoes",
      myuuid.toString(),
      cotacao
    );
    console.log(result.message);
    return result;
  } catch (error) {
    console.error("Erro ao adicionar cotacao:", error);
    throw new Error("Erro ao adicionar cotacao");
  }
};

export const addFornecedor = async (
  fornecedor: Fornecedor
): Promise<{
  success: boolean;
  message: string;
}> => {
  const myuuid = v4();
  try {
    const result = await addDocumentToCollection<Fornecedor>(
      "fornecedores",
      myuuid.toString(),
      fornecedor
    );
    console.log(result.message);
    return result;
  } catch (error) {
    console.error("Erro ao adicionar fornecedor:", error);
    throw new Error("Erro ao adicionar fornecedor");
  }
};

export const addContato = async (
  contato: Contato
): Promise<{
  success: boolean;
  message: string;
}> => {
  const myuuid = v4();
  try {
    const result = await addDocumentToCollection<Contato>(
      "contatos",
      myuuid.toString(),
      contato
    );
    console.log(result.message);
    return result;
  } catch (error) {
    console.error("Erro ao adicionar contato:", error);
    throw new Error("Erro ao adicionar contato");
  }
};

export const addProduto = async (
  produto: Produto
): Promise<{
  success: boolean;
  message: string;
}> => {
  const myuuid = v4();
  try {
    const result = await addDocumentToCollection<Produto>(
      "produtos",
      myuuid.toString(),
      produto
    );
    console.log(result.message);
    return result;
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    throw new Error("Erro ao adicionar produto");
  }
};
