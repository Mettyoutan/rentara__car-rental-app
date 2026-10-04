import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { CarModelsModule } from './car-models/car-models.module';

@Module({
  imports: [AuthModule, DatabaseModule, VehiclesModule, CarModelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
