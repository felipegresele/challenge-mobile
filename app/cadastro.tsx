import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";

interface UsuarioForm {
  username: string;
  email: string;
  password: string;
  roleId: number;
}

export default function CadastroUsuario() {
  const { control, handleSubmit, reset } = useForm<UsuarioForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      roleId: 1,
    }
  });

  const [mensagem, setMensagem] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit = async (data: UsuarioForm) => {
    try {
      const response = await fetch("http://10.0.2.2:8080/usuarios/save", { // IP do Android Emulator
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMensagem("Usuário cadastrado com sucesso!");
        setError("");
        reset();
      } else if (response.status === 409) {
        setError("Erro: já existe um usuário com este email!");
        setMensagem("");
      } else {
        setError("Erro ao cadastrar usuário");
        setMensagem("");
      }
    } catch (err) {
      console.log("Erro na requisição: ", err);
      setError("Erro na conexão com o servidor");
      setMensagem("");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <Controller
        name="username"
        control={control}
        rules={{ required: "O nome é obrigatório", minLength: { value: 4, message: "Mínimo 4 caracteres" } }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome de usuário"
              placeholderTextColor="#999"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </View>
        )}
      />

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
        rules={{ required: "A senha é obrigatória", minLength: { value: 4, message: "Mínimo 4 caracteres" } }}
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

      <Controller
        name="roleId"
        control={control}
        rules={{ required: "O cargo é obrigatório" }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cargo (1-Admin, 2-Operador)</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite 1 ou 2"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={String(value)}
              onChangeText={text => onChange(Number(text))}
            />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {mensagem ? <Text style={styles.success}>{mensagem}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
  title: {
    fontSize: 28,
    color: "#1db954",
    fontWeight: "700",
    marginBottom: 20
  },
  inputGroup: { width: "100%", marginBottom: 15 },
  label: { color: "#1db954", marginBottom: 5 },
  input: {
    backgroundColor: "#121212",
    color: "#e0e0e0",
    padding: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#1db954"
  },
  button: {
    backgroundColor: "#1db954",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    width: "100%"
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  success: { color: "#28a745", marginTop: 15 },
  error: { color: "#e42222", marginTop: 5 }
});
