import Link from "next/link";
import type { VehicleListItem } from "@driveos/shared";
import { Button } from "@/components/ui/Button";

const FUEL_LABELS: Record<string, string> = {
  FLEX: "Flex", GASOLINE: "Gasolina", ELECTRIC: "Elétrico",
  HYBRID: "Híbrido", DIESEL: "Diesel",
};

const CATEGORY_LABELS: Record<string, string> = {
  SEDAN: "Sedã", SUV: "SUV", HATCHBACK: "Hatchback",
  PICKUP: "Picape", COUPE: "Cupê",
};

function formatPrice(value: string | number): string {
  return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

interface VehicleCardProps {
  vehicle: VehicleListItem;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            {vehicle.brand}
          </span>
          <h3 className="mt-1 text-lg font-bold text-gray-900">{vehicle.model}</h3>
          <p className="text-sm text-gray-500">{vehicle.year}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-gray-900">{formatPrice(vehicle.priceFrom)}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
          {CATEGORY_LABELS[vehicle.category] ?? vehicle.category}
        </span>
        <span className="text-xs px-2 py-0.5 bg-green-50 rounded-full text-green-700">
          {FUEL_LABELS[vehicle.fuelType] ?? vehicle.fuelType}
        </span>
        {vehicle.powerHp && (
          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
            {vehicle.powerHp} cv
          </span>
        )}
      </div>

      <p className="text-xs text-gray-400">
        {vehicle.dealership.name} · {vehicle.dealership.city}/{vehicle.dealership.state}
      </p>

      <Link href={`/veiculos/${vehicle.id}`} className="mt-auto">
        <Button variant="primary" className="w-full text-sm">
          Ver detalhes
        </Button>
      </Link>
    </div>
  );
}
