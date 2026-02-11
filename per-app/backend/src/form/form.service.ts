import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFormDto } from './form.dto';

@Injectable()
export class FormService {
  constructor(private readonly prisma: PrismaService) {}

  async save(id: string, dto: CreateFormDto) {
    const savedAt = dto.savedAt ? new Date(dto.savedAt) : undefined;
    const record = await this.prisma.form.upsert({
      where: { id },
      update: {
        data: dto.data,
        ...(savedAt ? { updatedAt: savedAt } : {})
      },
      create: {
        id,
        data: dto.data,
        ...(savedAt ? { createdAt: savedAt } : {})
      }
    });

    return {
      id: record.id,
      data: record.data,
      savedAt: record.updatedAt.toISOString()
    };
  }

  async findOne(id: string) {
    const record = await this.prisma.form.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Form not found');
    return {
      id: record.id,
      data: record.data,
      savedAt: record.updatedAt.toISOString()
    };
  }
}
