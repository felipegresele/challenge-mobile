import { useNavigate } from "react-router-dom";
import styles from "./styles/MenuDashboard.module.css";
import { Warehouse, Bike, LogOut } from "lucide-react";
import { Header } from "./components/Header";

function MenuDashboard() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Mottu - Painel</h1>
      </header>

      {/* Grid de opções */}
      <div className={styles.grid}>
        {/* Galpão */}
        <div
          className={styles.card}
          onClick={() => navigate("/cadastrar-galpao")}
        >
          <Warehouse className={styles.icon} />
          <h2 className={styles.cardTitle}>Cadastrar Galpão</h2>
          <p className={styles.cardDesc}>
            Adicione novos galpões ao sistema.
          </p>
        </div>

        {/* Motoqueiro */}
        <div
          className={styles.card}
          onClick={() => navigate("/cadastrar-motoqueiro")}
        >
          <Bike className={styles.icon} />
          <h2 className={styles.cardTitle}>Cadastrar Motoqueiro</h2>
          <p className={styles.cardDesc}>
            Registre motoqueiros na plataforma.
          </p>
        </div>
      </div>

      {/* Botão Sair */}
      <button onClick={() => navigate("/")} className={styles.logout}>
        <LogOut className={styles.logoutIcon} />
        Sair
      </button>
    </div>
  );
}

export default MenuDashboard;
