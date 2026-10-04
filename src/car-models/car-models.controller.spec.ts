import { Test, TestingModule } from '@nestjs/testing';
import { CarModelsController } from './car-models.controller';

describe('CarModelsController', () => {
  let controller: CarModelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarModelsController],
    }).compile();

    controller = module.get<CarModelsController>(CarModelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
