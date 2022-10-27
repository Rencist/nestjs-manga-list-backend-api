import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ShortenerDto } from '../../dto/shortener/shortener.dto';

@Injectable()
export class ShortenerService {
  constructor(private prisma: PrismaService){}

  async shorten(shorten: ShortenerDto)
  {
    try {
      if(!shorten.alias)
        while(!shorten.alias || shorten.alias == "")
        {
          const generate = this.generate(7);
          const exist = await this.prisma.shorten.findUnique({ 
            where : {
              alias : generate
            }
          })

          if(!exist)
            shorten.alias = generate
        }

      const exist = await this.prisma.shorten.findUnique({ 
        where : {
          alias : shorten.alias
        }
      })


      if(!exist)
        return await this.prisma.shorten.create({
          data: shorten
        })
      else
        throw new Error("Alias already exist")
    } catch(err)
    {
      console.log(err)
      throw new Error(err)
    }
  }

  generate(length:number): string  
  {
    let result           = '';
    const characters     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async getUrl(alias: string)
  {
    try {
      const url = await this.prisma.shorten.findUnique(
        {
          where: {
            alias: alias
          },
          include: {
            createdBy: true
          }          
        }
      )

      delete url.createdBy.password;
      return url;
    } catch(err)
    {
      throw new Error(err)
    }
  }
}
