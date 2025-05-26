import { useEffect, useState } from "react";
import { Galpao } from "../types/galpao";
import styles from "./styles/Patio.module.css";
import type { Modelo } from "../types/Modelo";

interface Moto {
  chassi: string;
  placa: string;
  codigoRegistro: string;
  galpao: Galpao | { nome: string } | string;
  modelo: Modelo | {nome: string} | string;
}

function MapaPatio() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/moto", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar motos.");
        }

        const data = await response.json();
        setMotos(Array.isArray(data) ? data : []);
      } catch (error) {
        setErro("Erro ao carregar motos");
      } finally {
        setCarregando(false);
      }
    };

    fetchMotos();
  }, []);

  const renderGalpao = (galpao: Moto["galpao"]) => {
    if (typeof galpao === "object" && galpao !== null && "nome" in galpao) {
      return galpao.nome;
    }
    if (typeof galpao === "string") {
      return galpao;
    }
    return "N/A";
  };

  const renderModelo = (modelo: Moto["modelo"]) => {
    if (typeof modelo === "object" && modelo !== null && "nome" in modelo) {
      return modelo.nome
    }
    if (typeof modelo === "string") {
      return modelo;
    }
    return "N/A";
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mapa Pátio</h1>

      {erro && <p className={styles.error}>{erro}</p>}
      {carregando && <p className={styles.loading}>Carregando motos...</p>}

      {motos.length > 0 && (
        <div className={styles.listContainer}>
          {motos.map((moto, index) => (
            <ul key={index} className={styles.motoItem}>
              <li><strong>Chassi:</strong> {moto.chassi}</li>
              <li><strong>Placa:</strong> {moto.placa}</li>
              <li><strong>Código Registro:</strong> {moto.codigoRegistro}</li>
              <li><strong>Galpão:</strong> {renderGalpao(moto.galpao)}</li>
              <li><strong>Modelo:</strong> {renderModelo(moto.modelo)}</li>
            </ul>
          ))}
        </div>
      )}

      {!carregando && motos.length === 0 && !erro && (
        <p>Nenhuma moto cadastrada.</p>
      )}
    </div>
  );
}

export default MapaPatio;
