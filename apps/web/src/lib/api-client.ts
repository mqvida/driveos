import type { VehicleFilterParams, VehicleListItem, VehicleDetail, VehiclesPage } from "@driveos/shared";

const API_BASE_URL = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001";

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`API ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  consentMarketing: boolean;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface CurrentUser {
  id: string;
  email: string;
  role: string;
}

export const apiClient = {
  health: () => fetchJson<{ status: string }>("/health"),

  auth: {
    register: (body: RegisterPayload) =>
      fetchJson<{ accessToken: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    login: (body: LoginPayload) =>
      fetchJson<{ accessToken: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    me: (token: string) =>
      fetchJson<CurrentUser>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      }),
  },

  vehicles: {
    list: (params: VehicleFilterParams = {}) => {
      const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== "");
      const qs = entries.length
        ? "?" + new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString()
        : "";
      return fetchJson<VehiclesPage>(`/vehicles${qs}`);
    },
    get: (id: string) => fetchJson<VehicleDetail>(`/vehicles/${id}`),
  },
};
