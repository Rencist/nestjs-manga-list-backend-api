import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MangaService } from './manga.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('manga')
@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Get('/mangas')
  findAll() {
    return this.mangaService.findMangas();
  }

  @Get('/manga')
  findOne() {
    return this.mangaService.findManga();
  }
}
