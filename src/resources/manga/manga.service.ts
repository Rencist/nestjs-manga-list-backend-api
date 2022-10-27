import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ApplicantService } from './applicant.service';

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
}
