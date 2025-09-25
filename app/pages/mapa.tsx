  import React, { useEffect, useState } from "react";
  import { View, Text, StyleSheet, Alert } from "react-native";
  import MapView, { Marker, Callout } from "react-native-maps";
  import { Warehouse, Bike } from "lucide-react-native"; // versão React Native do Lucide

  interface Galpao {
    id: number;
    nome: string;
    endereco: string;
    latitude: number;   
    longitude: number;  
  }

  interface Moto {
    id: number;
    placa: string;
    modelo: string;
    status: string;
    galpao: Galpao;
    latitude?: number;
    longitude?: number;
  }

  export default function MapaMotos() {
    const [galpoes, setGalpoes] = useState<Galpao[]>([]);
    const [motos, setMotos] = useState<Moto[]>([]);

    useEffect(() => {
      fetch("http://10.0.2.2:8080/galpoes/listar")
        .then(res => res.json())
        .then(data => {
          const validGalpoes = data.filter(
            (g: Galpao) => g.latitude != null && g.longitude != null
          );
          setGalpoes(validGalpoes);
        })
        .catch(() => Alert.alert("Erro", "Falha ao carregar galpões"));

      fetch("http://10.0.2.2:8080/motos/listar")
        .then(res => res.json())
        .then(data => {
          const validMotos = data.filter(
            (m: Moto) =>
              (m.latitude != null && m.longitude != null) ||
              (m.galpao && m.galpao.latitude != null && m.galpao.longitude != null)
          );
          setMotos(validMotos);
        })
        .catch(() => Alert.alert("Erro", "Falha ao carregar motos"));
    }, []);

    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {galpoes.map(g => (
          <Marker
            key={`galpao-${g.id}`}
            coordinate={{ latitude: g.latitude, longitude: g.longitude }}
          >
            <View style={styles.iconContainer}>
              <Warehouse color="#00a859" size={30} />
            </View>
            <Callout>
              <Text style={styles.calloutTitle}>Galpão: {g.nome}</Text>
              <Text>Endereço: {g.endereco}</Text>
            </Callout>
          </Marker>
        ))}

        {motos.map(m => {
          const lat = m.latitude ?? m.galpao.latitude;
          const lng = m.longitude ?? m.galpao.longitude;

          return (
            <Marker
              key={`moto-${m.id}`}
              coordinate={{ latitude: lat, longitude: lng }}
            >
              <View style={styles.iconContainer}>
                <Bike color="#0000FF" size={25} />
              </View>
              <Callout>
                <Text style={styles.calloutTitle}>Moto: {m.placa}</Text>
                <Text>Modelo: {m.modelo}</Text>
                <Text>Status: {m.status}</Text>
                <Text>Galpão: {m.galpao.nome}</Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    );
  }

  const styles = StyleSheet.create({
    map: {
      flex: 1,
    },
    calloutTitle: {
      fontWeight: "bold",
    },
    iconContainer: {
      backgroundColor: "white",
      padding: 5,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#ccc",
    },
  });
