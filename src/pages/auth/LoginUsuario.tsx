import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "../styles/auth/Login.module.css";

interface LoginForm {
  email: string;
  password: string;
}

export function LoginUsuario() {
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" }
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = response.json();
        localStorage.setItem("username", result.username);
        console.log("deu certo")
        navigate("/dashboard");
      } else {
        setError("Dados inválidos");
      }
    } catch (error) {
      console.log(error);
      setError("Erro na conexão com o servidor");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Login</h1>

        <Controller
          name="email"
          control={control}
          rules={{
            required: "O email é obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Digite um email válido"
            }
          }}
          render={({ field, fieldState }) => (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input {...field} type="email" className={styles.input} />
              {fieldState?.error?.message && (
                <p className={styles.errorMessage}>{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: "A senha é obrigatória" }}
          render={({ field, fieldState }) => (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Senha</label>
              <input {...field} type="password" className={styles.input} />
              {fieldState?.error?.message && (
                <p className={styles.errorMessage}>{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <button type="submit" className={styles.button}>
          Entrar
        </button>

        {error && <p className={styles.serverError}>{error}</p>}
      </form>
    </div>
  );
}
