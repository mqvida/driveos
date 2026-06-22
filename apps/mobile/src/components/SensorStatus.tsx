import { View, Text, StyleSheet } from "react-native";
import { useDriveSensor } from "../hooks/useDriveSensor.js";

export function SensorStatus() {
  const { isRecording, hasConsentGranted } = useDriveSensor();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {hasConsentGranted
          ? isRecording
            ? "Gravando rota..."
            : "Sensores prontos"
          : "Consentimento necessário para ativar sensores"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, padding: 12, borderRadius: 8, backgroundColor: "#f3f4f6" },
  label: { fontSize: 14, color: "#374151" },
});
