export interface Usuario {
  id: string;
  nome: string;
  dataCriacao: Date;
  telefone?: string;
  role: "admin" | "common";
}
export interface Requisicao {
  id: string;
  dataCriacao: Date;
  titulo: string;
  cotacoes: number;
  status: string;
  usuarioId: string;
  idProduto: string;
}
export interface Cotacao {
  dataCriacao: Date;
  dataValidade: Date;
  status: string;
  total: number;
  observacoes: string;
  usuarioId: number;
  fornecedorId: number;
  produtos: Produto[];
}

export interface Fornecedor {
  nome: string;
  cnpj: string;
  cep: string;
  logradouro: string;
  bairro: string;
  complemento: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  // contatos: Contato[];
}
export interface Contato {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  cargo: string;
  fornecedorId: number;
  fornecedorName?: string;
}
export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  precoUnitario: number;
  cotacaoId?: number;
}
