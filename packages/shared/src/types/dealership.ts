export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Dealership {
  id: string;
  name: string;
  cnpj: string;
  location: GeoPoint;
  addressLine: string;
  city: string;
  state: string;
  brands: string[];
  subscriptionActive: boolean;
}
