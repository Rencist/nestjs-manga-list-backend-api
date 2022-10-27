import { Module } from '@nestjs/common';
import { OpenRecruitmentService } from './open-recruitment.service';
import { OpenRecruitmentController } from './open-recruitment.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '../../guards/jwt/jwt.module';
import { LolosBerkasService } from './lolos-berkas.service';
import { LolosInterviewService } from './lolos-interview.service';
import { LolosIlitsService } from './lolos-ilits.service';
import { ApplicantService } from './applicant.service';

@Module({
  controllers: [OpenRecruitmentController],
  providers: [OpenRecruitmentService, LolosBerkasService, LolosInterviewService, LolosIlitsService, ApplicantService],
  imports: [PrismaModule, JwtModule],
})
export class OpenRecruitmentModule {}
