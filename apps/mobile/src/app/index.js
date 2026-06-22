import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SensorStatus } from "../components/SensorStatus.js";
export default function HomeScreen() {
    return (<View style={styles.container}>
      <Text style={styles.title}>DriveOS</Text>
      <Text style={styles.subtitle}>Compare veículos e agende seu test-drive.</Text>
      <SensorStatus />
      <StatusBar style="auto"/>
    </View>);
}
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
    title: { fontSize: 32, fontWeight: "bold" },
    subtitle: { fontSize: 16, color: "#6b7280", marginTop: 8 },
});
//# sourceMappingURL=index.js.map