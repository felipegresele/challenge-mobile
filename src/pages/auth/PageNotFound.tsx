import { Link } from "react-router-dom";
import styles from "../styles/PageNotFound.module.css"

export function PageNotFound() {
    return (
        <div className={styles.container}>
            <h1>Ops!</h1>
            <p>Essa página não existe</p>
            <Link to="/dashboard">Voltar para dashboard</Link>
        </div>
    )
}