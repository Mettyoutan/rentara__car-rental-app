import { IsEnum, IsInt, IsString, Min, IsNotEmpty } from 'class-validator';
import {
  CarModelCategory,
  CarModelFuelType,
  CarModelTransmission,
} from '../../../../generated/prisma/enums';
import { Type } from 'class-transformer';

export class CreateCarModelDto {
  @IsString()
  @IsNotEmpty()
  brand!: string;

  @IsString()
  @IsNotEmpty()
  model!: string;

  @Type(() => Number)
  @IsInt()
  year!: number;

  @IsEnum(CarModelCategory)
  category!: CarModelCategory;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  seats!: number;

  @IsEnum(CarModelTransmission)
  transmission!: CarModelTransmission;

  @IsEnum(CarModelFuelType)
  fuelType!: CarModelFuelType;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  pricePerDay!: number;
}
