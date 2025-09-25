import { useNavigate } from "react-router-dom";
import styles from "./styles/MenuDashboard.module.css";
import { Warehouse, Bike, LogOut } from "lucide-react";
import { Header } from "./components/Header";
import { useEffect } from "react";

function MenuDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const nome = localStorage.getItem("nomeUsuario")

    if (!nome) {
      navigate("/", {replace: true}); //evitar voltar com o btn de voltar
    }
  }, [navigate])

  return (
    <div className={styles.container}>

      <Header />

      {/* Grid de opções */}
      <div className={styles.grid}>
        {/* Galpão */}
        <div
          className={styles.card}
          onClick={() => navigate("/listar-galpoes")}
        >
          <Warehouse className={styles.icon} />
          <h2 className={styles.cardTitle}>Ver Galpões</h2>
          <p className={styles.cardDesc}>
            Lista de galpões do sistema.
          </p>
        </div>

        {/* Motoqueiro */}
        <div
          className={styles.card}
          onClick={() => navigate("/listar-motoqueiros")}
        >
          <Bike className={styles.icon} />
          <h2 className={styles.cardTitle}>Ver Motoqueiro</h2>
          <p className={styles.cardDesc}>
            Lista de motoqueiros do sistema.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MenuDashboard;
