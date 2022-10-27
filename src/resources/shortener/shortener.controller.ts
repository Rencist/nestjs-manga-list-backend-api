import { Controller, Post, Body, BadRequestException, UseGuards, Get, Param, Req } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ShortenerDto } from '../../dto/shortener/shortener.dto';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { ShortenerService } from './shortener.service';
import { Token } from '../../decorators/token.decorator';

@ApiTags('shortener')
@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @UseGuards(JwtGuard)
  @Post('')
  @ApiConsumes('multipart/form-data')
  async shorten(@Body() shorten : ShortenerDto, @Token('uid') uid: string)
  {
    try
    {
      shorten.userId = uid;

      const shortener =  await this.shortenerService.shorten(shorten)
      const  message = 'Berhasil memendekkan url';
      return { message, shortener };
    } catch(err)
    {
      throw new BadRequestException(err);
    }
  }

  @Get(':alias')
  async getUrl(@Param('alias') alias: string)
  {
    try
    {      
      const shortener =  await this.shortenerService.getUrl(alias)
      const  message = 'Berhasil mendapatkan url';
      return { message, shortener };
    } catch(err)
    {
      throw new BadRequestException(err);
    }
  }
}
