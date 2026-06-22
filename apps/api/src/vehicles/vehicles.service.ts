import { Injectable, NotFoundException } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";
import type { VehicleFilterDto } from "./dto/vehicle-filter.dto.js";

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter: VehicleFilterDto) {
    const where: Prisma.VehicleWhereInput = {
      active: true,
      ...(filter.brand && { brand: { contains: filter.brand, mode: "insensitive" } }),
      ...(filter.category && { category: filter.category }),
      ...(filter.fuelType && { fuelType: filter.fuelType }),
      ...(filter.minPrice !== undefined || filter.maxPrice !== undefined
        ? {
            priceFrom: {
              ...(filter.minPrice !== undefined && { gte: filter.minPrice }),
              ...(filter.maxPrice !== undefined && { lte: filter.maxPrice }),
            },
          }
        : {}),
    };

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        include: {
          dealership: { select: { id: true, name: true, city: true, state: true } },
        },
        skip,
        take: limit,
        orderBy: { priceFrom: "asc" },
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        dealership: {
          select: {
            id: true,
            name: true,
            addressLine: true,
            city: true,
            state: true,
            locationLat: true,
            locationLng: true,
          },
        },
      },
    });

    if (!vehicle || !vehicle.active) {
      throw new NotFoundException("Veículo não encontrado");
    }

    return vehicle;
  }
}
