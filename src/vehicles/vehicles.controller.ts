import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dtos/requests/create-vehicle.dto';
import { VehicleQueryDto } from './dtos/requests/vehicle-query.dto';
import { UpdateVehicleDto } from './dtos/requests/update-vehicle.dto';

@Controller('car-models/:carModelId/vehicles')
export class VehiclesController {
  constructor(private readonly service: VehiclesService) {}

  @Get()
  search(
    @Param('carModelId', ParseUUIDPipe) carModelId: string,
    @Query() query: VehicleQueryDto,
  ) {
    return this.service.search(carModelId, query);
  }

  @Get(':vehicleId')
  findById(
    @Param('carModelId', ParseUUIDPipe) carModelId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
  ) {
    return this.service.findById(carModelId, vehicleId);
  }

  @Post()
  create(
    @Param('carModelId', ParseUUIDPipe) carModelId: string,
    @Body() body: CreateVehicleDto,
  ) {
    return this.service.create(carModelId, body);
  }

  @Patch(':vehicleId')
  update(
    @Param('carModelId', ParseUUIDPipe) carModelId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body() body: UpdateVehicleDto,
  ) {
    return this.service.update(carModelId, vehicleId, body);
  }

  @Delete(':vehicleId')
  remove(
    @Param('carModelId', ParseUUIDPipe) carModelId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
  ) {
    return this.service.remove(carModelId, vehicleId);
  }
}
