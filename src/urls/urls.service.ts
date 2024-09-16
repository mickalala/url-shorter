import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { nanoid } from 'nanoid';
import { User } from '@prisma/client';
import { UrlsRepository } from './urls.repository';

@Injectable()
export class UrlsService {

  constructor(
    private readonly UrlsRepository: UrlsRepository) { }

  async create(createUrlDto: CreateUrlDto, user?: User) {
    const userId = user ? user.id : null;
    const generatedId = nanoid(5);
    const shortUrl = `http://localhost:3000/${generatedId}`;

    return this.UrlsRepository.create({ ...createUrlDto }, userId, shortUrl);
  }

  async findOriginalUrl(shortUrl: string): Promise<string> {
    const url = await this.UrlsRepository.findOneUrl(shortUrl);
    if (!url) {
      throw new NotFoundException('URL not found');
    }
    url.totalClicks++;
    await this.UrlsRepository.update(url.id, url);
    return url.url;
  }

  async findAll(userId: number) {
    if (!userId) userId = null;
    const urls = await this.UrlsRepository.findAll(userId);
    if (urls.length === 0) {
        throw new NotFoundException('URLs not found');
    }
    const notDeletedUrls = urls.filter((url) => url.deletedAt === null);
    if (notDeletedUrls.length === 0) {
        throw new NotFoundException('No URLs found that have not been deleted');
    }
    return notDeletedUrls; }

  async findOne(id: number) {
    const url = await this.UrlsRepository.findOne(id);
    if (!url) throw new NotFoundException('URL not found');
    if (url.deletedAt !== null) throw new NotFoundException('URL not found');
    return url;
  }

  async update(id: number, updateUrlDto: UpdateUrlDto) {
    const url = await this.UrlsRepository.findOne(id);
    if (!url) throw new NotFoundException('URL not found');
    if (url.deletedAt !== null) throw new NotFoundException('URL not found');
    return this.UrlsRepository.update(id, updateUrlDto);
  }

  async remove(id: number) {
    const url = await this.UrlsRepository.findOne(id);
    if (!url) throw new NotFoundException('URL not found');
    if (url.deletedAt !== null) throw new NotFoundException('URL not found');
    return this.UrlsRepository.remove(id);
  }
}
