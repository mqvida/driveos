import { notFound } from "next/navigation";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";

const FUEL_LABELS: Record<string, string> = {
  FLEX: "Flex", GASOLINE: "Gasolina", ELECTRIC: "Elétrico",
  HYBRID: "Híbrido", DIESEL: "Diesel",
};

const CATEGORY_LABELS: Record<string, string> = {
  SEDAN: "Sedã", SUV: "SUV", HATCHBACK: "Hatchback",
  PICKUP: "Picape", COUPE: "Cupê",
};

function formatPrice(value: string | number) {
  return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

interface VehicleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { id } = await params;
  const vehicle = await apiClient.vehicles.get(id).catch(() => null);

  if (!vehicle) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-gray-900">DriveOS</a>
        <nav className="flex gap-4 text-sm">
          <a href="/veiculos" className="text-blue-600 font-medium">Veículos</a>
          <a href="/login" className="text-gray-600 hover:text-gray-900">Entrar</a>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/veiculos" className="text-sm text-blue-600 hover:underline mb-6 block">
          ← Voltar para o comparador
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {vehicle.brand}
              </span>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">{vehicle.model}</h1>
              <p className="text-gray-500 mt-1">{vehicle.year}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-3xl font-bold text-gray-900">{formatPrice(vehicle.priceFrom)}</p>
              <p className="text-sm text-gray-400 mt-1">a partir de</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap mb-8">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
              {CATEGORY_LABELS[vehicle.category] ?? vehicle.category}
            </span>
            <span className="px-3 py-1 bg-green-50 rounded-full text-sm text-green-700">
              {FUEL_LABELS[vehicle.fuelType] ?? vehicle.fuelType}
            </span>
          </div>

          {/* Especificações */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Especificações</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {vehicle.engineCc && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Motor</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{(vehicle.engineCc / 1000).toFixed(1)}L</p>
              </div>
            )}
            {vehicle.powerHp && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Potência</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{vehicle.powerHp} cv</p>
              </div>
            )}
            {vehicle.torqueNm && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Torque</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{vehicle.torqueNm} Nm</p>
              </div>
            )}
          </div>

          {/* Concessionária */}
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Concessionária</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="font-medium text-gray-900">{vehicle.dealership.name}</p>
            <p className="text-sm text-gray-600 mt-1">{vehicle.dealership.addressLine}</p>
            <p className="text-sm text-gray-600">{vehicle.dealership.city}/{vehicle.dealership.state}</p>
          </div>

          {/* CTA */}
          <Link href={`/login?next=/agendar?vehicleId=${vehicle.id}`}>
            <Button variant="primary" className="w-full py-3 text-base">
              Agendar Test-Drive
            </Button>
          </Link>
          <p className="text-xs text-center text-gray-400 mt-2">
            Faça login para agendar. Gratuito para o consumidor.
          </p>
        </div>
      </div>
    </div>
  );
}
