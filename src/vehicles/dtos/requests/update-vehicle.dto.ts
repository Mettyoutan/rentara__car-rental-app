import { VehicleStatus } from 'generated/prisma/enums';
import { IsEnum, IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateVehicleDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  currentMileageKm?: number;

  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;

  @IsOptional()
  @IsUUID()
  currentBranchId?: string;
}
