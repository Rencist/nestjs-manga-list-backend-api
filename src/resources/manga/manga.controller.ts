import { Controller, Get, Param } from '@nestjs/common';
import { MangaService } from './manga.service';
import { ApiTags } from '@nestjs/swagger';
import { UnknownErrorException } from 'src/exceptions/exception';

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
}
