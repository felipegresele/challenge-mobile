import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/entitis/ListaGlobalStyle.module.css";
import { Pencil, Trash } from "lucide-react";

interface MotoqueiroResponse {
    id: number;
    nomeCompleto: string;
    cpf: string;
    telefone: number;
    ativo: boolean;
}

export function ListaMotoqueiro() {
    const [lista, setLista] = useState<MotoqueiroResponse[]>([]);

    const navigate = useNavigate();

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
            <div className={styles.headerContent}>
                <h1 className={styles.title}>Lista de Motoqueiros</h1>
                <div className={styles.btnContent}>
                    <Link to="/dashboard" className={styles.backLink}>
                        Voltar para dashboard
                    </Link>
                    <Link to="/cadastrar-motoqueiro" className={styles.backLink}>
                        Adicionar Motoqueiro
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
                            <td>
                                <div style={{ display: "flex", gap: 10 }}>
                                    <BotaoExcluirMotoqueiro
                                        motoqueiroID={motoqueiro.id}
                                        onSuccess={listaMotoqueiros} />
                                    <Pencil
                                        size={20}
                                        color="white"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate("/editar-motoqueiro", { state: { motoqueiro } })}
                                    />
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function BotaoExcluirMotoqueiro(props: { motoqueiroID: number, onSuccess: () => void }) {

    const [mensagem, setMensagem] = useState("")
    const [openModal, setOpenModal] = useState(false)

    const onSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/motoqueiros/${props.motoqueiroID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (response.ok) {
                props.onSuccess();
            }
            else {
                setMensagem("Erro ao excluir");
            }
        } catch (error) {
            console.log(error)
            setMensagem("Erro na conexão ao servidor")
        }
    }

    return (
        <div>
            <div>
                <Trash color="red" size={20} onClick={() => setOpenModal(true)} />
            </div>

            {openModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Tem certeza?</h2>
                        <p>Deseja realmente excluir este motoqueiro?</p>

                        <div className={styles.modalButtons}>
                            <button onClick={onSubmit} className={styles.confirmBtn}>
                                Sim
                            </button>
                            <button onClick={() => setOpenModal(false)} className={styles.cancelBtn}>
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
