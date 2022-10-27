import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MangaService } from './manga.service';
import { ApiTags } from '@nestjs/swagger';
import { UnknownErrorException } from 'src/exceptions/exception';

@ApiTags('manga')
@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}
  @Get('')
  findAll() {
    return this.mangaService.findMangas();
  }

  @Get('/:id')
  async getManga(@Param('manga', ParseIntPipe) id: string) {
    try {
      return await this.mangaService.getManga(id);
    } catch (err) {
      throw new UnknownErrorException();
    }
  }
}
