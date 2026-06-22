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

export interface VehicleDealershipInfo {
  id: string;
  name: string;
  city: string;
  state: string;
}

export interface VehicleListItem {
  id: string;
  brand: string;
  model: string;
  year: number;
  fuelType: string;
  category: string;
  priceFrom: string | number;
  engineCc: number | null;
  powerHp: number | null;
  active: boolean;
  dealership: VehicleDealershipInfo;
}

export interface VehicleDetail extends VehicleListItem {
  torqueNm: number | null;
  dealership: VehicleDealershipInfo & {
    addressLine: string;
    locationLat: string | number;
    locationLng: string | number;
  };
}

export interface VehiclesPage {
  items: VehicleListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface VehicleFilterParams {
  brand?: string;
  category?: string;
  fuelType?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string | number;
  limit?: string | number;
}
