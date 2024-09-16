import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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

  @Get('/all')
  @UseGuards(AuthGuard)
  findAll(@User() user: UserPrisma) {
    return this.urlsService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.urlsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlsService.update(+id, updateUrlDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.urlsService.remove(+id);
  }
}
