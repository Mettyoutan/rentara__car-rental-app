import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CarModelsService } from './car-models.service';
import { CarModelQueryDto } from './dtos/requests/car-model-query.dto';
import { CreateCarModelDto } from './dtos/requests/create-car-model.dto';
import { UpdateCarModelDto } from './dtos/requests/update-car-model.dto';

@Controller('car-models')
export class CarModelsController {
  constructor(private readonly service: CarModelsService) {}

  @Get('search')
  async search(@Query() query: CarModelQueryDto) {
    return this.service.search(query);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() body: CreateCarModelDto) {
    return this.service.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCarModelDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
