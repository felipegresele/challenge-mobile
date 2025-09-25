import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Stack, useRouter } from "expo-router";

interface MotoqueiroForm {
    id?: number;
    nomeCompleto: string;
    cpf: string;
    telefone: string;
    ativo: boolean;
}

export default function MotoqueiroCadastro() {
    const router = useRouter();
    const { control, reset, handleSubmit } = useForm<MotoqueiroForm>({
        defaultValues: {
            nomeCompleto: "",
            cpf: "",
            telefone: "",
            ativo: false,
        },
    });

    const [mensagem, setMensagem] = useState("");

    const onSubmit = async (data: MotoqueiroForm) => {
        try {
            const response = await fetch("http://10.0.2.2:8080/motoqueiros/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                setMensagem("Motoqueiro cadastrado com sucesso");
                reset();
            } else {
                setMensagem("Erro: os dados são inválidos");
            }
        } catch (error) {
            console.log(error);
            setMensagem("Erro na conexão com o servidor");
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Cadastrar Motoqueiro",
                    headerStyle: { backgroundColor: "#0d0d0d" },
                    headerTintColor: "#00a859",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={() => router.push("/pages/listar-motoqueiros")} style={styles.backLink}>
                    <Text style={styles.backText}>Voltar para lista</Text>
                </TouchableOpacity>

                <View style={styles.card}>
                    <Text style={styles.title}>Cadastro de Motoqueiro</Text>

                    <Controller
                        name="nomeCompleto"
                        control={control}
                        rules={{
                            required: "O nome é obrigatório",
                            minLength: { value: 4, message: "O nome deve ter no mínimo 4 caracteres" },
                        }}
                        render={({ field: { onChange, value }, fieldState }) => (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Nome Completo</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite o nome do motoqueiro"
                                    placeholderTextColor="#999"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller
                        name="cpf"
                        control={control}
                        rules={{
                            required: "O CPF é obrigatório",
                            minLength: { value: 11, message: "CPF deve ter 11 dígitos" },
                            maxLength: { value: 11, message: "CPF deve ter 11 dígitos" },
                            pattern: { value: /^[0-9]*$/, message: "Digite apenas números" },
                        }}
                        render={({ field: { onChange, value }, fieldState }) => (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>CPF</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite o CPF"
                                    placeholderTextColor="#999"
                                    value={value}
                                    onChangeText={onChange}
                                    keyboardType="numeric"
                                    maxLength={11}
                                />
                                {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller
                        name="telefone"
                        control={control}
                        rules={{
                            required: "O telefone é obrigatório",
                            maxLength: { value: 15, message: "Telefone pode ter no máximo 15 caracteres" },
                            pattern: { value: /^[0-9]*$/, message: "Digite apenas números" },
                        }}
                        render={({ field: { onChange, value }, fieldState }) => (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Telefone</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite o número de telefone"
                                    placeholderTextColor="#999"
                                    value={value}
                                    onChangeText={onChange}
                                    keyboardType="numeric"
                                    maxLength={15}
                                />
                                {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller
                        name="ativo"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.switchGroup}>
                                <Text style={styles.label}>Ativo</Text>
                                <Switch value={value} onValueChange={onChange} thumbColor={value ? "#04d361" : "#ccc"} />
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
        backgroundColor: "#111",
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
        maxWidth: 450,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#00ff80",
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
        backgroundColor: "#111",
        color: "#fff",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#00ff80",
    },
    switchGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#00ff80",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#000",
        fontWeight: "700",
        fontSize: 16,
    },
    error: {
        color: "#ed3131",
        marginTop: 5,
        fontSize: 13,
    },
    success: {
        color: "#00ff80",
        marginTop: 15,
        textAlign: "center",
        fontWeight: "500",
    },
});
