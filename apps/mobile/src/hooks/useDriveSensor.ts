import { useState, useCallback } from "react";

interface DriveSensorState {
  isRecording: boolean;
  hasConsentGranted: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  grantConsent: () => void;
}

// Recording only starts after explicit consent — LGPD requirement.
// expo-location and expo-sensors are imported lazily to avoid triggering
// permission dialogs before consent is granted.
export function useDriveSensor(): DriveSensorState {
  const [isRecording, setIsRecording] = useState(false);
  const [hasConsentGranted, setHasConsentGranted] = useState(false);

  const grantConsent = useCallback(() => {
    // TODO (fase 1): persist consent with timestamp + purpose to API before setting state
    setHasConsentGranted(true);
  }, []);

  const startRecording = useCallback(() => {
    if (!hasConsentGranted) {
      console.warn("useDriveSensor: consentimento não concedido, gravação bloqueada.");
      return;
    }
    // TODO (fase 1): iniciar expo-location watchPositionAsync + expo-sensors subscription
    setIsRecording(true);
  }, [hasConsentGranted]);

  const stopRecording = useCallback(() => {
    // TODO (fase 1): parar subscriptions e enviar dados para a API
    setIsRecording(false);
  }, []);

  return { isRecording, hasConsentGranted, startRecording, stopRecording, grantConsent };
}
