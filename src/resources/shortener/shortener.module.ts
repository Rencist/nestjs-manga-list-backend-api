import { Module } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '../../guards/jwt/jwt.module';

@Module({
  controllers: [ShortenerController],
  providers: [ShortenerService],
  imports: [PrismaModule, JwtModule]
})
export class ShortenerModule {}
