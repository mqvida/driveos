import { Suspense } from "react";
import { apiClient } from "@/lib/api-client";
import { VehicleGrid } from "@/components/catalog/VehicleGrid";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import type { VehicleFilterParams } from "@driveos/shared";

interface VeiculosPageProps {
  searchParams: Promise<VehicleFilterParams>;
}

export const metadata = {
  title: "Comparar Veículos — DriveOS",
  description: "Compare modelos de diversas marcas e agende seu test-drive.",
};

export default async function VeiculosPage({ searchParams }: VeiculosPageProps) {
  const params = await searchParams;
  const data = await apiClient.vehicles.list(params).catch(() => ({
    items: [],
    total: 0,
    page: 1,
    limit: 20,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar simples */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-gray-900">DriveOS</a>
        <nav className="flex gap-4 text-sm">
          <a href="/veiculos" className="text-blue-600 font-medium">Veículos</a>
          <a href="/login" className="text-gray-600 hover:text-gray-900">Entrar</a>
          <a href="/register" className="text-gray-600 hover:text-gray-900">Cadastrar</a>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Comparar veículos
        </h1>

        <div className="flex gap-8">
          <Suspense>
            <FilterSidebar />
          </Suspense>
          <VehicleGrid
            vehicles={data.items}
            total={data.total}
            page={data.page}
          />
        </div>
      </div>
    </div>
  );
}
