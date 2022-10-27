import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Applicant } from "@prisma/client";
import { FieldEmptyException, FieldExistException } from '../../exceptions/exception';

@Injectable()
export class ApplicantService {
  constructor(private prisma: PrismaService){}

  async createApplicant(applicant : Applicant)
  {
    try
    {
      if(await this.prisma.applicant.findUnique({ where:{ nrp: applicant.nrp } }))
        throw new Error('P2002')

      let departemen  = await this.prisma.departemen.findUnique({where: {id: applicant.departemenId}});
      let fakultas    = await this.prisma.fakultas.findUnique({where: {id: applicant.fakultasId}});
      let divisi1     = await this.prisma.divisi_ilits.findUnique({where: {id: applicant.divisiIlitsId}});
      let divisi2     = await this.prisma.divisi_ilits.findUnique({where: {id: applicant.divisiIlits2Id}});

      if(!departemen || !fakultas || !divisi1 || !divisi2)
        throw new FieldEmptyException()

      delete applicant.departemenId
      delete applicant.fakultasId
      delete applicant.divisiIlitsId
      delete applicant.divisiIlits2Id

      applicant["departemen"] = { connect: { id: departemen.id } };
      applicant["fakultas"] = { connect: { id: fakultas.id } };
      applicant["divisiPilihanPertama"] = { connect: { id: divisi1.id } };
      applicant["divisiPilihanKedua"] = { connect: { id: divisi2.id } };
      applicant.createdAt = new Date(Date.now());

      const user = await this.prisma.applicant.create({
        data: applicant
      });

      const parsedUser = JSON.parse(JSON.stringify(user, (_key, value) => 
        typeof value === 'bigint' ? value = value.toString() : value
      ))
  
      return parsedUser
    } catch(err)
    {
      if (err.code === 'P2002' || err.message === 'P2002') {
        throw new FieldExistException()
      }

      throw new FieldEmptyException()
    }
  }

  async getApplicant(nrp: number)
  {
    try
    {
      const user = await this.prisma.applicant.findUnique(
        {
          where: {
            nrp: nrp
          },
          include:
          {
            divisiPilihanPertama : true,
            divisiPilihanKedua : true,
            fakultas : true,
            departemen : true,
          }
          
        }
      );

      const userParsed = JSON.parse(JSON.stringify(user, (_key, value) => 
        typeof value === 'bigint' ? value = value.toString() : value
      ))

      return userParsed;
    } catch(err)
    {
      throw new FieldEmptyException()
    }
  }

  getDivisi()
  {
    return this.prisma.divisi_ilits.findMany();
  }

  async getApplicants()
  {
    try
    {

      const users = await this.prisma.applicant.findMany(
        {
          include:
          {
            divisiPilihanPertama : true,
            divisiPilihanKedua : true,
            fakultas : true,
            departemen : true,
          }
        }
      );

      const usersParsed = users.map(v => {
        return JSON.parse(JSON.stringify(v, (_key, value) => 
          typeof value === 'bigint' ? value = value.toString() : value
        ))
      })

      return usersParsed;

    } catch(err)
    {
      throw new FieldEmptyException()
    }
  }

  async getApplicantsDivisi(divisi: number)
  {
    try 
    {
      const user = await this.prisma.applicant.findMany({
        where: {
          OR: [
            {
              divisiIlitsId: divisi
            }, 
            {
              divisiIlits2Id: divisi
            }
          ]
        },
        include:
        {
          divisiPilihanPertama : true,
          divisiPilihanKedua : true,
          fakultas : true,
          departemen : true,
        }
      })

      const parsedUser = JSON.parse(JSON.stringify(user, (_key, value) => 
        typeof value === 'bigint' ? value = value.toString() : value
      ))

      return parsedUser
    } catch(err)
    {
      throw new FieldEmptyException()
    }
  }
}
