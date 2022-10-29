import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ApplicantService } from './applicant.service';
import { Manga } from '../../dto/manga/manga.dto';

@Injectable()
export class MangaService {
  constructor(
    private prisma: PrismaService,
    private ApplicantService: ApplicantService,
  ) {}

  findMangas() {
    return this.prisma.manga.findMany();
  }

  async getManga(id: string) {
    return this.ApplicantService.getManga(id);
  }

  async create(Manga: Manga) {
    const t = this;
    const success = await new Promise(async (resolve, reject) => {
      const manga = await t.prisma.manga.create({
        data: Manga,
      });
      // if (manga) return "Email sudah terdaftar";
      if (!manga) reject();
      resolve(manga);
    });
    return success;
  }
}
