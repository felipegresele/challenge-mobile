import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogOut } from "lucide-react-native";
import { useRouter } from "expo-router";

export function Header() {
  const router = useRouter();
  const [username, setUsername] = React.useState<string | null>("");

  React.useEffect(() => {
    const fetchUser = async () => {
      const name = await AsyncStorage.getItem("username");
      setUsername(name);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("username");
    router.replace("/");
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Mottu - Painel</Text>
      <View style={styles.userSection}>
        <Text style={styles.username}>Olá, {username}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <LogOut size={16} color="#00ff7f" />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#121212",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00ff7f",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  username: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#1a1a1a",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#00ff7f",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
});