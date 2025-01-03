import { Module } from '@nestjs/common';
import { ShortenService } from './shorten.service';
import { ShortenController } from './shorten.controller';
import { UrlsModule } from 'src/urls/urls.module';

@Module({
  imports: [UrlsModule],
  controllers: [ShortenController],
  providers: [ShortenService],
})
export class ShortenModule {}
