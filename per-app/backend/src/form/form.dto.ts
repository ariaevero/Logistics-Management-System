import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFormDto {
  @IsNotEmpty()
  data!: any;

  @IsOptional()
  @IsString()
  savedAt?: string;
}
