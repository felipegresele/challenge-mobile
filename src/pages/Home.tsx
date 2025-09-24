import { useNavigate } from "react-router-dom";
import styles from "./styles/Home.module.css"; 

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo ao Mottu</h1>
      <p className={styles.subtitle}>Escolha uma opção para continuar</p>

      <div className={styles.buttons}>
        <button
          className={styles.loginBtn}
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className={styles.cadastroBtn}
          onClick={() => navigate("/cadastro")}
        >
          Cadastro
        </button>
      </div>
    </div>
  );
}