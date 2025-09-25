import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Warehouse, Bike } from "lucide-react-native";
import { Stack } from "expo-router";

interface Galpao {
  id: number;
  nome: string;
  endereco: string;
  capacidade?: number;
}

interface Moto {
  id: number;
  placa: string;
  modelo: string;
  status: string;
  galpao?: Galpao;
}

export default function MapaMotos() {
  const [galpoes, setGalpoes] = useState<Galpao[]>([]);
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    fetch("http://10.0.2.2:8080/galpoes/listar")
      .then((res) => res.json())
      .then((data) => setGalpoes(data))
      .catch(() => Alert.alert("Erro", "Falha ao carregar galpões"));

    fetch("http://10.0.2.2:8080/motos/listar")
      .then((res) => res.json())
      .then((data) => setMotos(data))
      .catch(() => Alert.alert("Erro", "Falha ao carregar motos"));
  }, []);

  // Função para gerar coordenada aleatória próxima de um ponto base
  const gerarCoordenadaAleatoria = (latBase: number, lngBase: number, delta = 0.002) => {
    const lat = latBase + (Math.random() - 0.5) * delta;
    const lng = lngBase + (Math.random() - 0.5) * delta;
    return { latitude: lat, longitude: lng };
  };

  // Ponto base (ex: centro de São Paulo)
  const pontoBase = { latitude: -23.55052, longitude: -46.633308 };

  // Criar coordenadas para galpões
  const galpoesComCoords = galpoes.map((g, index) => ({
    ...g,
    coords: gerarCoordenadaAleatoria(
      pontoBase.latitude + index * 0.02,
      pontoBase.longitude + index * 0.008,
      0.0015
    ),
  }));

  // Criar coordenadas para motos mais afastadas do galpão (em movimento)
  const motosComCoords = motos.map((m) => {
    const galpaoCoords = galpoesComCoords.find((g) => g.id === m.galpao?.id)?.coords ?? pontoBase;
    return {
      ...m,
      coords: gerarCoordenadaAleatoria(galpaoCoords.latitude, galpaoCoords.longitude, 0.05),
    };
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: "Mapa",
          headerStyle: { backgroundColor: "#0d0d0d" },
          headerTintColor: "#00a859",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: pontoBase.latitude,
          longitude: pontoBase.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Galpões */}
        {galpoesComCoords.map((g) => (
          <Marker key={`galpao-${g.id}`} coordinate={g.coords}>
            <View style={styles.iconContainer}>
              <Warehouse color="#00a859" size={30} />
            </View>
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>Tipo: Galpão</Text>
                <Text>Nome: {g.nome}</Text>
                <Text>Endereço: {g.endereco}</Text>
                <Text>Capacidade: {g.capacidade ?? "N/A"}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {/* Motos */}
        {motosComCoords.map((m) => (
          <Marker key={`moto-${m.id}`} coordinate={m.coords}>
            <View style={styles.iconContainer}>
              <Bike color="#0000FF" size={25} />
            </View>
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>Tipo: Moto</Text>
                <Text>Placa: {m.placa}</Text>
                <Text>Modelo: {m.modelo}</Text>
                <Text>Status: {m.status}</Text>
                <Text>Galpão: {m.galpao?.nome ?? "N/A"}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  iconContainer: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  callout: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: 180,
  },
  calloutTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
