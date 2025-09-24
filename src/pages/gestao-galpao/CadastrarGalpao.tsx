import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "../styles/entitis/CadastroGalpao.module.css"
import { Link } from "react-router-dom";

interface GalpaoForm {
    nome: string;
    endereco: string;
    capacidade: number;
}

export function GalpaoCadastro() {

    const { control, reset, handleSubmit } = useForm<GalpaoForm>({
        defaultValues: {
            nome: "",
            endereco: "",
            capacidade: 0,
        }
    })

    const [mensagem, setMensagem] = useState("")

    const onSubmit = async (data: GalpaoForm) => {
        try {
            const response = await fetch("http://localhost:8080/galpoes/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                setMensagem("Galpão salvo com sucesso!")
                reset()
            }
        } catch (error) {
            console.log("Erro na requisição: ", error)
        }
    }

    return (

        <div className={styles.container}>
            <Link to="/dashboard" className={styles.backLink}>
                Voltar para dashboard
            </Link>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h1 className={styles.title}>Cadastro de Galpão</h1>
                <Controller
                    name="nome"
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
                            <label className={styles.label}>Nome</label>
                            <input
                                {...field}
                                type="text"
                                placeholder="Digite o nome do galpão"
                                className={styles.input}
                            />
                            {fieldState?.error?.message && <p className={styles.errorMessage}>{fieldState.error.message}</p>}
                        </div>
                    )}
                />

                <Controller
                    name="endereco"
                    control={control}
                    rules={{
                        required: "O endereço é obrigatório",
                    }}
                    render={({ field, fieldState }) => (
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Endereço</label>
                            <input
                                {...field}
                                type="text"
                                name="adress"
                                placeholder="Digite o endereço do galpão"
                                required
                                className={styles.input}
                            />
                            {fieldState?.error?.message && <p className={styles.errorMessage}>{fieldState.error.message}</p>}
                        </div>
                    )}
                />

                <Controller
                    name="capacidade"
                    control={control}
                    rules={{
                        required: "A capacidade é obrigátoria",
                    }}
                    render={({ field, fieldState }) => (
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Capacidade</label>
                            <input
                                {...field}
                                type="number"
                                placeholder="Digite o número da capacidaede"
                                className={styles.input}
                            />
                            {fieldState?.error?.message && <p className={styles.errorMessage}>{fieldState.error.message}</p>}
                        </div>
                    )}
                />
                <button type="submit" className={styles.button}>Cadastrar</button>
                {mensagem && <p className={styles.success}>{mensagem}</p>}
            </form>
        </div>

    )
}