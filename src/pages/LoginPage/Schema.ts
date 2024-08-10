import { z } from "zod";
export const signupSchema = z
  .object({
    emailSignup: z
      .string()
      .email("Email inválido")
      .min(6, "Email é obrigatório"),
    emailSignup2: z
      .string()
      .email("Email inválido")
      .min(6, "Digite novamente o email"),
    passwordSignup: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
    passwordSignup2: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.emailSignup !== data.emailSignup2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["emailSignup2"],
        message: "Os emails não coincidem",
      });
    }
    if (data.passwordSignup !== data.passwordSignup2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordSignup2"],
        message: "As senhas não coincidem",
      });
    }
  });

export const loginSchema = z.object({
  emailLogin: z.string().email({ message: "Email inválido" }),
  passwordLogin: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});
