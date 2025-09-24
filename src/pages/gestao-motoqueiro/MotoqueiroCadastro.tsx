import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "../styles/entitis/CadastroMotoqueiro.module.css"

interface MotoqueiroForm {
    nomeCompleto: string;
    cpf: string;
    telefone: string;
    ativo: boolean;
}

export function MotoqueiroCadastro() {

    const [mensagem, setMensagem] = useState("")

    const { control, reset, handleSubmit } = useForm<MotoqueiroForm>({
        defaultValues: {
            nomeCompleto: "",
            cpf: "",
            telefone: "",
            ativo: false,
        }
    })

    const onSubmit = async (data: MotoqueiroForm) => {
        try {
            const response = await fetch("http://localhost:8080/motoqueiros/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                setMensagem("Motoqueiro cadastrado com sucesso")
                reset()
            }
            else {
                setMensagem("Erro os dados são inválidos")
            }
        } catch (error) {
            console.log(error)
            setMensagem("Erro na conexão com o servidor")
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h1 className={styles.title}>Cadastro de Motoqueiro</h1>
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
                        <div className={styles.inputGroup}>
                            <label>Nome Completo</label>
                            <input
                                {...field}
                                type="text"
                                placeholder="Digite o nome do motoqueiro"
                                className={styles.input}
                            />
                            {fieldState?.error?.message && <p className="error-message">{fieldState.error.message}</p>}
                        </div>
                    )}
                />

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
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>CPF</label>
                            <input
                                {...field}
                                type="text"
                                maxLength={11}
                                name="cpf"
                                placeholder="Digite o endereço do motoqueiro"
                                required
                                className={styles.input}
                            />
                            {fieldState?.error?.message && <p className="error-message">{fieldState.error.message}</p>}
                        </div>
                    )}
                />

                <Controller
                    name="telefone"
                    control={control}
                    rules={{
                        required: "O telefone é obrigátorio",
                        maxLength: {
                            value: 15,
                            message: "Telefone pode ter no maxímo 15 caracteres"
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <div className={styles.inputGroup}>
                            <label>Telefone</label>
                            <input
                                {...field}
                                maxLength={15}
                                type="number"
                                placeholder="Digite o número de telefone"
                                className={styles.input}
                            />
                            {fieldState?.error?.message && <p className="error-message">{fieldState.error.message}</p>}
                        </div>
                    )}
                />

                <Controller
                    name="ativo"
                    control={control}
                    rules={{
                        required: "Este campo é obrigatório",
                    }}
                    render={({ field, fieldState }) => (
                        <div className={styles.inputGroup}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={field.value || false}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    className={styles.input}
                                />
                                Ativo
                            </label>

                            {fieldState?.error?.message && (
                                <p className="error-message">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
                <button type="submit" className={styles.button}>Cadastrar</button>
                {mensagem && <p className={styles.success}>{mensagem}</p>}
            </form>
        </div>
    )
}