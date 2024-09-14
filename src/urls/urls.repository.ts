import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Injectable()
export class UrlsRepository {

    constructor(private readonly prisma: PrismaService) { }

    create(createUrlDto: CreateUrlDto, userId: number, shortUrl: string) {
        return this.prisma.urls.create({
            data: {
                 userId,
                ...createUrlDto,
                shortUrl,
            }
        })
    }

    async findAll() {
        const urls = await this.prisma.urls.findMany();

        return urls
    }

    async findOne(id: number) {
        const url = await this.prisma.urls.findUnique({
            where: { id }
        });

        return {
            ...url
        }
    }


    update(id: number, updateCredentialDto: UpdateUrlDto) {
        // return this.prisma.urls.update({
        //   where: { id },
        //   data: {
        //     ...UpdateUrlDto
        //   }
        // })
    }

    remove(id: number) {
        return this.prisma.urls.delete({
            where: { id }
        });
    }
}
