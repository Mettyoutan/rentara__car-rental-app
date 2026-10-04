import {
  CarModelCategory,
  CarModelFuelType,
  CarModelTransmission,
  VehicleStatus,
} from 'generated/prisma/enums';
import { VehicleItemListDto } from './vehicle-item-list.dto';

export type VehicleDetailsDto = {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: CarModelCategory;
  seats: number;
  transmission: CarModelTransmission;
  fuelType: CarModelFuelType;
  pricePerDay: number;

  images: {
    id: string;
    imageUrl: string;
    sortOrder: number;
    isPrimary: boolean;
  }[];
};
