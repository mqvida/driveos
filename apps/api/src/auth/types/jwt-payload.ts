export interface JwtPayload {
  sub: string;
  email: string;
  role: "CONSUMER" | "DEALERSHIP_STAFF" | "ADMIN";
}
