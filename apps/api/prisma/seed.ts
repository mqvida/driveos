import { PrismaClient, FuelType, VehicleCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ── Concessionárias ────────────────────────────────────────────────────────
  const toyota = await prisma.dealership.upsert({
    where: { cnpj: "11.111.111/0001-11" },
    update: {},
    create: {
      cnpj: "11.111.111/0001-11",
      name: "Toyota Morumbi",
      addressLine: "Av. das Nações Unidas, 12551",
      city: "São Paulo",
      state: "SP",
      locationLat: -23.5989,
      locationLng: -46.6882,
      brands: ["Toyota"],
      subscriptionActive: true,
    },
  });

  const vwfiat = await prisma.dealership.upsert({
    where: { cnpj: "22.222.222/0001-22" },
    update: {},
    create: {
      cnpj: "22.222.222/0001-22",
      name: "VW Fiat Centro",
      addressLine: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      locationLat: -23.5614,
      locationLng: -46.6558,
      brands: ["Volkswagen", "Fiat"],
      subscriptionActive: true,
    },
  });

  const chevhonda = await prisma.dealership.upsert({
    where: { cnpj: "33.333.333/0001-33" },
    update: {},
    create: {
      cnpj: "33.333.333/0001-33",
      name: "Chevrolet Honda Zona Norte",
      addressLine: "Av. Voluntários da Pátria, 4200",
      city: "São Paulo",
      state: "SP",
      locationLat: -23.4853,
      locationLng: -46.6257,
      brands: ["Chevrolet", "Honda"],
      subscriptionActive: true,
    },
  });

  // ── Veículos — Toyota ──────────────────────────────────────────────────────
  const vehicles: {
    brand: string; model: string; year: number;
    fuelType: FuelType; category: VehicleCategory;
    priceFrom: number; engineCc: number; powerHp: number;
    torqueNm: number; dealershipId: string;
  }[] = [
    { brand: "Toyota", model: "Corolla Cross", year: 2024, fuelType: FuelType.FLEX, category: VehicleCategory.SUV, priceFrom: 189990, engineCc: 2000, powerHp: 177, torqueNm: 192, dealershipId: toyota.id },
    { brand: "Toyota", model: "Yaris", year: 2024, fuelType: FuelType.FLEX, category: VehicleCategory.HATCHBACK, priceFrom: 99990, engineCc: 1500, powerHp: 107, torqueNm: 143, dealershipId: toyota.id },
    { brand: "Toyota", model: "Hilux", year: 2024, fuelType: FuelType.DIESEL, category: VehicleCategory.PICKUP, priceFrom: 249990, engineCc: 2800, powerHp: 204, torqueNm: 500, dealershipId: toyota.id },
    { brand: "Toyota", model: "Corolla", year: 2024, fuelType: FuelType.HYBRID, category: VehicleCategory.SEDAN, priceFrom: 179990, engineCc: 1800, powerHp: 122, torqueNm: 142, dealershipId: toyota.id },
    { brand: "Toyota", model: "SW4", year: 2024, fuelType: FuelType.DIESEL, category: VehicleCategory.SUV, priceFrom: 399990, engineCc: 2800, powerHp: 204, torqueNm: 500, dealershipId: toyota.id },

    // ── Volkswagen / Fiat ──────────────────────────────────────────────────
    { brand: "Volkswagen", model: "T-Cross", year: 2024, fuelType: FuelType.FLEX, category: VehicleCategory.SUV, priceFrom: 149990, engineCc: 1000, powerHp: 128, torqueNm: 200, dealershipId: vwfiat.id },
    { brand: "Volkswagen", model: "Polo", year: 2024, fuelType: FuelType.FLEX, category: VehicleCategory.HATCHBACK, priceFrom: 95990, engineCc: 1000, powerHp: 116, torqueNm: 200, dealershipId: vwfiat.id },
    { brand: "Fiat", model: "Pulse", year: 2024, fuelType: FuelType.FLEX, category: VehicleCategory.SUV, priceFrom: 109990, engineCc: 1000, powerHp: 130, torqueNm: 200, dealershipId: vwfiat.id },
    { brand: "Fiat", model: "Strada", year: 2024, fuelType: FuelType.FLEX, category: VehicleCategory.PICKUP, priceFrom: 139990, engineCc: 1300, powerHp: 109, torqueNm: 139, dealershipId: vwfiat.id },
    { brand: "Fiat", model: "Argo", year: 2024, fuelType: FuelType.FLEX, category: VehicleCategory.HATCHBACK, priceFrom: 89990, engineCc: 1000, powerHp: 75, torqueNm: 101, dealershipId: vwfiat.id },

    // ── Chevrolet / Honda ──────────────────────────────────────────────────
    { brand: "Chevrolet", model: "Onix", year: 2024, fuelType: FuelType.FLEX, category: VehicleCategory.HATCHBACK, priceFrom: 79990, engineCc: 1000, powerHp: 116, torqueNm: 166, dealershipId: chevhonda.id },
    { brand: "Chevrolet", model: "Tracker", year: 2024, fuelType: FuelType.FLEX, category: VehicleCategory.SUV, priceFrom: 139990, engineCc: 1000, powerHp: 116, torqueNm: 166, dealershipId: chevhonda.id },
    { brand: "Chevrolet", model: "Montana", year: 2024, fuelType: FuelType.FLEX, category: VehicleCategory.PICKUP, priceFrom: 149990, engineCc: 1200, powerHp: 133, torqueNm: 220, dealershipId: chevhonda.id },
    { brand: "Honda", model: "HR-V", year: 2024, fuelType: FuelType.FLEX, category: VehicleCategory.SUV, priceFrom: 169990, engineCc: 1500, powerHp: 126, torqueNm: 155, dealershipId: chevhonda.id },
    { brand: "Honda", model: "Civic", year: 2024, fuelType: FuelType.GASOLINE, category: VehicleCategory.SEDAN, priceFrom: 189990, engineCc: 1500, powerHp: 182, torqueNm: 240, dealershipId: chevhonda.id },
  ];

  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { id: `seed-${v.brand}-${v.model}`.toLowerCase().replace(/\s/g, "-") },
      update: { priceFrom: v.priceFrom },
      create: {
        id: `seed-${v.brand}-${v.model}`.toLowerCase().replace(/\s/g, "-"),
        ...v,
      },
    });
  }

  console.log(`✅ Seed concluído: ${vehicles.length} veículos em 3 concessionárias.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
