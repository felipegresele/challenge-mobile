import React, { useEffect, useState } from "react";
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal, TextInput, Switch
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

interface MotoqueiroResponse {
    id: number;
    nomeCompleto: string;
    cpf: string;
    telefone: number;
    ativo: boolean;
}

export default function ListaMotoqueiro() {
    const [lista, setLista] = useState<MotoqueiroResponse[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [motoqueiroEdit, setMotoqueiroEdit] = useState<MotoqueiroResponse | null>(null);
    const router = useRouter();

    const listaMotoqueiros = async () => {
        try {
            const response = await fetch("http://10.0.2.2:8080/motoqueiros/listar");
            if (response.ok) {
                const result = await response.json();
                setLista(result);
            }
        } catch (error) {
            console.log("Erro na requisição", error);
        }
    };

    const excluirMotoqueiro = (id: number) => {
        Alert.alert(
            "Confirmação",
            "Deseja realmente excluir este motoqueiro?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sim",
                    onPress: async () => {
                        try {
                            const response = await fetch(`http://10.0.2.2:8080/motoqueiros/${id}`, {
                                method: "DELETE",
                            });
                            if (response.ok) {
                                Alert.alert("Sucesso", "Motoqueiro deletado com sucesso!");
                                listaMotoqueiros();
                            } else {
                                Alert.alert("Erro", "Erro ao excluir motoqueiro");
                            }
                        } catch (error) {
                            Alert.alert("Erro", "Erro na conexão com o servidor");
                        }
                    }
                }
            ]
        );
    };

    const abrirModal = (motoqueiro: MotoqueiroResponse) => {
        setMotoqueiroEdit(motoqueiro);
        setModalVisible(true);
    };

    const salvarEdicao = async () => {
        if (!motoqueiroEdit) return;

        try {
            const response = await fetch(`http://10.0.2.2:8080/motoqueiros/${motoqueiroEdit.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(motoqueiroEdit),
            });
            if (response.ok) {
                Alert.alert("Sucesso", "Motoqueiro atualizado!");
                setModalVisible(false);
                listaMotoqueiros();
            } else {
                Alert.alert("Erro", "Falha ao atualizar motoqueiro");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Erro na conexão");
        }
    };

    useEffect(() => {
        listaMotoqueiros();
    }, []);

    const renderItem = ({ item }: { item: MotoqueiroResponse }) => (
        <View style={styles.card}>
            <Text style={styles.cardText}><Text style={styles.label}>ID:</Text> {item.id}</Text>
            <Text style={styles.cardText}><Text style={styles.label}>Nome:</Text> {item.nomeCompleto}</Text>
            <Text style={styles.cardText}><Text style={styles.label}>CPF:</Text> {item.cpf}</Text>
            <Text style={styles.cardText}><Text style={styles.label}>Telefone:</Text> {item.telefone}</Text>
            <Text style={styles.cardText}><Text style={styles.label}>Ativo:</Text> {item.ativo ? "Sim" : "Não"}</Text>

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => excluirMotoqueiro(item.id)}>
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
                    title: "Lista de Motoqueiros",
                    headerStyle: { backgroundColor: "#0d0d0d" },
                    headerTintColor: "#00a859",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Lista de Motoqueiros</Text>

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.push("/pages/dashboard")}>
                        <Text style={styles.backBtnText}>Voltar para dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.push("/pages/cadastrar-motoqueiro")}>
                        <Text style={styles.backBtnText}>Adicionar Motoqueiro</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={lista}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            </ScrollView>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar Motoqueiro</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome Completo"
                            placeholderTextColor="#aaa"
                            value={motoqueiroEdit?.nomeCompleto}
                            onChangeText={(text) =>
                                motoqueiroEdit && setMotoqueiroEdit({ ...motoqueiroEdit, nomeCompleto: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CPF"
                            maxLength={11}
                            placeholderTextColor="#aaa"
                            value={motoqueiroEdit?.cpf}
                            onChangeText={(text) =>
                                motoqueiroEdit && setMotoqueiroEdit({ ...motoqueiroEdit, cpf: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefone"
                            maxLength={15}
                            placeholderTextColor="#aaa"
                            keyboardType="numeric"
                            value={motoqueiroEdit?.telefone.toString()}
                            onChangeText={(text) =>
                                motoqueiroEdit && setMotoqueiroEdit({ ...motoqueiroEdit, telefone: Number(text) })
                            }
                        />
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                            <Text style={{ color: "#fff", marginRight: 10 }}>Ativo:</Text>
                            <Switch
                                value={motoqueiroEdit?.ativo || false}
                                onValueChange={(value) => {
                                    if (motoqueiroEdit) {
                                        setMotoqueiroEdit({ ...motoqueiroEdit, ativo: value });
                                    }
                                }}
                            />
                        </View>

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
