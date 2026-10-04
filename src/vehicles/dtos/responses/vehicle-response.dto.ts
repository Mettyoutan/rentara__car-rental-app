import { VehicleItemListDto } from './vehicle-item-list.dto';

export type VehicleListResponseDto = {
  items: VehicleItemListDto[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
