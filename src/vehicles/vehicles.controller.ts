import { Controller, Get, Param, Query } from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { get } from 'http';
import { VehicleIdParamDto } from './dtos/requests/car-model-id-param.dto';
import { GetVehiclesQueryDto } from './dtos/requests/get-car-model-query.dto';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('')
  async search(@Query() query: GetVehiclesQueryDto) {}

  @Get(':id')
  async findById(@Param() params: VehicleIdParamDto) {}
}
