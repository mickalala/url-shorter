import { Controller, Get, Header, Param, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlsService } from './urls/urls.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly urlsService: UrlsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('/:shortUrlId')
  @Redirect('', 301)
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  async redirectToOriginalUrl(@Param('shortUrlId') shortUrlId: string) {
    const originalUrl = await this.urlsService.findOriginalUrl(`http://localhost:3000/${shortUrlId}`);
    return { url: originalUrl };
  }
}
