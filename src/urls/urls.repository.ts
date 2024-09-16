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

    async findAll(userId: number) {
        const urls = await this.prisma.urls.findMany({
            where: { userId }
        });
        return urls;
    }

    async findOneUrl(shortUrl: string) {
        const url = await this.prisma.urls.findUnique({
            where: { shortUrl }
        });
        return url;
    }
    
    async findOne(id: number) {
        const url = await this.prisma.urls.findUnique({
            where: { id }
        });
        return url;
    }


    update(id: number, updateUrlDto: UpdateUrlDto) {
        return this.prisma.urls.update({
            where: { id },
            data: {
                ...updateUrlDto,
                updatedAt: new Date()
            }
        })
    }

    remove(id: number) {
        return this.prisma.urls.update({
            where: { id },
            data: {
                deletedAt: new Date()
            }
        });
    }
}
