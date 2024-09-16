import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlDto } from './create-url.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class UpdateUrlDto {
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @IsNumber()
    @IsOptional()
    totalClicks: number;
}
