import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DriveOS — Compare e Agende Test-Drives",
  description: "Marketplace multimarca para comparar veículos e agendar test-drives.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
