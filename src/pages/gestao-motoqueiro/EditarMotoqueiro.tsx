import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/entitis/EditarMotoqueiro.module.css"

interface MotoqueiroForm {
    id: number;
    nomeCompleto: string;
    cpf: string;
    telefone: string;
    ativo: boolean;
}

export function EditarMotoqueiro() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const motoqueiro = state.motoqueiro as MotoqueiroForm;

    const { control, handleSubmit, reset } = useForm<MotoqueiroForm>({
        defaultValues: motoqueiro
    });

    const onSubmit = async (data: MotoqueiroForm) => {
        try {
            const response = await fetch(`http://localhost:8080/motoqueiros/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert("Motoqueiro atualizado com sucesso!");
                reset();
                navigate("/listar-motoqueiros");
            } else {
                alert("Erro ao atualizar motoqueiro");
            }
        } catch (error) {
            console.log("Erro:", error);
        }
    };

    return (
        <div className={styles.container}>
            <Link to="/listar-motoqueiros" className={styles.backLink}>
                Voltar para lista
            </Link>
            <h1 className={styles.title}>Editar Motoqueiro</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <div className={styles.inputGroup}>
                    <Controller
                        name="nomeCompleto"
                        control={control}
                        rules={{
                            required: "O nome é obrigatório",
                            minLength: {
                                value: 4,
                                message: "O nome deve ter no mínimo 4 caracteres"
                            }
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <label className={styles.label}>Nome Completo</label>
                                <input {...field} placeholder="Nome Completo" className={styles.input} />
                                {fieldState?.error?.message && (
                                <p className={styles.errorMessage}>{fieldState.error.message}</p>
                            )}
                            </>

                        )}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <Controller
                        name="cpf"
                        control={control}
                        rules={{
                            required: "O CPF é obrigatório",
                            minLength: {
                                value: 11,
                                message: "CPF deve ter 11 digitos"
                            },
                            maxLength: {
                                value: 11,
                                message: "CPF deve ter 11 digitos"
                            },
                            pattern: { value: /^[0-9]*$/, message: "Digite apenas números" },
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <label className={styles.label}>CPF</label>
                                <input {...field} placeholder="CPF" maxLength={11} className={styles.input} />
                                {fieldState?.error?.message && (
                                <p className={styles.errorMessage}>{fieldState.error.message}</p>
                            )}
                            </>

                        )}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <Controller
                        name="telefone"
                        control={control}
                        rules={{
                            required: "O telefone é obrigátorio",
                            maxLength: {
                                value: 15,
                                message: "Telefone pode ter no maxímo 15 caracteres"
                            },
                            pattern: { value: /^[0-9]*$/, message: "Digite apenas números" },
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <label className={styles.label}>Telefone</label>
                                <input {...field} type="string" maxLength={15} placeholder="Telefone" className={styles.input} />
                                {fieldState?.error?.message && (
                                <p className={styles.errorMessage}>{fieldState.error.message}</p>
                            )}
                            </>

                        )}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <Controller
                        name="ativo"
                        control={control}
                        render={({ field }) => (
                            <label>
                                <input
                                    type="checkbox"
                                    checked={field.value || false}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    className={styles.input} />
                                Ativo</label>

                        )}
                    />
                </div>

                <button type="submit" className={styles.button}>Salvar</button>
            </form>
        </div>
    );
}