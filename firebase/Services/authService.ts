import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
export const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      throw new Error("Usuário não encontrado.");
    } else if (error.code === "auth/invalid-credential") {
      throw new Error("Senha incorreta.");
    } else if (error.code === "auth/too-many-requests") {
      throw new Error(
        "Muitas tentativas de login. Tente novamente mais tarde."
      );
    } else {
      throw new Error("Erro ao fazer login. Tente novamente.");
    }
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const register = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Este email já está em uso. Por favor, use outro email.");
    } else {
      throw new Error(error.message);
    }
  }
};
