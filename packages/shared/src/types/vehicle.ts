export type FuelType = "flex" | "gasoline" | "electric" | "hybrid" | "diesel";
export type VehicleCategory = "sedan" | "suv" | "hatchback" | "pickup" | "coupe";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  fuelType: FuelType;
  category: VehicleCategory;
  priceFrom: number;
  specs: VehicleSpecs;
}

export interface VehicleSpecs {
  engineCc: number;
  powerHp: number;
  torqueNm: number;
  transmissionSpeeds: number;
  zeroToHundredSec?: number;
}
