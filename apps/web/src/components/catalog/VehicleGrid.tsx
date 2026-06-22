import type { VehicleListItem } from "@driveos/shared";
import { VehicleCard } from "./VehicleCard";

interface VehicleGridProps {
  vehicles: VehicleListItem[];
  total: number;
  page: number;
}

export function VehicleGrid({ vehicles, total, page }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-lg">Nenhum veículo encontrado.</p>
        <p className="text-sm mt-1">Tente ajustar os filtros.</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <p className="text-sm text-gray-500 mb-4">
        Mostrando{" "}
        <span className="font-medium text-gray-900">{vehicles.length}</span> de{" "}
        <span className="font-medium text-gray-900">{total}</span> veículos
        {page > 1 && ` — página ${page}`}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    </div>
  );
}
