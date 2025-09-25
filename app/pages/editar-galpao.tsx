import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

interface GalpaoForm {
  id: number;
  nome: string;
  endereco: string;
  capacidade: number;
}

export default function EditarGalpao() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const [galpao, setGalpao] = useState<GalpaoForm | null>(null);

  useEffect(() => {
    const fetchGalpao = async () => {
      if (!params.id) return;

      try {
        const response = await fetch(`http://10.0.2.2:8080/galpoes/${params.id}`); // Android Emulator localhost
        if (response.ok) {
          const data = await response.json();
          setGalpao(data);
        } else {
          Alert.alert("Erro", "Galpão não encontrado");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Falha ao buscar galpão");
      }
    };

    fetchGalpao();
  }, [params.id]);

  const onSubmit = async () => {
    if (!galpao) return;

    try {
      const response = await fetch(`http://10.0.2.2:8080/galpoes/${galpao.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galpao),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Galpão atualizado!");
        router.push("/pages/listar-galpoes");
      } else {
        Alert.alert("Erro", "Falha ao atualizar galpão");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro na conexão");
    }
  };

  if (!galpao) return <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={galpao.nome}
        onChangeText={(text) => setGalpao({ ...galpao, nome: text })}
        placeholder="Nome"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={galpao.endereco}
        onChangeText={(text) => setGalpao({ ...galpao, endereco: text })}
        placeholder="Endereço"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={String(galpao.capacidade)}
        onChangeText={(text) => setGalpao({ ...galpao, capacidade: Number(text) })}
        placeholder="Capacidade"
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#0d0d0d",
    flex: 1,
  },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#04d361",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#0d0d0d",
    fontWeight: "bold",
  },
});
