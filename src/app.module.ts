import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenRecruitmentModule } from './resources/open-recruitment/open-recruitment.module';
import { PrismaModule } from './prisma/prisma.module';
import { ItsModule } from './resources/its/its.module';
import { AuthModule } from './resources/auth/auth.module';
import { JwtModule } from './guards/jwt/jwt.module';
import { ShortenerModule } from './resources/shortener/shortener.module';
import { MangaModule } from './resources/manga/manga.module';

const ENV = process.env.ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    OpenRecruitmentModule,
    PrismaModule,
    ItsModule,
    AuthModule,
    JwtModule,
    ShortenerModule,
    MangaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
