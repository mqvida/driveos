interface DriveSensorState {
    isRecording: boolean;
    hasConsentGranted: boolean;
    startRecording: () => void;
    stopRecording: () => void;
    grantConsent: () => void;
}
export declare function useDriveSensor(): DriveSensorState;
export {};
//# sourceMappingURL=useDriveSensor.d.ts.map