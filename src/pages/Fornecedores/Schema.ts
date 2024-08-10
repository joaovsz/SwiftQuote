import { z } from "zod";

const fornecedorSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cnpj: z
    .string()
    .min(14, "CNPJ deve ter 14 caracteres")
    .max(14, "CNPJ deve ter 14 caracteres"),
  cep: z
    .string()
    .min(8, "CEP deve ter 8 caracteres")
    .max(8, "CEP deve ter 8 caracteres"),
  logradouro: z.string().min(1, "Logradouro é obrigatório"),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  complemento: z.string().optional(),
  cidade: z.string().min(1, "Cidade é obrigatório"),
  estado: z
    .string()
    .min(2, "Estado deve ter 2 caracteres")
    .max(2, "Estado deve ter 2 caracteres"),
  telefone: z.string().min(10, "Telefone deve ter ao menos 10 caracteres"),
  email: z.string().email("Email inválido"),
  // contatos: z.array(contatoSchema).optional(), // Adicione um schema para Contato se necessário
});

export { fornecedorSchema };
