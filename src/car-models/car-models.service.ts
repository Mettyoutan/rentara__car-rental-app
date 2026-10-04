import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CarModelQueryDto } from './dtos/requests/car-model-query.dto';
import {
  CarModelPaginationDto,
  CarModelResponseDto,
} from './dtos/responses/car-model-response.dto';
import { CarModel, CarModelImage } from 'generated/prisma/client';
import { UpdateCarModelDto } from './dtos/requests/update-car-model.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/wasm-compiler-edge';
import { CreateCarModelDto } from './dtos/requests/create-car-model.dto';

@Injectable()
export class CarModelsService {
  constructor(private readonly db: DatabaseService) {}

  private toResponse(
    item: CarModel & { images: CarModelImage[] },
  ): CarModelResponseDto {
    return {
      id: item.id,
      brand: item.brand,
      model: item.model,
      category: item.category,
      year: item.year,
      seats: item.seats,
      transmission: item.transmission,
      fuelType: item.fuelType,
      pricePerDay: item.pricePerDay,
      images: item.images,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  async search(query: CarModelQueryDto): Promise<CarModelPaginationDto> {
    const {
      search,
      category,
      transmission,
      fuelType,
      minSeats,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = query;

    const skip = (query.page - 1) * query.limit;

    const [items, total] = await Promise.all([
      this.db.carModel.findMany({
        skip,
        take: query.limit,
        include: { images: true },
        where: {
          ...(query.search && {
            OR: [
              {
                brand: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                model: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }),

          ...(category && { category }),
          ...(transmission && { transmission }),
          ...(fuelType && { fuelType }),

          ...(minSeats !== undefined && {
            seats: {
              gte: minSeats,
            },
          }),

          ...(minPrice !== undefined && {
            pricePerDay: {
              gte: minPrice,
            },
          }),

          ...(maxPrice !== undefined && {
            pricePerDay: {
              lte: maxPrice,
            },
          }),
        },
      }),

      //* Count
      this.db.carModel.count(),
    ]);

    const dtos = items.map((item) => this.toResponse(item));

    return {
      items: dtos,
      meta: {
        page: page,
        limit: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string): Promise<CarModelResponseDto> {
    const item = await this.db.carModel.findUnique({
      include: { images: true },
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException('Car model not found.');
    }

    return this.toResponse(item);
  }

  async create(data: CreateCarModelDto): Promise<CarModelResponseDto> {
    const item = await this.db.$transaction(async (tx) => {
      return await tx.carModel.create({
        include: { images: true },
        data,
      });
    });

    return item;
  }

  async update(
    id: string,
    data: UpdateCarModelDto,
  ): Promise<CarModelResponseDto> {
    try {
      const item = await this.db.carModel.update({
        include: { images: true },
        where: {
          id,
        },
        data,
      });

      return this.toResponse(item);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Car moddel not found');
      }

      throw new InternalServerErrorException(
        'Something went wrong while updating car model',
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.db.carModel.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Car model not found');
      }
    }

    return;
  }
}
