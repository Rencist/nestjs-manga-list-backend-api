import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ItsService {
  constructor(private prisma: PrismaService){}

  findDepartments() {
    return this.prisma.departemen.findMany();
  }

  findFaculties() {
    return this.prisma.fakultas.findMany();
  }
}
