import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Stack, useRouter } from "expo-router";

interface GalpaoForm {
    nome: string;
    endereco: string;
    capacidade: number;
}

export default function GalpaoCadastro() {
    const router = useRouter();
    const { control, reset, handleSubmit } = useForm<GalpaoForm>({
        defaultValues: { nome: "", endereco: "", capacidade: 0 },
    });

    const [mensagem, setMensagem] = useState("");

    const onSubmit = async (data: GalpaoForm) => {
        try {
            const response = await fetch("http://10.0.2.2:8080/galpoes/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                setMensagem("Galpão salvo com sucesso!");
                reset();
            } else {
                setMensagem("Erro ao salvar galpão");
            }
        } catch (error) {
            console.log("Erro na requisição: ", error);
            setMensagem("Erro na conexão com o servidor");
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Cadastrar Galpão",
                    headerStyle: { backgroundColor: "#0d0d0d" },
                    headerTintColor: "#00a859",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.backLink} onPress={() => router.push("/pages/listar-galpoes")}>
                    <Text style={styles.backText}>Voltar para lista</Text>
                </TouchableOpacity>

                <View style={styles.card}>
                    <Text style={styles.title}>Cadastro de Galpão</Text>

                    <Controller
                        name="nome"
                        control={control}
                        rules={{
                            required: "O nome é obrigatório",
                            minLength: { value: 4, message: "O nome deve ter no mínimo 4 caracteres" },
                        }}
                        render={({ field: { onChange, value }, fieldState }) => (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Nome</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite o nome do galpão"
                                    placeholderTextColor="#999"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller
                        name="endereco"
                        control={control}
                        rules={{ required: "O endereço é obrigatório" }}
                        render={({ field: { onChange, value }, fieldState }) => (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Endereço</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite o endereço do galpão"
                                    placeholderTextColor="#999"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller
                        name="capacidade"
                        control={control}
                        rules={{ required: "A capacidade é obrigatória" }}
                        render={({ field: { onChange, value }, fieldState }) => (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Capacidade</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite a capacidade"
                                    placeholderTextColor="#999"
                                    value={value.toString()}
                                    onChangeText={(text) => onChange(Number(text))}
                                    keyboardType="numeric"
                                />
                                {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                            </View>
                        )}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>

                    {mensagem ? <Text style={styles.success}>{mensagem}</Text> : null}
                </View>
            </ScrollView>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#0d0d0d",
    },
    backLink: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#00a859",
        borderRadius: 6,
    },
    backText: {
        color: "#0d0d0d",
        fontWeight: "500",
        textAlign: "center",
    },
    card: {
        backgroundColor: "#1a1a1a",
        padding: 25,
        borderRadius: 12,
        width: "100%",
        maxWidth: 400,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#04d361",
        textAlign: "center",
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        color: "#fff",
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#0d0d0d",
        color: "#fff",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#333",
    },
    button: {
        backgroundColor: "#04d361",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#0d0d0d",
        fontWeight: "700",
        fontSize: 16,
    },
    error: {
        color: "#ff4d4f",
        marginTop: 5,
        fontSize: 13,
    },
    success: {
        color: "#04d361",
        marginTop: 15,
        textAlign: "center",
        fontWeight: "500",
    },
});
