import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MangaNotFoundExecption } from '../../exceptions/exception';

@Injectable()
export class ApplicantService {
  constructor(private prisma: PrismaService) {}

  async getManga(id: string) {
    const user = await this.prisma.manga.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      const userParsed = JSON.parse(
        JSON.stringify(user, (_key, value) =>
          typeof value === 'bigint' ? (value = value.toString()) : value,
        ),
      );

      return userParsed;
    } else return new MangaNotFoundExecption('Manga not found');
  }
}
