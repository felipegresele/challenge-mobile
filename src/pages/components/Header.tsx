import { useNavigate } from "react-router-dom"
import styles from "../styles/Header.module.css"
import { LogOut } from "lucide-react";

export function Header() {

    const navigate = useNavigate();

    const username = localStorage.getItem("nomeUsuario");

    const handleLogout = () => {
        localStorage.removeItem("nomeUsuario");
        navigate("/");
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Mottu - Painel</h1>
            <div className={styles.userSection}>
                <span>Olá, {username}</span>
                <button onClick={handleLogout}><LogOut /> Sair</button>
            </div>
        </header>
    )

}