import { Test, TestingModule } from '@nestjs/testing';
import { OpenRecruitmentService } from './open-recruitment.service';

describe('OpenRecruitmentService', () => {
  let service: OpenRecruitmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenRecruitmentService],
    }).compile();

    service = module.get<OpenRecruitmentService>(OpenRecruitmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
