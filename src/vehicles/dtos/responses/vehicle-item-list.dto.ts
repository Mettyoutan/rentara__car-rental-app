import {
  CarModelFuelType,
  CarModelTransmission,
  type CarModelCategory,
} from 'generated/prisma/client';

export type VehicleItemListDto = {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: CarModelCategory;
  seats: number;
  transmission: CarModelTransmission;
  fuelType: CarModelFuelType;
  pricePerDay: number;
  primaryImageUrl: string | null;
};
