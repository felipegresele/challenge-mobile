import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/entitis/ListaGlobalStyle.module.css";
import { Pencil, Trash } from "lucide-react";

interface GalpaoResponse {
    id: number;
    nome: string;
    endereco: string;
    capacidade: number;
}

export function ListaGalpao() {
    const [lista, setLista] = useState<GalpaoResponse[]>([]);

    const navigate = useNavigate()

    const listaGalpoes = async () => {
        try {
            const response = await fetch("http://localhost:8080/galpoes/listar", {
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
        listaGalpoes();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.headerContent}>
                <h1 className={styles.title}>Lista de Galpões</h1>
                <div className={styles.btnContent}>
                    <Link to="/dashboard" className={styles.backLink}>
                        Voltar para dashboard
                    </Link>
                    <Link to="/cadastrar-galpao" className={styles.backLink}>
                        Adicionar Galpão
                    </Link>
                </div>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Capacidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((galpao, index) => (
                        <tr key={index}>
                            <td>{galpao.id}</td>
                            <td>{galpao.nome}</td>
                            <td>{galpao.endereco}</td>
                            <td>{galpao.capacidade}</td>
                            <td style={{ display: "flex", gap: 10 }}>
                                <BotaoExcluirGalpao galpaoID={galpao.id} onSuccess={listaGalpoes} />
                                <Pencil
                                    size={20}
                                    color="white"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate("/editar-galpao", { state: { galpao } })}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function BotaoExcluirGalpao(props: { galpaoID: number, onSuccess: () => void }) {

    const [modal, setModal] = useState(false)
    const [mensagem, setMensagem] = useState("")

    const onSubmit = async () => {

        try {
            const response = await fetch(`http://localhost:8080/galpoes/${props.galpaoID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(props.galpaoID)
            })
            if (response.ok) {
                setMensagem("Galpão deletado com sucesso!")
                props.onSuccess()
            }
            else {
                setMensagem("Erro ao excluir galpão")
            }
        } catch (error) {
            console.log(error);
            setMensagem("Erro na conexão com o servidor")
        }

    }

    return (
        <div>
            <Trash size={20} onClick={() => setModal(true)} color="red" />

            {modal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Tem certeza?</h2>
                        <p>Deseja realmente excluir este galpão?</p>
                        <div className={styles.modalButtons}>
                            <button onClick={onSubmit} className={styles.confirmBtn}>
                                Sim
                            </button>
                            <button onClick={() => setModal(false)} className={styles.cancelBtn}>
                                Cancelar
                            </button>
                        </div>
                        <p>{mensagem}</p>
                    </div>
                </div>
            )}
        </div>
    )

}
