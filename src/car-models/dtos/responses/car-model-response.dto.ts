export class CarModelImageResponseDto {
  id!: string;
  imageUrl!: string;
  storageKey!: string;
  sortOrder!: number;
  isPrimary!: boolean;
}

export class CarModelResponseDto {
  id!: string;
  brand!: string;
  model!: string;
  year!: number;
  category!: string;
  seats!: number;
  transmission!: string;
  fuelType!: string;
  pricePerDay!: number;

  images!: CarModelImageResponseDto[];

  createdAt!: Date;
  updatedAt!: Date;
}

export class CarModelPaginationDto {
  items!: CarModelResponseDto[];
  meta!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
