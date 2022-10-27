import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItsService } from './its.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('its')
@Controller('its')
export class ItsController {
  constructor(private readonly itsService: ItsService) {}

  @Get('/departemen')
  findAll() {
    return this.itsService.findDepartments();
  }

  @Get('/fakultas')
  findOne() {
    return this.itsService.findFaculties();
  }
}
