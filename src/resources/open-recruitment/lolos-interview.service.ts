import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserNotFoundExecption } from '../../exceptions/exception';
import { LolosIlitsService } from './lolos-ilits.service';

@Injectable()
export class LolosInterviewService {
  constructor(private prisma: PrismaService, private LolosIlitsService: LolosIlitsService){}

  async getLolosInterview()
  {
    try
    {
      const users = await this.prisma.lolos_interview.findMany({
        include: {
          applicant : true,
          divisiPertama : true,
          divisiKedua : true,
          divisiPertamaAcceptedBy : true,
          divisiKeduaAcceptedBy : true
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

  async interview(nrp: number, accepted: number, divisiPertama:boolean, uid: string)
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

      let lolos_interview = {
        "nrp": BigInt(nrp),
      }

      if(divisiPertama)
      {
        lolos_interview["divisiPertamaId"] = applicant.divisiIlitsId
        lolos_interview["lolosInterviewDivisiPertama"] = accepted
        lolos_interview["userPertamaId"] = uid
      }
      else
      {
        lolos_interview["divisiKeduaId"] = applicant.divisiIlits2Id
        lolos_interview["lolosInterviewDivisiKedua"] = accepted
        lolos_interview["userKeduaId"] = uid
      }


      const inserted = await this.prisma.lolos_interview.upsert({
        where: {
          nrp: nrp,
        },
        update: lolos_interview,
        create: lolos_interview,
      })

      // Lolos Ilits atau tidak
      if(inserted.lolosInterviewDivisiPertama == 1)
      {
        this.LolosIlitsService.accept(nrp, inserted.divisiPertamaId)
      } else if(inserted.lolosInterviewDivisiPertama == 0 && inserted.lolosInterviewDivisiKedua == 1){
        this.LolosIlitsService.accept(nrp, inserted.divisiKeduaId)
      }
    } catch(err)
    {
      throw new Error(err)
    }
  }
}
