export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  dataCriacao: Date;
}
export interface Cotacao {
  id: number;
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
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
  contatos: Contato[];
}
export interface Contato {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  cargo: string;
  fornecedorId: number;
}
export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  precoUnitario: number;
  quantidade: number;
  cotacaoId?: number;
}
