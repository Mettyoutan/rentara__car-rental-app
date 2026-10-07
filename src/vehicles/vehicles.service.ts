import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { VehicleQueryDto } from './dtos/requests/vehicle-query.dto';
import { CreateVehicleDto } from './dtos/requests/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/requests/update-vehicle.dto';
import {
  VehiclePaginationDto,
  VehicleResponseDto,
} from './dtos/responses/vehicle-response.dto';
import { VehicleStatus } from 'generated/prisma/enums';
import { Decimal } from 'generated/prisma/internal/prismaNamespace';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class VehiclesService {
  constructor(private readonly db: DatabaseService) {}

  private toResponse(
    vehicle: {
      currentBranch: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string;
        city: string;
        latitude: Decimal;
        longitude: Decimal;
        isActive: boolean;
      };
    } & {
      id: string;
      status: VehicleStatus;
      currentBranchId: string;
      carModelId: string;
      licensePlate: string;
      vin: string;
      currentMileageKm: number;
      createdAt: Date;
      updatedAt: Date;
    },
  ): VehicleResponseDto {
    return {
      id: vehicle.id,
      licensePlate: vehicle.licensePlate,
      vin: vehicle.vin,
      currentMileageKm: vehicle.currentMileageKm,
      status: vehicle.status,
      currentBranch: { ...vehicle.currentBranch },
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    };
  }

  async search(
    carModelId: string,
    query: VehicleQueryDto,
  ): Promise<VehiclePaginationDto> {
    const { search, status, currentBranchId, page, limit } = query;

    const skip = (page - 1) * limit;

    const [vehicles, total] = await this.db.$transaction([
      this.db.vehicle.findMany({
        take: limit,
        skip,
        where: {
          // Pakai CarModelId
          carModelId,
          // Search dihubungkan dengan licensePlate atau vin
          OR: [
            { licensePlate: { contains: search, mode: 'insensitive' } },
            { vin: { contains: search, mode: 'insensitive' } },
          ],
          status,
          currentBranchId,
        },
        include: { currentBranch: true },
      }),
      // Count all
      this.db.vehicle.count(),
    ]);

    const responses = vehicles.map((vehicle) => this.toResponse(vehicle));

    return {
      items: responses,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(
    carModelId: string,
    vehicleId: string,
  ): Promise<VehicleResponseDto> {
    const vehicle = await this.db.vehicle.findUnique({
      where: {
        id: vehicleId,
        carModelId,
      },
      include: { currentBranch: true },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found.');
    }

    return this.toResponse(vehicle);
  }

  async create(
    carModelId: string,
    dto: CreateVehicleDto,
  ): Promise<VehicleResponseDto> {
    try {
      const vehicle = await this.db.vehicle.create({
        data: {
          carModelId,
          ...dto,
        },
        include: { currentBranch: true },
      });

      return this.toResponse(vehicle);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2022') {
          throw new ConflictException('License plate or VIN already exists.');
        }

        if (e.code === 'P2023') {
          throw new BadRequestException('Invalid car model or branch.');
        }
      }

      throw new InternalServerErrorException(
        'Something went wrong while create vehicle.',
      );
    }
  }

  async update(
    carModelId: string,
    vehicleId: string,
    dto: UpdateVehicleDto,
  ): Promise<VehicleResponseDto> {
    try {
      const vehicle = await this.db.vehicle.update({
        where: { id: vehicleId, carModelId },
        data: dto,

        include: { currentBranch: true },
      });

      return this.toResponse(vehicle);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException('Vehicle not found.');
        }
        if (e.code === 'P2023') {
          throw new BadRequestException('Invalid branch.');
        }
      }

      throw new InternalServerErrorException(
        'Something went wrong while update vehicle',
      );
    }
  }

  async remove(carModelId: string, vehicleId: string): Promise<void> {
    try {
      await this.db.vehicle.delete({
        where: { id: vehicleId, carModelId },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Vehicle not found.');
      }

      throw new InternalServerErrorException(
        'Something went wrong while remove vehicle.',
      );
    }
  }
}
