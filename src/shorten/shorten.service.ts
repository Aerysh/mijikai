import { Injectable } from '@nestjs/common';
import { CreateShortenDto } from './dto/create-shorten.dto';
import { UrlsService } from 'src/urls/urls.service';

@Injectable()
export class ShortenService {
  constructor(private urlsService: UrlsService) {}

  async create(createShortenDto: CreateShortenDto) {
    const { originalUrl } = createShortenDto;

    return await this.urlsService.create(originalUrl);
  }
}
