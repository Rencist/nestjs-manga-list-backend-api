import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [MangaController],
  providers: [MangaService],
  imports: [PrismaModule],
})
export class MangaModule {}
