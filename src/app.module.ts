import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UrlsModule } from './urls/urls.module';
import { UrlsService } from './urls/urls.service';
import { UrlsRepository } from './urls/urls.repository';

@Module({
  imports: [PrismaModule, AuthModule, UrlsModule],
  controllers: [AppController],
  providers: [AppService,UrlsService, UrlsRepository],
})
export class AppModule {}
