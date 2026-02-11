import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CreateFormDto } from './form.dto';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Put(':id')
  async save(@Param('id') id: string, @Body() dto: CreateFormDto) {
    return this.formService.save(id, dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.formService.findOne(id);
  }
}
