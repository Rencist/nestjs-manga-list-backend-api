import { Controller, Get, Post, Body, Param,  BadRequestException, UseGuards, ParseIntPipe } from '@nestjs/common';
import { OpenRecruitmentService } from './open-recruitment.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UnknownErrorException } from '../../exceptions/exception';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { ApplicantDto } from '../../dto/open-recruitment/applicant.dto'
import { Token } from '../../decorators/token.decorator';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../../guards/roles/roles.guard';

@Controller('open-recruitment')
export class OpenRecruitmentController {
  constructor(private readonly service: OpenRecruitmentService) {}

  @ApiTags('open-recruitment > pendaftaran')
  @Post()
  @ApiConsumes('multipart/form-data')
  async create(@Body() applicant : ApplicantDto)
  {   
      try
      {
        const user = await this.service.createApplicant(applicant);
        const  message = 'Pendaftaran berhasil';
        return { message, user };
      } catch(err)
      {
        throw new BadRequestException(err);
      }
  }

  @ApiTags('open-recruitment > ilits')
  @Get('divisi')
  getDivisi()
  {
    return this.service.getDivisi()
  }

  @ApiTags('open-recruitment > pendaftaran')
  @UseGuards(JwtGuard)
  @Get('applicants')
  getAplicants()
  {
    return this.service.getApplicants()
  }

  @ApiTags('open-recruitment > pendaftaran')
  @UseGuards(JwtGuard)
  @Get('applicant/:nrp')
  getAplicant(@Param('nrp', ParseIntPipe) nrp: number)
  {
    return this.service.getApplicant(nrp)
  }

  @ApiTags('open-recruitment > pendaftaran')
  @UseGuards(JwtGuard)
  @Get('all-aplicants/divisi/:divisi')
  async getAplicantsDivisi(@Param('divisi', ParseIntPipe) divisiId: number)
  {
    try
    {
      return await this.service.getApplicantsDivisi(divisiId)
    } catch(err)
    {
      throw new UnknownErrorException()
    }
  }

  @ApiTags('open-recruitment > hasil-akhir')
  @Get('hasil/:nrp')
  async getHasil(@Param('nrp', ParseIntPipe) nrp: number)
  {
    try
    {
      const user = await this.service.getLolos(nrp);

      return user
    } catch(err)
    {
      throw new UnknownErrorException()
    }
  }

  // ------------------------------- Lolos Berkas

  @ApiTags('open-recruitment > tahap-berkas')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN) // Provide metadata
  @Get('berkas')
  async getLolosBerkas()
  {
    try 
    {
      return await this.service.getLolosBerkas()
    } catch(err)
    {
      throw new BadRequestException(err)
    }
  }

  @ApiTags('open-recruitment > tahap-berkas')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN) // Provide metadata
  @Post('berkas/accept/divisi-pertama/:nrp')
  async acceptBerkasDivisiPertama(@Param('nrp', ParseIntPipe) nrp: number, @Token('uid') uid: string)
  {
    try
    {
      await this.service.berkas(nrp, 1, true, uid)
      return { message: `${nrp} diterima pada divisi pertama pada tahap berkas` }
    } catch(err)
    {
      throw new BadRequestException(err)
    }
  }

  @ApiTags('open-recruitment > tahap-berkas')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN) // Provide metadata
  @Post('berkas/accept/divisi-kedua/:nrp')
  async acceptBerkasDivisiKedua(@Param('nrp', ParseIntPipe) nrp: number, @Token('uid') uid: string)
  {
    try
    {
      await this.service.berkas(nrp, 1, false, uid)
      return { message: `${nrp} diterima pada divisi kedua pada tahap berkas` }
    } catch(err)
    {
      throw new BadRequestException(err)
    }
  }

  @ApiTags('open-recruitment > tahap-berkas')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN) // Provide metadata
  @Post('berkas/reject/divisi-pertama/:nrp')
  async rejectBerkasDivisiPertama(@Param('nrp', ParseIntPipe) nrp: number, @Token('uid') uid: string)
  {
    try
    {
      await this.service.berkas(nrp, 0, true, uid)
      return { message: `${nrp} ditolak pada divisi pertama pada tahap berkas` }
    } catch(err)
    {
      throw new BadRequestException(err)
    }
  }

  @ApiTags('open-recruitment > tahap-berkas')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN) // Provide metadata
  @Post('berkas/reject/divisi-kedua/:nrp')
  async rejectBerkasDivisiKedua(@Param('nrp', ParseIntPipe) nrp: number, @Token('uid') uid: string)
  {
    try
    {
      await this.service.berkas(nrp, 0, false, uid)
      return { message: `${nrp} ditolak pada divisi kedua pada tahap berkas` }
    } catch(err)
    {
      throw new BadRequestException(err)
    }
  }

  // ------------------------------- Lolos Berkas

  // ------------------------------- Lolos Interview

  @ApiTags('open-recruitment > tahap-interview')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN) // Provide metadata
  @Get('interview')
  async getLolosInterview()
  {
    try 
    {
      return await this.service.getLolosInterview()
    } catch(err)
    {
      throw new BadRequestException(err)
    }
  }

  @ApiTags('open-recruitment > tahap-interview')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN) // Provide metadata
  @Post('interview/accept/divisi-pertama/:nrp')
  async acceptInterviewDivisiPertama(@Param('nrp', ParseIntPipe) nrp: number, @Token('uid') uid: string)
  {
    try
    {
      await this.service.interview(nrp, 1, true, uid)
      return { message: `${nrp} diterima pada divisi pertama pada tahap interview` }
    } catch(err)
    {
      throw new BadRequestException(err)
    }
  }

  @ApiTags('open-recruitment > tahap-interview')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN) // Provide metadata
  @Post('interview/accept/divisi-kedua/:nrp')
  async acceptInterviewDivisiKedua(@Param('nrp', ParseIntPipe) nrp: number, @Token('uid') uid: string)
  {
    try
    {
      await this.service.interview(nrp, 1, false, uid)
      return { message: `${nrp} diterima pada divisi kedua pada tahap interview` }
    } catch(err)
    {
      throw new BadRequestException(err)
    }
  }

  @ApiTags('open-recruitment > tahap-interview')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN) // Provide metadata
  @Post('interview/reject/divisi-pertama/:nrp')
  async rejectInterviewDivisiPertama(@Param('nrp', ParseIntPipe) nrp: number, @Token('uid') uid: string)
  {
    try
    {
      await this.service.interview(nrp, 0, true, uid)
      return { message: `${nrp} ditolak pada divisi pertama pada tahap interview` }
    } catch(err)
    {
      throw new BadRequestException(err)
    }
  }

  @ApiTags('open-recruitment > tahap-interview')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN) // Provide metadata
  @Post('interview/reject/divisi-kedua/:nrp')
  async rejectInterviewDivisiKedua(@Param('nrp', ParseIntPipe) nrp: number, @Token('uid') uid: string)
  {
    try
    {
      await this.service.interview(nrp, 0, false, uid)
      return { message: `${nrp} ditolak pada divisi kedua pada tahap interview` }
    } catch(err)
    {
      throw new BadRequestException(err)
    }
  }
}
