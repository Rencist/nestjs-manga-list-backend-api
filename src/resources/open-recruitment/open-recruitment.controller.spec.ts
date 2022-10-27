import { Test, TestingModule } from '@nestjs/testing';
import { OpenRecruitmentController } from './open-recruitment.controller';
import { OpenRecruitmentService } from './open-recruitment.service';

describe('OpenRecruitmentController', () => {
  let controller: OpenRecruitmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenRecruitmentController],
      providers: [OpenRecruitmentService],
    }).compile();

    controller = module.get<OpenRecruitmentController>(OpenRecruitmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
