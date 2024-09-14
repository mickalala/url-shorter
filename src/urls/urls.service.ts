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
    let userId = user?.id;
    if (!user) userId = null;
    const generatedId = nanoid(5);
    const shortUrl = `http://localhost/${generatedId}`;

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

  findAll() {
    return `This action returns all urls`;
  }

  findOne(id: number) {
    return
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
