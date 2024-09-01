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
  cotacoes?: string;
  status: string;
  usuarioId: string;
  usuarioName?: string;
  produtoName?: string;
  idProduto: string;
}
export interface Cotacao {
  dataCriacao: Date;
  dataValidade?: Date;
  status: string;
  total: string;
  observacoes: string;
  usuarioId: string;
  fornecedorId: string;
  fornecedorName?: string;
  requisicaoTitulo?: string;
  requisicao: string;
  id: string;
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
  id: string;
  nome: string;
  telefone: string;
  email: string;
  cargo: string;
  fornecedorId: number;
  fornecedorName?: string;
}
export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  precoUnitario: number;
  cotacaoId?: number;
}
