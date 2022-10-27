import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ApplicantService } from './applicant.service';

@Module({
  controllers: [MangaController],
  providers: [MangaService, ApplicantService],
  imports: [PrismaModule],
})
export class MangaModule {}
