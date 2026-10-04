import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import {
  CarModelCategory,
  CarModelFuelType,
  CarModelTransmission,
} from 'generated/prisma/enums';

export class CarModelQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(CarModelCategory)
  category?: CarModelCategory;

  @IsOptional()
  @IsEnum(CarModelTransmission)
  transmission?: CarModelTransmission;

  @IsOptional()
  @IsEnum(CarModelFuelType)
  fuelType?: CarModelFuelType;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  minSeats?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;
}
