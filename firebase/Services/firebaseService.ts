import { setDoc, doc, WithFieldValue, DocumentData } from "firebase/firestore";
import { db } from "../firebaseConfig.ts";
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
): Promise<void> => {
    try {
        await setDoc(doc(db, collectionName, id), data);
        console.log(`${collectionName.slice(0, -1)} adicionado com sucesso`);
    } catch (e) {
        console.error(`Erro ao adicionar ${collectionName.slice(0, -1)}: `, e);
    }
};

export const addUsuario = async (usuario: Usuario): Promise<void> => {
    await addDocumentToCollection<Usuario>('usuarios', usuario.id.toString(), usuario);
};

export const addCotacao = async (cotacao: Cotacao): Promise<void> => {
    await addDocumentToCollection<Cotacao>('cotacoes', cotacao.id.toString(), cotacao);
};

export const addFornecedor = async (fornecedor: Fornecedor): Promise<void> => {
    await addDocumentToCollection<Fornecedor>('fornecedores', fornecedor.id.toString(), fornecedor);
};

export const addContato = async (contato: Contato): Promise<void> => {
    await addDocumentToCollection<Contato>('contatos', contato.id.toString(), contato);
};

export const addProduto = async (produto: Produto): Promise<void> => {
    await addDocumentToCollection<Produto>('produtos', produto.id.toString(), produto);
};