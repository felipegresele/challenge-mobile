import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import styles from "../styles/entitis/EditarGalpao.module.css";

interface GalpaoForm {
    id: number;
    nome: string;
    endereco: string;
    capacidade: number;
}

export function EditarGalpao() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const galpao = state.galpao as GalpaoForm;

    const { control, handleSubmit, reset } = useForm<GalpaoForm>({
        defaultValues: galpao
    });

    const onSubmit = async (data: GalpaoForm) => {
        try {
            const response = await fetch(`http://localhost:8080/galpoes/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert("Galpão atualizado com sucesso!");
                reset();
                navigate("/listar-galpoes"); 
            } else {
                alert("Erro ao atualizar galpão");
            }
        } catch (error) {
            console.log("Erro:", error);
        }
    };

    return (
        <div className={styles.container}>
            <Link to="/listar-galpoes" className={styles.backLink}>
                Voltar para dashboard
            </Link>
            <h1 className={styles.title}>Editar Galpão</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <div className={styles.inputGroup}>
                    <Controller
                        name="nome"
                        control={control}
                        render={({ field }) => (
                            <input {...field} placeholder="Nome" className={styles.input} />
                        )}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <Controller
                        name="endereco"
                        control={control}
                        render={({ field }) => (
                            <input {...field} placeholder="Endereço" className={styles.input} />
                        )}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <Controller
                        name="capacidade"
                        control={control}
                        render={({ field }) => (
                            <input {...field} type="number" placeholder="Capacidade" className={styles.input} />
                        )}
                    />
                </div>

                <button type="submit" className={styles.button}>Salvar</button>
            </form>
        </div>
    );
}
