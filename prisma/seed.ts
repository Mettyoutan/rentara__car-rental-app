import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL does not exists');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const USER_IDS = {
  ADMIN: 'a0000000-0000-0000-0000-000000000001',
  ANDI: 'a0000000-0000-0000-0000-000000000002',
  BUDI: 'a0000000-0000-0000-0000-000000000003',
  CITRA: 'a0000000-0000-0000-0000-000000000004',
} as const;

const BRANCH_IDS = {
  KEMANGGISAN: 'b0000000-0000-0000-0000-000000000001',
  TB_SIMATUPANG: 'b0000000-0000-0000-0000-000000000002',
  BSD: 'b0000000-0000-0000-0000-000000000003',
  DEPOK: 'b0000000-0000-0000-0000-000000000004',
  BEKASI: 'b0000000-0000-0000-0000-000000000005',
} as const;

const CAR_MODEL_IDS = {
  AVANZA: 'c0000000-0000-0000-0000-000000000001',
  INNOVA_REBORN: 'c0000000-0000-0000-0000-000000000002',
  INNOVA_ZENIX: 'c0000000-0000-0000-0000-000000000003',
  BRIO: 'c0000000-0000-0000-0000-000000000004',
  BRV: 'c0000000-0000-0000-0000-000000000005',
  CRV: 'c0000000-0000-0000-0000-000000000006',
  FORTUNER: 'c0000000-0000-0000-0000-000000000007',
  YARIS: 'c0000000-0000-0000-0000-000000000008',
} as const;

const VEHICLE_IDS = {
  V1: '10000000-0000-0000-0000-000000000001',
  V2: '10000000-0000-0000-0000-000000000002',
  V3: '10000000-0000-0000-0000-000000000003',
  V4: '10000000-0000-0000-0000-000000000004',
  V5: '10000000-0000-0000-0000-000000000005',
  V6: '10000000-0000-0000-0000-000000000006',
  V7: '10000000-0000-0000-0000-000000000007',
  V8: '10000000-0000-0000-0000-000000000008',
  V9: '10000000-0000-0000-0000-000000000009',
  V10: '10000000-0000-0000-0000-000000000010',
  V11: '10000000-0000-0000-0000-000000000011',
  V12: '10000000-0000-0000-0000-000000000012',
  V13: '10000000-0000-0000-0000-000000000013',
  V14: '10000000-0000-0000-0000-000000000014',
  V15: '10000000-0000-0000-0000-000000000015',
  V16: '10000000-0000-0000-0000-000000000016',
} as const;

const BOOKING_IDS = {
  B1: 'e0000000-0000-0000-0000-000000000001',
  B2: 'e0000000-0000-0000-0000-000000000002',
  B3: 'e0000000-0000-0000-0000-000000000003',
  B4: 'e0000000-0000-0000-0000-000000000004',
  B5: 'e0000000-0000-0000-0000-000000000005',
} as const;

const PAYMENT_IDS = {
  P1: '20000000-0000-0000-0000-000000000001',
  P2: '20000000-0000-0000-0000-000000000002',
  P3: '20000000-0000-0000-0000-000000000003',
  P4: '20000000-0000-0000-0000-000000000004',
  P5: '20000000-0000-0000-0000-000000000005',
  P6: '20000000-0000-0000-0000-000000000006',
} as const;

async function main() {
  const passwordHash = await bcrypt.hash('Rentara123!', 10);

  await prisma.$transaction(async (tx) => {
    // =========================================================
    // 1. USERS
    // =========================================================

    await tx.user.createMany({
      data: [
        {
          id: USER_IDS.ADMIN,
          name: 'Rentara Admin',
          email: 'admin@rentara.dev',
          passwordHash,
          role: 'ADMIN',
          phone: '081234567800',
        },
        {
          id: USER_IDS.ANDI,
          name: 'Andi Pratama',
          email: 'andi@example.com',
          passwordHash,
          role: 'CUSTOMER',
          phone: '081234567801',
        },
        {
          id: USER_IDS.BUDI,
          name: 'Budi Santoso',
          email: 'budi@example.com',
          passwordHash,
          role: 'CUSTOMER',
          phone: '081234567802',
        },
        {
          id: USER_IDS.CITRA,
          name: 'Citra Lestari',
          email: 'citra@example.com',
          passwordHash,
          role: 'CUSTOMER',
          phone: '081234567803',
        },
      ],
    });

    // =========================================================
    // 2. BRANCHES
    // =========================================================

    await tx.branch.createMany({
      data: [
        {
          id: BRANCH_IDS.KEMANGGISAN,
          name: 'Rentara Kemanggisan',
          city: 'Jakarta',
          address: 'Jl. Kemanggisan Raya, Jakarta Barat',
          latitude: -6.1886,
          longitude: 106.7607,
          isActive: true,
        },
        {
          id: BRANCH_IDS.TB_SIMATUPANG,
          name: 'Rentara TB Simatupang',
          city: 'Jakarta',
          address: 'Jl. TB Simatupang, Jakarta Selatan',
          latitude: -6.2923,
          longitude: 106.7889,
          isActive: true,
        },
        {
          id: BRANCH_IDS.BSD,
          name: 'Rentara BSD',
          city: 'Tangerang Selatan',
          address: 'Jl. BSD Raya, Tangerang Selatan',
          latitude: -6.3017,
          longitude: 106.6527,
          isActive: true,
        },
        {
          id: BRANCH_IDS.DEPOK,
          name: 'Rentara Depok',
          city: 'Depok',
          address: 'Jl. Margonda Raya, Depok',
          latitude: -6.3862,
          longitude: 106.8328,
          isActive: true,
        },
        {
          id: BRANCH_IDS.BEKASI,
          name: 'Rentara Bekasi',
          city: 'Bekasi',
          address: 'Jl. Ahmad Yani, Bekasi',
          latitude: -6.2383,
          longitude: 106.9927,
          isActive: true,
        },
      ],
    });

    // =========================================================
    // 3. CAR MODELS
    // =========================================================

    await tx.carModel.createMany({
      data: [
        {
          id: CAR_MODEL_IDS.AVANZA,
          brand: 'Toyota',
          model: 'Avanza',
          year: 2024,
          category: 'MPV',
          seats: 7,
          transmission: 'AUTOMATIC',
          fuelType: 'GASOLINE',
          pricePerDay: 450000,
          isActive: true,
        },
        {
          id: CAR_MODEL_IDS.INNOVA_REBORN,
          brand: 'Toyota',
          model: 'Innova Reborn',
          year: 2024,
          category: 'MPV',
          seats: 7,
          transmission: 'AUTOMATIC',
          fuelType: 'DIESEL',
          pricePerDay: 650000,
          isActive: true,
        },
        {
          id: CAR_MODEL_IDS.INNOVA_ZENIX,
          brand: 'Toyota',
          model: 'Innova Zenix',
          year: 2025,
          category: 'MPV',
          seats: 7,
          transmission: 'AUTOMATIC',
          fuelType: 'HYBRID',
          pricePerDay: 850000,
          isActive: true,
        },
        {
          id: CAR_MODEL_IDS.BRIO,
          brand: 'Honda',
          model: 'Brio',
          year: 2024,
          category: 'HATCHBACK',
          seats: 5,
          transmission: 'AUTOMATIC',
          fuelType: 'GASOLINE',
          pricePerDay: 350000,
          isActive: true,
        },
        {
          id: CAR_MODEL_IDS.BRV,
          brand: 'Honda',
          model: 'BR-V',
          year: 2024,
          category: 'SUV',
          seats: 7,
          transmission: 'AUTOMATIC',
          fuelType: 'GASOLINE',
          pricePerDay: 550000,
          isActive: true,
        },
        {
          id: CAR_MODEL_IDS.CRV,
          brand: 'Honda',
          model: 'CR-V',
          year: 2024,
          category: 'SUV',
          seats: 5,
          transmission: 'AUTOMATIC',
          fuelType: 'GASOLINE',
          pricePerDay: 900000,
          isActive: true,
        },
        {
          id: CAR_MODEL_IDS.FORTUNER,
          brand: 'Toyota',
          model: 'Fortuner',
          year: 2024,
          category: 'SUV',
          seats: 7,
          transmission: 'AUTOMATIC',
          fuelType: 'DIESEL',
          pricePerDay: 1000000,
          isActive: true,
        },
        {
          id: CAR_MODEL_IDS.YARIS,
          brand: 'Toyota',
          model: 'Yaris',
          year: 2024,
          category: 'HATCHBACK',
          seats: 5,
          transmission: 'AUTOMATIC',
          fuelType: 'GASOLINE',
          pricePerDay: 400000,
          isActive: true,
        },
      ],
    });

    // =========================================================
    // 4. CAR MODEL IMAGES
    // =========================================================

    await tx.carModelImage.createMany({
      data: [
        // Avanza
        {
          id: 'd0000000-0000-0000-0000-000000000001',
          carModelId: CAR_MODEL_IDS.AVANZA,
          imageUrl: '/seed-images/avanza-front.jpg',
          storageKey: 'seed/avanza/front.jpg',
          sortOrder: 0,
          isPrimary: true,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000002',
          carModelId: CAR_MODEL_IDS.AVANZA,
          imageUrl: '/seed-images/avanza-side.jpg',
          storageKey: 'seed/avanza/side.jpg',
          sortOrder: 1,
          isPrimary: false,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000003',
          carModelId: CAR_MODEL_IDS.AVANZA,
          imageUrl: '/seed-images/avanza-interior.jpg',
          storageKey: 'seed/avanza/interior.jpg',
          sortOrder: 2,
          isPrimary: false,
        },

        // Innova Reborn
        {
          id: 'd0000000-0000-0000-0000-000000000004',
          carModelId: CAR_MODEL_IDS.INNOVA_REBORN,
          imageUrl: '/seed-images/innova-reborn-front.jpg',
          storageKey: 'seed/innova-reborn/front.jpg',
          sortOrder: 0,
          isPrimary: true,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000005',
          carModelId: CAR_MODEL_IDS.INNOVA_REBORN,
          imageUrl: '/seed-images/innova-reborn-side.jpg',
          storageKey: 'seed/innova-reborn/side.jpg',
          sortOrder: 1,
          isPrimary: false,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000006',
          carModelId: CAR_MODEL_IDS.INNOVA_REBORN,
          imageUrl: '/seed-images/innova-reborn-interior.jpg',
          storageKey: 'seed/innova-reborn/interior.jpg',
          sortOrder: 2,
          isPrimary: false,
        },

        // Innova Zenix
        {
          id: 'd0000000-0000-0000-0000-000000000007',
          carModelId: CAR_MODEL_IDS.INNOVA_ZENIX,
          imageUrl: '/seed-images/innova-zenix-front.jpg',
          storageKey: 'seed/innova-zenix/front.jpg',
          sortOrder: 0,
          isPrimary: true,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000008',
          carModelId: CAR_MODEL_IDS.INNOVA_ZENIX,
          imageUrl: '/seed-images/innova-zenix-side.jpg',
          storageKey: 'seed/innova-zenix/side.jpg',
          sortOrder: 1,
          isPrimary: false,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000009',
          carModelId: CAR_MODEL_IDS.INNOVA_ZENIX,
          imageUrl: '/seed-images/innova-zenix-interior.jpg',
          storageKey: 'seed/innova-zenix/interior.jpg',
          sortOrder: 2,
          isPrimary: false,
        },

        // Brio
        {
          id: 'd0000000-0000-0000-0000-000000000010',
          carModelId: CAR_MODEL_IDS.BRIO,
          imageUrl: '/seed-images/brio-front.jpg',
          storageKey: 'seed/brio/front.jpg',
          sortOrder: 0,
          isPrimary: true,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000011',
          carModelId: CAR_MODEL_IDS.BRIO,
          imageUrl: '/seed-images/brio-side.jpg',
          storageKey: 'seed/brio/side.jpg',
          sortOrder: 1,
          isPrimary: false,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000012',
          carModelId: CAR_MODEL_IDS.BRIO,
          imageUrl: '/seed-images/brio-interior.jpg',
          storageKey: 'seed/brio/interior.jpg',
          sortOrder: 2,
          isPrimary: false,
        },

        // BR-V
        {
          id: 'd0000000-0000-0000-0000-000000000013',
          carModelId: CAR_MODEL_IDS.BRV,
          imageUrl: '/seed-images/br-v-front.jpg',
          storageKey: 'seed/br-v/front.jpg',
          sortOrder: 0,
          isPrimary: true,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000014',
          carModelId: CAR_MODEL_IDS.BRV,
          imageUrl: '/seed-images/br-v-side.jpg',
          storageKey: 'seed/br-v/side.jpg',
          sortOrder: 1,
          isPrimary: false,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000015',
          carModelId: CAR_MODEL_IDS.BRV,
          imageUrl: '/seed-images/br-v-interior.jpg',
          storageKey: 'seed/br-v/interior.jpg',
          sortOrder: 2,
          isPrimary: false,
        },

        // CR-V
        {
          id: 'd0000000-0000-0000-0000-000000000016',
          carModelId: CAR_MODEL_IDS.CRV,
          imageUrl: '/seed-images/cr-v-front.jpg',
          storageKey: 'seed/cr-v/front.jpg',
          sortOrder: 0,
          isPrimary: true,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000017',
          carModelId: CAR_MODEL_IDS.CRV,
          imageUrl: '/seed-images/cr-v-side.jpg',
          storageKey: 'seed/cr-v/side.jpg',
          sortOrder: 1,
          isPrimary: false,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000018',
          carModelId: CAR_MODEL_IDS.CRV,
          imageUrl: '/seed-images/cr-v-interior.jpg',
          storageKey: 'seed/cr-v/interior.jpg',
          sortOrder: 2,
          isPrimary: false,
        },

        // Fortuner
        {
          id: 'd0000000-0000-0000-0000-000000000019',
          carModelId: CAR_MODEL_IDS.FORTUNER,
          imageUrl: '/seed-images/fortuner-front.jpg',
          storageKey: 'seed/fortuner/front.jpg',
          sortOrder: 0,
          isPrimary: true,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000020',
          carModelId: CAR_MODEL_IDS.FORTUNER,
          imageUrl: '/seed-images/fortuner-side.jpg',
          storageKey: 'seed/fortuner/side.jpg',
          sortOrder: 1,
          isPrimary: false,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000021',
          carModelId: CAR_MODEL_IDS.FORTUNER,
          imageUrl: '/seed-images/fortuner-interior.jpg',
          storageKey: 'seed/fortuner/interior.jpg',
          sortOrder: 2,
          isPrimary: false,
        },

        // Yaris
        {
          id: 'd0000000-0000-0000-0000-000000000022',
          carModelId: CAR_MODEL_IDS.YARIS,
          imageUrl: '/seed-images/yaris-front.jpg',
          storageKey: 'seed/yaris/front.jpg',
          sortOrder: 0,
          isPrimary: true,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000023',
          carModelId: CAR_MODEL_IDS.YARIS,
          imageUrl: '/seed-images/yaris-side.jpg',
          storageKey: 'seed/yaris/side.jpg',
          sortOrder: 1,
          isPrimary: false,
        },
        {
          id: 'd0000000-0000-0000-0000-000000000024',
          carModelId: CAR_MODEL_IDS.YARIS,
          imageUrl: '/seed-images/yaris-interior.jpg',
          storageKey: 'seed/yaris/interior.jpg',
          sortOrder: 2,
          isPrimary: false,
        },
      ],
    });

    // =========================================================
    // 5. VEHICLES
    // =========================================================

    await tx.vehicle.createMany({
      data: [
        {
          id: VEHICLE_IDS.V1,
          licensePlate: 'B 1234 RTA',
          vin: 'JTMAB1AA123456001',
          currentMileageKm: 18500,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.AVANZA,
          currentBranchId: BRANCH_IDS.KEMANGGISAN,
        },
        {
          id: VEHICLE_IDS.V2,
          licensePlate: 'B 1827 RTA',
          vin: 'JTMAB1AA123456002',
          currentMileageKm: 22300,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.AVANZA,
          currentBranchId: BRANCH_IDS.KEMANGGISAN,
        },
        {
          id: VEHICLE_IDS.V3,
          licensePlate: 'B 2231 RTA',
          vin: 'JTMAB1AA123456003',
          currentMileageKm: 31200,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.INNOVA_REBORN,
          currentBranchId: BRANCH_IDS.TB_SIMATUPANG,
        },
        {
          id: VEHICLE_IDS.V4,
          licensePlate: 'B 2278 RTA',
          vin: 'JTMAB1AA123456004',
          currentMileageKm: 28900,
          status: 'MAINTENANCE',
          carModelId: CAR_MODEL_IDS.INNOVA_REBORN,
          currentBranchId: BRANCH_IDS.TB_SIMATUPANG,
        },
        {
          id: VEHICLE_IDS.V5,
          licensePlate: 'B 3234 RTA',
          vin: 'JTMAB1AA123456005',
          currentMileageKm: 12400,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.INNOVA_ZENIX,
          currentBranchId: BRANCH_IDS.BSD,
        },
        {
          id: VEHICLE_IDS.V6,
          licensePlate: 'B 3278 RTA',
          vin: 'JTMAB1AA123456006',
          currentMileageKm: 15800,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.INNOVA_ZENIX,
          currentBranchId: BRANCH_IDS.BSD,
        },
        {
          id: VEHICLE_IDS.V7,
          licensePlate: 'B 4231 RTA',
          vin: 'JTMAB1AA123456007',
          currentMileageKm: 9700,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.BRIO,
          currentBranchId: BRANCH_IDS.DEPOK,
        },
        {
          id: VEHICLE_IDS.V8,
          licensePlate: 'B 4278 RTA',
          vin: 'JTMAB1AA123456008',
          currentMileageKm: 17600,
          status: 'INACTIVE',
          carModelId: CAR_MODEL_IDS.BRIO,
          currentBranchId: BRANCH_IDS.DEPOK,
        },
        {
          id: VEHICLE_IDS.V9,
          licensePlate: 'B 5234 RTA',
          vin: 'JTMAB1AA123456009',
          currentMileageKm: 24800,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.BRV,
          currentBranchId: BRANCH_IDS.BEKASI,
        },
        {
          id: VEHICLE_IDS.V10,
          licensePlate: 'B 5278 RTA',
          vin: 'JTMAB1AA123456010',
          currentMileageKm: 20100,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.BRV,
          currentBranchId: BRANCH_IDS.BEKASI,
        },
        {
          id: VEHICLE_IDS.V11,
          licensePlate: 'B 6231 RTA',
          vin: 'JTMAB1AA123456011',
          currentMileageKm: 14300,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.CRV,
          currentBranchId: BRANCH_IDS.KEMANGGISAN,
        },
        {
          id: VEHICLE_IDS.V12,
          licensePlate: 'B 6278 RTA',
          vin: 'JTMAB1AA123456012',
          currentMileageKm: 19900,
          status: 'MAINTENANCE',
          carModelId: CAR_MODEL_IDS.CRV,
          currentBranchId: BRANCH_IDS.TB_SIMATUPANG,
        },
        {
          id: VEHICLE_IDS.V13,
          licensePlate: 'B 7234 RTA',
          vin: 'JTMAB1AA123456013',
          currentMileageKm: 35400,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.FORTUNER,
          currentBranchId: BRANCH_IDS.BSD,
        },
        {
          id: VEHICLE_IDS.V14,
          licensePlate: 'B 7278 RTA',
          vin: 'JTMAB1AA123456014',
          currentMileageKm: 27700,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.FORTUNER,
          currentBranchId: BRANCH_IDS.BEKASI,
        },
        {
          id: VEHICLE_IDS.V15,
          licensePlate: 'B 8231 RTA',
          vin: 'JTMAB1AA123456015',
          currentMileageKm: 11500,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.YARIS,
          currentBranchId: BRANCH_IDS.DEPOK,
        },
        {
          id: VEHICLE_IDS.V16,
          licensePlate: 'B 8278 RTA',
          vin: 'JTMAB1AA123456016',
          currentMileageKm: 16200,
          status: 'AVAILABLE',
          carModelId: CAR_MODEL_IDS.YARIS,
          currentBranchId: BRANCH_IDS.KEMANGGISAN,
        },
      ],
    });

    // =========================================================
    // 6. BOOKINGS
    // =========================================================

    await tx.booking.createMany({
      data: [
        {
          id: BOOKING_IDS.B1,
          customerId: USER_IDS.ANDI,
          vehicleId: VEHICLE_IDS.V1,
          pickupBranchId: BRANCH_IDS.KEMANGGISAN,
          dropoffBranchId: BRANCH_IDS.KEMANGGISAN,
          pickupAt: new Date('2026-09-10T10:00:00+07:00'),
          dropoffAt: new Date('2026-09-12T10:00:00+07:00'),
          status: 'COMPLETED',
          pricePerDay: 450000,
          subtotal: 900000,
          discount: 0,
          totalAmount: 900000,
        },
        {
          id: BOOKING_IDS.B2,
          customerId: USER_IDS.BUDI,
          vehicleId: VEHICLE_IDS.V2,
          pickupBranchId: BRANCH_IDS.KEMANGGISAN,
          dropoffBranchId: BRANCH_IDS.BSD,
          pickupAt: new Date('2026-09-22T09:00:00+07:00'),
          dropoffAt: new Date('2026-09-25T09:00:00+07:00'),
          status: 'CONFIRMED',
          pricePerDay: 450000,
          subtotal: 1350000,
          discount: 50000,
          totalAmount: 1300000,
        },
        {
          id: BOOKING_IDS.B3,
          customerId: USER_IDS.CITRA,
          vehicleId: VEHICLE_IDS.V5,
          pickupBranchId: BRANCH_IDS.BSD,
          dropoffBranchId: BRANCH_IDS.BSD,
          pickupAt: new Date('2026-09-19T09:00:00+07:00'),
          dropoffAt: new Date('2026-09-21T09:00:00+07:00'),
          status: 'ACTIVE',
          pricePerDay: 850000,
          subtotal: 1700000,
          discount: 0,
          totalAmount: 1700000,
        },
        {
          id: BOOKING_IDS.B4,
          customerId: USER_IDS.ANDI,
          vehicleId: VEHICLE_IDS.V9,
          pickupBranchId: BRANCH_IDS.BEKASI,
          dropoffBranchId: BRANCH_IDS.KEMANGGISAN,
          pickupAt: new Date('2026-09-24T10:00:00+07:00'),
          dropoffAt: new Date('2026-09-26T10:00:00+07:00'),
          status: 'PENDING',
          pricePerDay: 550000,
          subtotal: 1100000,
          discount: 100000,
          totalAmount: 1000000,
        },
        {
          id: BOOKING_IDS.B5,
          customerId: USER_IDS.BUDI,
          vehicleId: VEHICLE_IDS.V11,
          pickupBranchId: BRANCH_IDS.TB_SIMATUPANG,
          dropoffBranchId: BRANCH_IDS.TB_SIMATUPANG,
          pickupAt: new Date('2026-09-27T09:00:00+07:00'),
          dropoffAt: new Date('2026-09-30T09:00:00+07:00'),
          status: 'CANCELLED',
          pricePerDay: 900000,
          subtotal: 2700000,
          discount: 0,
          totalAmount: 2700000,
        },
      ],
    });

    // =========================================================
    // 7. PAYMENTS
    // =========================================================

    await tx.payment.createMany({
      data: [
        {
          id: PAYMENT_IDS.P1,
          bookingId: BOOKING_IDS.B1,
          amount: 900000,
          provider: 'MOCK',
          transactionId: 'MOCK-TXN-0001',
          status: 'PAID',
          paidAt: new Date('2026-09-09T15:00:00+07:00'),
        },
        {
          id: PAYMENT_IDS.P2,
          bookingId: BOOKING_IDS.B2,
          amount: 1300000,
          provider: 'MOCK',
          transactionId: 'MOCK-TXN-0002',
          status: 'PAID',
          paidAt: new Date('2026-09-21T15:00:00+07:00'),
        },
        {
          id: PAYMENT_IDS.P3,
          bookingId: BOOKING_IDS.B3,
          amount: 1700000,
          provider: 'MOCK',
          transactionId: 'MOCK-TXN-0003',
          status: 'FAILED',
        },
        {
          id: PAYMENT_IDS.P4,
          bookingId: BOOKING_IDS.B4,
          amount: 1000000,
          provider: 'MOCK',
          transactionId: 'MOCK-TXN-0004',
          status: 'FAILED',
        },
        {
          id: PAYMENT_IDS.P5,
          bookingId: BOOKING_IDS.B4,
          amount: 1000000,
          provider: 'MOCK',
          transactionId: 'MOCK-TXN-0005',
          status: 'PAID',
          paidAt: new Date('2026-09-23T15:00:00+07:00'),
        },
        {
          id: PAYMENT_IDS.P6,
          bookingId: BOOKING_IDS.B5,
          amount: 2700000,
          provider: 'MOCK',
          transactionId: 'MOCK-TXN-0006',
          status: 'REFUNDED',
          paidAt: new Date('2026-09-27T12:00:00+07:00'),
        },
      ],
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
