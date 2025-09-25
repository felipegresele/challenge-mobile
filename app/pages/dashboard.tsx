import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Warehouse, Bike, LogOut, MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Header } from "./header";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const nome = await AsyncStorage.getItem("username");
            if (!nome) {
                router.replace("/");
            }
        };
        checkUser();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem("username");
        router.replace("/");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header />
            <View style={styles.header}>
                <Text style={styles.title}>Dashboard</Text>
            </View>

            <View style={styles.grid}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("/pages/listar-galpoes")}
                >
                    <Warehouse size={48} color="green" />
                    <Text style={styles.cardTitle}>Ver Galpões</Text>
                    <Text style={styles.cardDesc}>Lista de galpões do sistema.</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("/pages/listar-motoqueiros")}
                >
                    <Bike size={48} color="green" />
                    <Text style={styles.cardTitle}>Ver Motoqueiros</Text>
                    <Text style={styles.cardDesc}>Lista de motoqueiros do sistema.</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("/pages/mapa")}
                >
                    <MapPin size={48} color="green" />
                    <Text style={styles.cardTitle}>Ver Mapa</Text>
                    <Text style={styles.cardDesc}>Localização das motos e galpões no mapa</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#121212",
        alignItems: "center",
        padding: 20,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    grid: {
        width: "100%",
        maxWidth: 800,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 20,
    },
    card: {
        backgroundColor: "#1e1e1e",
        borderRadius: 16,
        padding: 20,
        width: "48%",
        alignItems: "center",
        marginBottom: 20,
    },
    cardTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 5,
    },
    cardDesc: {
        color: "#ccc",
        fontSize: 14,
        textAlign: "center",
    },
});
