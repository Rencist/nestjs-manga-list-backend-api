import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FieldEmptyException } from '../../exceptions/exception';

@Injectable()
export class ApplicantService {
  constructor(private prisma: PrismaService) {}

  async getManga(id: string) {
    try {
      const user = await this.prisma.manga.findUnique({
        where: {
          id: id,
        },
      });

      const userParsed = JSON.parse(
        JSON.stringify(user, (_key, value) =>
          typeof value === 'bigint' ? (value = value.toString()) : value,
        ),
      );

      return userParsed;
    } catch (err) {
      throw new FieldEmptyException();
    }
  }
}
