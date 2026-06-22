const API_BASE_URL = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001";
async function fetchJson(path, init) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...init,
    });
    if (!response.ok) {
        throw new Error(`API error ${response.status}: ${response.statusText}`);
    }
    return response.json();
}
export const apiClient = {
    health: () => fetchJson("/health"),
};
//# sourceMappingURL=api-client.js.map