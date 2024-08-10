export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  dataCriacao: Date;
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
}
export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  precoUnitario: number;
  quantidade: number;
  cotacaoId?: number;
}
