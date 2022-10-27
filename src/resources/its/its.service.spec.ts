import { Test, TestingModule } from '@nestjs/testing';
import { ItsService } from './its.service';

describe('ItsService', () => {
  let service: ItsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItsService],
    }).compile();

    service = module.get<ItsService>(ItsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
