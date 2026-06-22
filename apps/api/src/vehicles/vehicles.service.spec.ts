import "reflect-metadata";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service.js";
import { PrismaService } from "../prisma/prisma.service.js";

const mockVehicle = {
  id: "v1",
  brand: "Toyota",
  model: "Corolla Cross",
  year: 2024,
  fuelType: "FLEX",
  category: "SUV",
  priceFrom: 189990,
  active: true,
  dealership: { id: "d1", name: "Toyota SP", city: "São Paulo", state: "SP" },
};

describe("VehiclesService", () => {
  let service: VehiclesService;
  let prisma: {
    vehicle: {
      findMany: ReturnType<typeof vi.fn>;
      count: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
    };
  };

  beforeEach(async () => {
    prisma = {
      vehicle: {
        findMany: vi.fn().mockResolvedValue([mockVehicle]),
        count: vi.fn().mockResolvedValue(1),
        findUnique: vi.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get(VehiclesService);
  });

  it("findAll() retorna lista paginada de veículos", async () => {
    const result = await service.findAll({ page: 1, limit: 20 });
    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.page).toBe(1);
  });

  it("findAll() filtra por marca corretamente", async () => {
    await service.findAll({ brand: "Toyota", page: 1, limit: 20 });
    expect(prisma.vehicle.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          brand: { contains: "Toyota", mode: "insensitive" },
        }),
      })
    );
  });

  it("findOne() lança NotFoundException para id inexistente", async () => {
    prisma.vehicle.findUnique.mockResolvedValue(null);
    await expect(service.findOne("inexistente")).rejects.toThrow(NotFoundException);
  });
});
