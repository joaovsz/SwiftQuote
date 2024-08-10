import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { register } from "../../../firebase/Services/authService";
import CustomButton from "../../components/CustomButton/CustomButton";
import TextField from "../../components/TextField.tsx/TextField";
import { signupSchema } from "../LoginPage/Schema";
import styles from "../LoginPage/LoginPage.module.css";
import { toast } from "react-toastify";

const SignupPage = () => {
  const {
    control: controlSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors },
  } = useForm<{
    emailSignup: string;
    emailSignup2: string;
    passwordSignup: string;
    passwordSignup2: string;
  }>({
    mode: "all",
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();
  const handleCreateAccount = async (data: {
    emailSignup: string;
    emailSignup2: string;
    passwordSignup: string;
    passwordSignup2: string;
  }) => {
    console.log("teste");
    try {
      await register(data.emailSignup, data.passwordSignup);
      toast.success("Conta criada com sucesso!");
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
              <form onSubmit={handleSubmitSignup(handleCreateAccount)}>
                <h2>Crie sua conta!</h2>
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
