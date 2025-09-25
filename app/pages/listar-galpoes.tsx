import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal, TextInput
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

interface GalpaoResponse {
  id: number;
  nome: string;
  endereco: string;
  capacidade: number;
}

export default function ListaGalpao() {
  const [lista, setLista] = useState<GalpaoResponse[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [galpaoEdit, setGalpaoEdit] = useState<GalpaoResponse | null>(null);
  const router = useRouter();

  const listaGalpoes = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8080/galpoes/listar");
      if (response.ok) {
        const result = await response.json();
        setLista(result);
      }
    } catch (error) {
      console.log("Erro na requisição", error);
    }
  };

  const excluirGalpao = (id: number) => {
    const deletar = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8080/galpoes/${id}`, { method: "DELETE" });
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
    Alert.alert("Confirmação", "Deseja realmente excluir este galpão?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sim", onPress: deletar },
    ]);
  };

  const abrirModal = (galpao: GalpaoResponse) => {
    setGalpaoEdit(galpao);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    if (!galpaoEdit) return;

    try {
      const response = await fetch(`http://10.0.2.2:8080/galpoes/${galpaoEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galpaoEdit),
      });
      if (response.ok) {
        Alert.alert("Sucesso", "Galpão atualizado!");
        setModalVisible(false);
        listaGalpoes();
      } else {
        Alert.alert("Erro", "Falha ao atualizar galpão");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro na conexão");
    }
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
        <TouchableOpacity onPress={() => abrirModal(item)}>
          <MaterialCommunityIcons name="pencil-outline" size={24} color="#00a859" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Lista de Galpões",
          headerStyle: { backgroundColor: "#0d0d0d" },
          headerTintColor: "#00a859",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
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

      {/* Modal de edição */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Galpão</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#aaa"
              value={galpaoEdit?.nome}
              onChangeText={(text) => galpaoEdit && setGalpaoEdit({ ...galpaoEdit, nome: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Endereço"
              placeholderTextColor="#aaa"
              value={galpaoEdit?.endereco}
              onChangeText={(text) => galpaoEdit && setGalpaoEdit({ ...galpaoEdit, endereco: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Capacidade"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={galpaoEdit?.capacidade.toString()}
              onChangeText={(text) =>
                galpaoEdit && setGalpaoEdit({ ...galpaoEdit, capacidade: Number(text) })
              }
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              <TouchableOpacity style={styles.button} onPress={salvarEdicao}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: "#ff5555" }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 12,
    width: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00a859",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#0d0d0d",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#00a859",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#0d0d0d",
    fontWeight: "bold",
  },
});
