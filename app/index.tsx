import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Mottu</Text>
      <Text style={styles.subtitle}>Escolha uma opção para continuar</Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cadastroBtn}
          onPress={() => router.push("/cadastro")}
        >
          <Text style={styles.cadastroBtnText}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#0d0d0d",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#00a859",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#b3b3b3",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
  },
  loginBtn: {
    backgroundColor: "#00a859",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  cadastroBtn: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#00a859",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cadastroBtnText: {
    color: "#00a859",
    fontWeight: "bold",
  },
});
