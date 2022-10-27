import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LolosIlitsService {
  constructor(private prisma: PrismaService){}

  async getLolosIlits()
  {
    try
    {
      const users = await this.prisma.lolos_ilits.findMany({
        include: {
          applicant : true,
          divisi : true,
        }
      })

      const usersParsed = users.map(v => {
        return JSON.parse(JSON.stringify(v, (_key, value) => 
          typeof value === 'bigint' ? () => value = value.toString() : value
        ))
      })

      return usersParsed;
    } catch(err)
    {
      throw new Error(err)
    }
  }

  async getLolos(nrp: number)
  {
    try
    {
      const user = await this.prisma.lolos_ilits.findUnique({
        where: {
          nrp: nrp
        },
        include: {
          applicant: true,
          divisi: true
        }
      })

      if(user)
        user['accepted'] = true
      else
        return { accepted: false }

      const parsedUser = JSON.parse(JSON.stringify(user, (_key, value) => 
        typeof value === 'bigint' ? value = value.toString() : value
      ))

      return parsedUser
    } catch(err)
    {
      throw new Error(err)
    }
  }

  async accept(nrp: number, divisiId: number)
  {
    try
    {

      const data = {
        nrp: BigInt(nrp),
        divisiId: divisiId
      }

      const lolos = await this.prisma.lolos_ilits.upsert({
        where: {
          nrp: nrp,
        },
        update: data,
        create: data,
      })

      const parsedUser = JSON.parse(JSON.stringify(lolos, (_key, value) => 
        typeof value === 'bigint' ? value = value.toString() : value
      ))

      return parsedUser
    } catch(err)
    {
      throw new Error(err)
    }
  }
}
