import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { login } from "../../../firebase/Services/authService";
import CustomButton from "../../components/CustomButton/CustomButton";
import TextField from "../../components/TextField.tsx/TextField";
import styles from "./LoginPage.module.css";
import { loginSchema } from "./Schema";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { control: controlLogin, handleSubmit: handleSubmitLogin } = useForm<{
    emailLogin: string;
    passwordLogin: string;
  }>({
    resolver: zodResolver(loginSchema),
  });
  const { setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: {
    emailLogin: string;
    passwordLogin: string;
  }) => {
    try {
      const res = await login(data.emailLogin, data.passwordLogin);
      res?.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
      navigate("/");
    } catch (error) {
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
              <form onSubmit={handleSubmitLogin(handleLogin)}>
                <h2>Bem vindo de volta!</h2>
                <TextField
                  label="Email"
                  name="emailLogin"
                  id="emailLogin"
                  type="email"
                  controllerProps={{
                    control: controlLogin,
                    name: "emailLogin",
                    defaultValue: "",
                  }}
                />
                <TextField
                  label="Senha"
                  type="password"
                  name="passwordLogin"
                  id="passwordLogin"
                  controllerProps={{
                    control: controlLogin,
                    name: "passwordLogin",
                    defaultValue: "",
                  }}
                />
                <div className={styles.operations}>
                  <CustomButton
                    label={"Entrar"}
                    type="submit"
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      marginTop: "16px",
                    }}
                  />
                  <CustomButton
                    label={"Criar Conta"}
                    onClick={() =>
                      navigate("/signup", { state: { isAdmin: false } })
                    }
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

export default LoginPage;
