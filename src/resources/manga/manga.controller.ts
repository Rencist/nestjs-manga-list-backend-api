import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { MangaService } from './manga.service';
import { ApiTags } from '@nestjs/swagger';
import { UnknownErrorException } from 'src/exceptions/exception';
import { Manga } from '../../dto/manga/manga.dto';

@ApiTags('manga')
@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}
  @Get('all')
  findAll() {
    return this.mangaService.findMangas();
  }

  @Get('/:id')
  async getManga(@Param('id') id: string) {
    try {
      return await this.mangaService.getManga(id);
    } catch (err) {
      throw new UnknownErrorException();
    }
  }

  @Post('/create')
  async register(@Body() Manga: Manga) {
    try {
      const success = await this.mangaService.create(Manga);
      let message = '';
      if (success) message = 'Register berhasil';
      else message = 'Register gagal';
      return { message };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
