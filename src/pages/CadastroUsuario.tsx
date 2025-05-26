import { useState } from "react";
import styles from "./styles/Cadastro.module.css";
import img from "../assets/mottuIcon.png"
import { useNavigate } from "react-router-dom";
import { Turno } from "../types/turno";

interface UsuarioForm{
  username: string,
  email: string,
  password: string,
  telefone: string,
  turno: Turno | "",
}

function CadastroUsuario() {
  const [form, setForm] = useState<UsuarioForm>({
    username: "",
    email: "",
    password: "",
    telefone: "",
    turno: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensagem("");
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/usuario/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMensagem("Usuário cadastrado com sucesso!");
        console.log("Cadastrado com sucesso");
        setForm({ username: "", email: "", password: "", telefone: "", turno: "" });
        navigate("/cadastrar_moto")
      } else {
        setMensagem("Erro ao cadastrar usuário");
        console.log("Erro: " + response.status, response.statusText);
      }
    } catch (err) {
      console.error("Erro inesperado", err);
      setError("Erro na conexão do servidor");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value as string,
    }));
  }

  return (
    <div className={styles.container}>
      <img src={img} alt="Logo Mottu" className={styles.logo} />
      <h1 className={styles.title}>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Usuário</label>
          <input
            type="text"
            name="username"
            placeholder="Digite seu nome de usuário"
            value={form.username}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Senha</label>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={form.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Telefone</label>
          <input
            type="text"
            name="telefone"
            placeholder="Digite seu telefone"
            value={form.telefone}
            onChange={handleChange}
            required
            min={9}
            max={13}
            className={styles.input}
          />
        </div>

        <label className={styles.label}>Turno</label>
        <select 
          name="turno" 
          id="turno"
          className={`${styles.select} ${!form.turno ? styles.placeholder : ""}`}
          value={form.turno}
          onChange={handleChange}
          >
            <option value="" disabled>
              Selecione o turno
            </option>
            {Object.values(Turno).map((g) => (
                  <option key={g} value={g}>{g.replace("_", " ")}</option>
            ))}
          </select>

        <button type="submit" className={styles.button}>Cadastrar</button>

        {mensagem && <p className={styles.success}>{mensagem}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default CadastroUsuario;
