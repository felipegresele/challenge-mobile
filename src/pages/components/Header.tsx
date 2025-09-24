import { useNavigate } from "react-router-dom"
import styles from "../styles/Header.module.css"

export function Header() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username")
        ? JSON.parse(localStorage.getItem("username")!) : null;

    const handleLogout = () => {
        localStorage.removeItem("username");
        navigate("/");
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Mottu - Painel</h1>
            <div>
                <span>Olá, {username}</span>
                <button onClick={handleLogout}>Sair</button>
            </div>
        </header>
    )

}