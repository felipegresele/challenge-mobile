import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginForm {
    email: string;
    password: string;
}

export default function LoginUsuario() {
    const { control, handleSubmit } = useForm<LoginForm>({
        defaultValues: { email: "", password: "" }
    });

    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = async (data: LoginForm) => {
        try {
            const response = await fetch("http://10.0.2.2:8080/usuarios/login", { // IP Android Emulator
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const username = await response.text();
                console.log("Usuário logado:", username);
                await AsyncStorage.setItem('username', username);
                router.push("/pages/dashboard");
            } else {
                setError("Dados inválidos");
            }
        } catch (err) {
            console.log(err);
            setError("Erro na conexão com o servidor");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>

                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "O email é obrigatório",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Digite um email válido" }
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState }) => (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu email"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                        </View>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{ required: "A senha é obrigatória" }}
                    render={({ field: { onChange, onBlur, value }, fieldState }) => (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite sua senha"
                                placeholderTextColor="#999"
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                        </View>
                    )}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#0d0d0d"
    },
    card: {
        backgroundColor: "#1a1a1a",
        padding: 25,
        borderRadius: 12,
        width: "100%",
        maxWidth: 400
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#00a859",
        marginBottom: 20,
        textAlign: "center"
    },
    inputGroup: { marginBottom: 15 },
    label: { color: "#cccccc", marginBottom: 5 },
    input: {
        backgroundColor: "#0d0d0d",
        color: "#e6e6e6",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#333"
    },
    button: {
        backgroundColor: "#00a859",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10
    },
    buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
    error: { color: "#ff4d4f", marginTop: 5, textAlign: "center" }
});
