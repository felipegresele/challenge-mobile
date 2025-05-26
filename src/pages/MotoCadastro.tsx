import { useState } from "react"
import { Galpao } from "../types/galpao"
import {Modelo} from "../types/modelo"
import styles from "./styles/Moto.module.css"
import { Link } from "react-router-dom"

interface MotoForm {
  chassi: string
  placa: string
  codigoRegistro: string
  galpao: Galpao | ""
  modelo: Modelo | ""
}

export default function MotoCadastro() {
  const [form, setForm] = useState<MotoForm>({
    chassi: "",
    placa: "",
    codigoRegistro: "",
    galpao: "",
    modelo: "",
  })

  const [errors, setErrors] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    if (!form.chassi || form.chassi.length < 3 || form.chassi.length > 8) {
      return "Chassi deve ter entre 3 e 8 caracteres."
    }
    if (!form.placa || form.placa.length < 7 || form.placa.length > 8) {
      return "Placa deve ter entre 7 e 8 caracteres."
    }
    if (!form.codigoRegistro) {
      return "Código de registro não pode estar em branco."
    }
    if (!form.galpao) {
      return "Galpão deve ser selecionado."
    }
    if (!form.modelo) {
      return "Modelo deve ser selecionado"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors(null)
    setSuccess(null)

    const error = validate()
    if (error) {
      setErrors(error)
      return
    }

    try {
      const response = await fetch("http://localhost:8080/api/moto/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Erro ao salvar moto.")
      }

      setSuccess("Moto cadastrada com sucesso!")
      setForm({
        chassi: "",
        placa: "",
        codigoRegistro: "",
        galpao: "",
        modelo: "",
      })
    } catch (err: any) {
      setErrors(err.message);
    }
  }

  return (
    <form className={styles.moto_form} onSubmit={handleSubmit}>
  <h2 className={styles.title}>Cadastro de Moto</h2>

  <label className={styles.label} htmlFor="chassi">Chassi</label>
  <input
    id="chassi"
    className={styles.input}
    type="text"
    name="chassi"
    placeholder="Digite o chassi"
    value={form.chassi}
    onChange={handleChange}
  />

  <label className={styles.label} htmlFor="placa">Placa</label>
  <input
    id="placa"
    className={styles.input}
    type="text"
    name="placa"
    placeholder="Digite a placa"
    value={form.placa}
    onChange={handleChange}
  />

  <label className="label" htmlFor="codigoRegistro">Código de Registro</label>
  <input
    id="codigoRegistro"
    className={styles.input}
    type="text"
    name="codigoRegistro"
    placeholder="Digite o código de registro"
    value={form.codigoRegistro}
    onChange={handleChange}
  />

  <label className={styles.label} htmlFor="galpao">Galpão</label>
  <select
    id="galpao"
    className={`${styles.select} ${!form.galpao ? styles.placeholder : ""}`}
    name="galpao"
    value={form.galpao}
    onChange={handleChange}
  >
    <option value="" disabled>Selecione o galpão</option>
    {Object.values(Galpao).map((g) => (
      <option key={g} value={g}>{g.replace("_", " ")}</option>
    ))}
  </select>
  <label className={styles.modelo}>Modelo</label>
  <select
    id="modelo"
    className={`${styles.select} ${!form.modelo ? styles.placeholder : ""}`}
    value={form.modelo}
    name="modelo"
    onChange={handleChange}
  >
    <option value="" disabled>
      Selecione o modedlo
    </option>
    {Object.values(Modelo).map((g) => (
      <option key={g} value={g}>{g.replace("_", " ")}</option>
    ))}
  </select>

  {errors && <span className="error_message">{errors}</span>}
  {success && <span className="success_message">{success}</span>}

  <button className={styles["submit_button"]} type="submit">
    Cadastrar
  </button>
  <Link to="/mapa_moto" className={styles.link_botao}>
    Ir para Mapa Pátio
  </Link>
</form>
  )
}
