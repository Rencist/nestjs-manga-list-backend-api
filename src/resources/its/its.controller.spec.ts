import { Test, TestingModule } from '@nestjs/testing';
import { ItsController } from './its.controller';
import { ItsService } from './its.service';

describe('ItsController', () => {
  let controller: ItsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItsController],
      providers: [ItsService],
    }).compile();

    controller = module.get<ItsController>(ItsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
