import { Module } from '@nestjs/common';
import { ItsService } from './its.service';
import { ItsController } from './its.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [ItsController],
  providers: [ItsService],
  imports: [PrismaModule],
})
export class ItsModule {}
