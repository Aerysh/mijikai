import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity])],
  providers: [UrlsService],
  exports: [UrlsService],
})
export class UrlsModule {}
