"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/Button";

const BRANDS = ["Toyota", "Volkswagen", "Fiat", "Chevrolet", "Honda"];

const CATEGORIES = [
  { value: "SUV", label: "SUV" },
  { value: "HATCHBACK", label: "Hatchback" },
  { value: "SEDAN", label: "Sedã" },
  { value: "PICKUP", label: "Picape" },
  { value: "COUPE", label: "Cupê" },
];

const FUEL_TYPES = [
  { value: "FLEX", label: "Flex" },
  { value: "GASOLINE", label: "Gasolina" },
  { value: "ELECTRIC", label: "Elétrico" },
  { value: "HYBRID", label: "Híbrido" },
  { value: "DIESEL", label: "Diesel" },
];

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  function clearFilters() {
    router.push(pathname);
  }

  const currentBrand = searchParams.get("brand") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentFuel = searchParams.get("fuelType") ?? "";
  const hasFilters = currentBrand || currentCategory || currentFuel;

  return (
    <aside className="w-56 shrink-0 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Filtros</h2>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-blue-600 hover:underline">
            Limpar
          </button>
        )}
      </div>

      {/* Marca */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Marca</p>
        <div className="space-y-1">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="brand"
                value={brand}
                checked={currentBrand === brand}
                onChange={() => updateFilter("brand", currentBrand === brand ? null : brand)}
                className="accent-blue-600"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categoria */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Categoria</p>
        <select
          value={currentCategory}
          onChange={(e) => updateFilter("category", e.target.value || null)}
          className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm"
        >
          <option value="">Todas</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Combustível */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Combustível</p>
        <select
          value={currentFuel}
          onChange={(e) => updateFilter("fuelType", e.target.value || null)}
          className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm"
        >
          <option value="">Todos</option>
          {FUEL_TYPES.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      <Button variant="secondary" className="w-full text-sm" onClick={clearFilters}>
        Limpar filtros
      </Button>
    </aside>
  );
}
