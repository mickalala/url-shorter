import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect, Header, UseGuards } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { User as UserPrisma } from "@prisma/client";
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guards';
import { OptionalJwtAuthGuard } from 'src/guards/optionalAuth.guards';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) { }

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  create(@Body() createUrlDto: CreateUrlDto, @User() user?: UserPrisma) {
    return this.urlsService.create(createUrlDto, user);
  }

  @Get('/short/:shortUrlId')
  @Redirect('', 301)
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  async redirectToOriginalUrl(@Param('shortUrlId') shortUrlId: string) {
    const originalUrl = await this.urlsService.findOriginalUrl(`http://localhost/${shortUrlId}`);
    return { url: originalUrl };
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@User() user: UserPrisma) {
    return this.urlsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlsService.update(+id, updateUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlsService.remove(+id);
  }
}
