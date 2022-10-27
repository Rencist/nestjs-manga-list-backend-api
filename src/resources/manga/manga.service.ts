import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MangaService {
  constructor(private prisma: PrismaService) {}

  findMangas() {
    return this.prisma.manga.findMany();
  }

  findManga() {
    return this.prisma.manga.findMany();
  }
}
