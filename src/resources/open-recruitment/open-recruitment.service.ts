import { Injectable } from '@nestjs/common';
import { Applicant } from "@prisma/client";
import { ApplicantService } from './applicant.service';
import { LolosBerkasService } from './lolos-berkas.service';
import { LolosInterviewService } from './lolos-interview.service';
import { LolosIlitsService } from './lolos-ilits.service';

@Injectable()
export class OpenRecruitmentService {
  constructor(
    private ApplicantService: ApplicantService, 
    private LolosBerkasService: LolosBerkasService,
    private LolosInterviewService: LolosInterviewService,
    private LolosIlitsService: LolosIlitsService
  ){}

  // Aplicants

  async createApplicant(applicant : Applicant)
  {
    return this.ApplicantService.createApplicant(applicant)
  }

  async getApplicant(nrp: number)
  {
    return this.ApplicantService.getApplicant(nrp)
  }

  getDivisi()
  {
    return this.ApplicantService.getDivisi()
  }

  async getApplicants()
  {
    return this.ApplicantService.getApplicants()
  }

  async getApplicantsDivisi(divisi: number)
  {
    return this.ApplicantService.getApplicantsDivisi(divisi)
  }

  // ------------------------------- Lolos Berkas

  async getLolosBerkas()
  {
    return this.LolosBerkasService.getLolosBerkas()
  }

  async berkas(nrp: number, accepted: number, divisiPertama: boolean, uid: string)
  {
    return this.LolosBerkasService.berkas(nrp, accepted, divisiPertama, uid)
  }

  // ------------------------------- Lolos Berkas

  // ------------------------------- Lolos Interview

  async getLolosInterview()
  {
    return this.LolosInterviewService.getLolosInterview()
  }

  async interview(nrp: number, accepted: number, divisiPertama:boolean, uid: string)
  {
    return this.LolosInterviewService.interview(nrp, accepted, divisiPertama, uid)
  }

  // ------------------------------- Lolos Ilits

  async getLolos(nrp: number)
  {
    return this.LolosIlitsService.getLolos(nrp)
  }
}
