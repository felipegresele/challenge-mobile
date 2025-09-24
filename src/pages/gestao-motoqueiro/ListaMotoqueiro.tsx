import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/entitis/ListaGlobalStyle.module.css";

interface MotoqueiroResponse {
    id: string
    nomeCompleto: string;
    cpf: string;
    telefone: number;
    ativo: boolean;
}

export function ListaMotoqueiro() {
    const [lista, setLista] = useState<MotoqueiroResponse[]>([]);

    const listaMotoqueiros = async () => {
        try {
            const response = await fetch("http://localhost:8080/motoqueiros/listar", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                const result = await response.json();
                setLista(result);
            }
        } catch (error) {
            console.log("Erro na requisição");
        }
    };

    useEffect(() => {
        listaMotoqueiros();
    }, []);

    return (
        <div className={styles.container}>
            
            <h1 className={styles.title}>Lista de Motoqueiros</h1>
            <div className={styles.btnContent}>
                <Link to="/dashboard" className={styles.backLink}>
                    Voltar para dashboard
                </Link>
                <Link to="/cadastrar-motoqueiro" className={styles.backLink}>
                    Adicionar Motoqueiro
                </Link>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Capacidade</th>
                        <th>Ativo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((motoqueiro, index) => (
                        <tr key={index}>
                            <td>{motoqueiro.id}</td>
                            <td>{motoqueiro.nomeCompleto}</td>
                            <td>{motoqueiro.cpf}</td>
                            <td>{motoqueiro.telefone}</td>
                            <td>{motoqueiro.ativo === true ? "Sim" : "Não"}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
