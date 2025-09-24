import { useState } from "react";
import styles from "../styles/auth/Cadastro.module.css";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

interface UsuarioForm {
  username: string,
  email: string,
  password: string,
  roleId: number,
}

function CadastroUsuario() {
  const { handleSubmit, reset, control } = useForm<UsuarioForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      roleId: 1,
    }
  })

  const [mensagem, setMensagem] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //A resposta vai ser do tipo UsuarioForm
  const onSubmit = async (data: UsuarioForm) => {
    try {
      const response = await fetch("http://localhost:8080/usuarios/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        setMensagem("Usuário cadastrado com sucesso!");
        reset()
      }

      else if (response.status === 409) {
        setError("Erro já existe um usuário com este email cadastrado!")
      }

      else {
        setMensagem("Erro ao cadastrar usuário")
      }
    } catch (error) {
      console.log("Erro na requisição: ", error)
    }
  }


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="username"
          control={control}
          rules={{
            required: "O nome de usuário é obrigatório",
            minLength: {
              value: 4,
              message: "O nome de usuário deve ter no mínimo 4 caracteres"
            }
          }}
          render={({ field, fieldState }) => (
            <div className={styles.inputGroup}>
              <label>Usuário</label>
              <input
                {...field}
                type="text"
                placeholder="Digite seu nome de usuário"
                className={styles.input}
              />
              {fieldState?.error?.message && <p className="error-message">{fieldState.error.message}</p>}
            </div>
          )}
        />

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
              <input
                {...field}
                type="email"
                name="email"
                placeholder="Digite seu email"
                required
                className={styles.input}
              />
              {fieldState?.error?.message && <p className="error-message">{fieldState.error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "O senha é obrigatório",
            minLength: {
              value: 4,
              message: "A senha deve ter no mínimo 4 caracteres"
            }
          }}
          render={({ field, fieldState }) => (
            <div className={styles.inputGroup}>
              <label>Senha</label>
              <input
                {...field}
                type="text"
                placeholder="Digite sua senha"
                className={styles.input}
              />
              {fieldState?.error?.message && <p className="error-message">{fieldState.error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="roleId"
          control={control}
          rules={{
            required: "O cargo é obrigatório",
          }}
          render={({ field, fieldState }) => (
            <div className={styles.selectGroup}>
              <label className={styles.label}>Cargo:</label>
              <select {...field}>
                <option>1</option>
                <option>2</option>
              </select>
              {fieldState?.error?.message && <p className="error-message">{fieldState.error.message}</p>}
              <p>Selecione 1 (Admin) ou 2 (Operador)</p>

            </div>
          )}
        />

        <button type="submit" className={styles.button}>Cadastrar</button>

        {mensagem && <p className={styles.success}>{mensagem}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default CadastroUsuario;
