import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  licensePlate!: string;

  @IsString()
  @IsNotEmpty()
  vin!: string;

  @Type(() => Number)
  @IsInt()
  currentMileageKm!: number;

  @IsUUID()
  currentBranchId!: string;
}
