import type { GeoPoint } from "./dealership.js";

export type TestDriveStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show";

export interface TestDrive {
  id: string;
  vehicleId: string;
  dealershipId: string;
  consumerId: string;
  scheduledAt: Date;
  status: TestDriveStatus;
  durationMinutes?: number;
  route?: GeoPoint[]; // LGPD: only stored after explicit consent
}

export interface DriveReport {
  testDriveId: string;
  maxSpeedKmh: number;
  avgAccelerationMs2: number;
  distanceKm: number;
  generatedAt: Date;
  aiSummaryPtBr?: string;
}
