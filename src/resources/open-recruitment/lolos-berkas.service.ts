import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserNotFoundExecption } from '../../exceptions/exception';

@Injectable()
export class LolosBerkasService {
  constructor(private prisma: PrismaService){}

  async getLolosBerkas()
  {
    try
    {
      const users = await this.prisma.lolos_berkas.findMany({
        include: {
          applicant : true,
          divisiPertama : true,
          divisiKedua : true,
          divisiPertamaAcceptedBy : true,
          divisiKeduaAcceptedBy: true
        }
      })

      const usersParsed = users.map(v => {
        return JSON.parse(JSON.stringify(v, (_key, value) => 
          typeof value === 'bigint' ? value = value.toString() : value
        ))
      })

      return usersParsed;

    } catch(err)
    {
      throw new Error(err)
    }
  }

  async berkas(nrp: number, accepted: number, divisiPertama: boolean, uid: string)
  {
    try
    {
      const applicant = await this.prisma.applicant.findUnique({
        where: {
          nrp: nrp
        }
      })

      if(!applicant)
        throw new UserNotFoundExecption()

      let lolos_berkas = {
        "nrp": BigInt(nrp),
      }

      if(divisiPertama)
      {
        lolos_berkas["divisiPertamaId"] = applicant.divisiIlitsId
        lolos_berkas["lolosDivisiPertama"] = accepted
        lolos_berkas["userPertamaId"] = uid
      }
      else
      {
        lolos_berkas["divisiKeduaId"] = applicant.divisiIlits2Id
        lolos_berkas["lolosDivisiKedua"] = accepted
        lolos_berkas["userKeduaId"] = uid
      }

      await this.prisma.lolos_berkas.upsert({
        where: {
          nrp: nrp,
        },
        update: lolos_berkas,
        create: lolos_berkas,
      })
    } catch(err)
    {
      throw new Error(err)
    }
  }
}
