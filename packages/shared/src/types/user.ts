export type UserRole = "consumer" | "dealership_staff" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  // phone, CNH, location are kept in separate LGPD-scoped tables
}
