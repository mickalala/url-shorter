import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlDto } from './create-url.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateUrlDto  {
    @IsNumber()
    @IsOptional()
    totalClicks: number;
}
//extends PartialType(CreateUrlDto)