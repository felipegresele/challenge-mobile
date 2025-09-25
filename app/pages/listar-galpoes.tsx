import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView 
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface GalpaoResponse {
  id: number;
  nome: string;
  endereco: string;
  capacidade: number;
}

export default function ListaGalpao() {
  const [lista, setLista] = useState<GalpaoResponse[]>([]);
  const router = useRouter();

  const listaGalpoes = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8080/galpoes/listar");
      if (response.ok) {
        const result = await response.json();
        setLista(result);
      }
    } catch (error) {
      console.log("Erro na requisição");
    }
  };

  const excluirGalpao = (id: number) => {
    const deletar = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8080/galpoes/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          Alert.alert("Sucesso", "Galpão deletado com sucesso!");
          listaGalpoes();
        } else {
          Alert.alert("Erro", "Erro ao excluir galpão");
        }
      } catch (error) {
        Alert.alert("Erro", "Erro na conexão com o servidor");
      }
    };

    Alert.alert(
      "Confirmação",
      "Deseja realmente excluir este galpão?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: deletar },
      ]
    );
  };

  useEffect(() => {
    listaGalpoes();
  }, []);

  const renderItem = ({ item }: { item: GalpaoResponse }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}><Text style={styles.label}>ID:</Text> {item.id}</Text>
      <Text style={styles.cardText}><Text style={styles.label}>Nome:</Text> {item.nome}</Text>
      <Text style={styles.cardText}><Text style={styles.label}>Endereço:</Text> {item.endereco}</Text>
      <Text style={styles.cardText}><Text style={styles.label}>Capacidade:</Text> {item.capacidade}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => excluirGalpao(item.id)}>
          <MaterialCommunityIcons name="trash-can-outline" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/pages/editar-galpao?id=${item.id}`)}>
          <MaterialCommunityIcons name="pencil-outline" size={24} color="#00a859" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de Galpões</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push("/pages/dashboard")}>
          <Text style={styles.backBtnText}>Voltar para dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push("/pages/cadastrar-galpao")}>
          <Text style={styles.backBtnText}>Adicionar Galpão</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#0d0d0d",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00a859",
    textAlign: "center",
    marginBottom: 20,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  backBtn: {
    backgroundColor: "#00a859",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  backBtnText: {
    color: "#0d0d0d",
    fontWeight: "500",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardText: {
    color: "#e6e6e6",
    marginBottom: 5,
  },
  label: {
    fontWeight: "600",
    color: "#00a859",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    marginTop: 10,
  },
});
