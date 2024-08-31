import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { login, register } from "../../../firebase/Services/authService";
import CustomButton from "../../components/CustomButton/CustomButton";
import TextField from "../../components/TextField.tsx/TextField";
import { signupSchema } from "../LoginPage/Schema";
import styles from "../LoginPage/LoginPage.module.css";
import { toast } from "react-toastify";
import { useState } from "react";

const SignupPage = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { control: controlSignup, handleSubmit: handleSubmitSignup } = useForm<{
    nomeDeUsuario: string;
    emailSignup: string;
    emailSignup2: string;
    passwordSignup: string;
    passwordSignup2: string;
    phoneNumber: string;
  }>({
    mode: "all",
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();
  const handleCreateAccount = async (data: {
    nomeDeUsuario: string;
    emailSignup: string;
    emailSignup2: string;
    passwordSignup: string;
    passwordSignup2: string;
    phoneNumber: string;
  }) => {
    console.log("teste");
    setIsLoading(true);
    try {
      await register(data.emailSignup, data.passwordSignup, {
        nome: data.nomeDeUsuario,
        telefone: data.phoneNumber,
        role: location.state.isAdmin ? "admin" : "common",
      });
      setIsLoading(false);

      toast.success("Conta criada com sucesso!");
    } catch (error) {
      setIsLoading(false);

      toast.error((error as Error).message);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <img src="src\assets\SLogo.png" alt="logo" height={100} />
          <div className={styles.logoContainer}>
            <span className={styles.logo}>SwiftQuote</span>
            <span className={styles.slogan}>
              Seu sistema de cotações inteligentes
            </span>
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.card}>
            {
              <form onSubmit={handleSubmitSignup(handleCreateAccount)}>
                <h2>Crie sua conta de colaborador!</h2>
                <div className={styles.row}>
                  <TextField
                    label="Nome de usuário"
                    name="emailSignup"
                    id="emailSignup"
                    type="string"
                    controllerProps={{
                      control: controlSignup,
                      name: "nomeDeUsuario",
                      defaultValue: "",
                    }}
                  />
                  <TextField
                    label="Telefone"
                    name="telefone"
                    id="telefone"
                    type="string"
                    controllerProps={{
                      control: controlSignup,
                      name: "phoneNumber",
                      defaultValue: "",
                    }}
                  />
                </div>
                <div className={styles.row}>
                  <TextField
                    label="Digite seu email"
                    name="emailSignup"
                    id="emailSignup"
                    type="email"
                    controllerProps={{
                      control: controlSignup,
                      name: "emailSignup",
                      defaultValue: "",
                    }}
                  />
                  <TextField
                    label="Digite novamente"
                    name="emailSignup2"
                    id="emailSignup2"
                    type="email"
                    controllerProps={{
                      control: controlSignup,
                      name: "emailSignup2",
                      defaultValue: "",
                    }}
                  />
                </div>

                <TextField
                  label="Crie uma senha"
                  type="password"
                  name="passwordSignup"
                  id="passwordSignup"
                  controllerProps={{
                    control: controlSignup,
                    name: "passwordSignup",
                    defaultValue: "",
                  }}
                />
                <TextField
                  label="Confirme a senha"
                  type="password"
                  name="passwordSignup2"
                  id="passwordSignup2"
                  controllerProps={{
                    control: controlSignup,
                    name: "passwordSignup2",
                    defaultValue: "",
                  }}
                />

                <div className={styles.operations}>
                  <CustomButton
                    label={"Entrar"}
                    onClick={() => navigate("/login")}
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      marginTop: "16px",
                    }}
                  />
                  <CustomButton
                    label={"Criar Conta"}
                    type="submit"
                    isLoading={isLoading}
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      color: "white",
                      marginTop: "16px",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              </form>
            }
          </div>
        </div>
      </div>
      <div className={styles.background}></div>
    </>
  );
};

export default SignupPage;
