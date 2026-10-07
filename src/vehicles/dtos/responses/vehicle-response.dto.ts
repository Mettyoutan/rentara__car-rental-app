import { VehicleStatus } from 'generated/prisma/enums';

export class VehicleBranchSummaryDto {
  id!: string;
  name!: string;
  city!: string;
}

export class VehicleResponseDto {
  id!: string;
  licensePlate!: string;
  vin!: string;
  currentMileageKm!: number;
  status!: VehicleStatus;
  currentBranch!: VehicleBranchSummaryDto;
  createdAt!: Date;
  updatedAt!: Date;
}

export class VehiclePaginationDto {
  items!: VehicleResponseDto[];
  meta!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
