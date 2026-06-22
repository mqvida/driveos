export function formatDatetimePtBr(date: Date): string {
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isSchedulingAllowed(scheduledAt: Date, minMinutes = 30): boolean {
  return scheduledAt.getTime() - Date.now() >= minMinutes * 60 * 1000;
}
