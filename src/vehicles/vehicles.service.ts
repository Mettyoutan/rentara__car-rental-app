import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { GetVehiclesQueryDto } from './dtos/requests/get-car-model-query.dto';
import { VehicleItemListDto } from './dtos/responses/vehicle-item-list.dto';
import { VehicleListResponseDto } from './dtos/responses/vehicle-response.dto';
import {
  CarModelCategory,
  CarModelFuelType,
  CarModelTransmission,
} from 'generated/prisma/client';
import { UpdateVehicleDto } from './dtos/requests/update-vehicle.dto';
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace';
import { CreateVehicleDto } from './dtos/requests/create-car-model.dto';

@Injectable()
export class VehiclesService {
  constructor(private readonly db: DatabaseService) {}

  private toVehicleItemListDto(item: {
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
      imageUrl: string;
    }[];
  }): VehicleItemListDto {
    const { images, ...other } = item;
    return {
      ...other,
      primaryImageUrl: images.at(0)?.imageUrl ?? null,
    };
  }

  async search(query: GetVehiclesQueryDto): Promise<VehicleListResponseDto> {
    const skip = (query.page - 1) * query.limit;

    const [items, total] = await Promise.all([
      this.db.carModel.findMany({
        select: {
          id: true,
          model: true,
          brand: true,
          category: true,
          fuelType: true,
          pricePerDay: true,
          transmission: true,
          seats: true,
          year: true,
          images: {
            select: { imageUrl: true },
            where: {
              isPrimary: true,
            },
          },
        },
        skip,
        take: query.limit,
        where: {
          fuelType: query.fuelType,
          category: query.category,
          seats: { gte: query.minSeats, lte: query.maxSeats },
          transmission: query.transmission,
          pricePerDay: { gte: query.minPrice, lte: query.maxPrice },
        },
      }),
      this.db.carModel.count(),
    ]);

    const dtos = items.map((item) => this.toVehicleItemListDto(item));

    return {
      items: dtos,
      meta: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async getById(id: string): Promise<VehicleItemListDto> {
    const item = await this.db.carModel.findUnique({
      select: {
        id: true,
        model: true,
        brand: true,
        category: true,
        fuelType: true,
        pricePerDay: true,
        seats: true,
        transmission: true,
        year: true,
        images: {
          select: { imageUrl: true },
          where: { isPrimary: true },
        },
      },
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException('Item not found.');
    }

    return this.toVehicleItemListDto(item);
  }

  /**
   * * Membuat carModel beserta images nya
   * @param createVehicleDto
   */
  async create(createVehicleDto: CreateVehicleDto) {
    await this.db.$transaction(async (tx) => {
      await tx.carModel.create({
        select: {
          id: true,
          model: true,
          brand: true,
          category: true,
          fuelType: true,
          pricePerDay: true,
          seats: true,
          transmission: true,
          year: true,
          images: {
            select: { imageUrl: true },
            where: { isPrimary: true },
          },
        },
        data: createVehicleDto,
      });
    });
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    try {
      const item = await this.db.carModel.update({
        select: {
          id: true,
          model: true,
          brand: true,
          category: true,
          fuelType: true,
          pricePerDay: true,
          seats: true,
          transmission: true,
          year: true,
          images: {
            select: { imageUrl: true },
            where: { isPrimary: true },
          },
        },
        where: {
          id,
        },
        data: updateVehicleDto,
      });

      return this.toVehicleItemListDto(item);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Vehicle not found');
      }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.db.carModel.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Vehicle not found');
      }
    }

    return;
  }
}
