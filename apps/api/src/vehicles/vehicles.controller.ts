import { Controller, Get, Param, Query } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service.js";
import { VehicleFilterDto } from "./dto/vehicle-filter.dto.js";

@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  findAll(@Query() filter: VehicleFilterDto) {
    return this.vehiclesService.findAll(filter);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.vehiclesService.findOne(id);
  }
}
