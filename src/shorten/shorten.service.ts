import { Injectable } from '@nestjs/common';
import { CreateShortenDto } from './dto/create-shorten.dto';
import { UrlsService } from 'src/urls/urls.service';
import { UpdateShortenDto } from './dto/update-shorten.dto';

@Injectable()
export class ShortenService {
  constructor(private urlsService: UrlsService) {}

  async create(createShortenDto: CreateShortenDto) {
    const { url } = createShortenDto;

    return await this.urlsService.create(url);
  }

  async findOneBy(shortCode: string) {
    return await this.urlsService.findOneBy(shortCode);
  }

  async update(shortCode: string, updateShortenDto: UpdateShortenDto) {
    const { url } = updateShortenDto;

    return await this.urlsService.update(shortCode, url);
  }

  async delete(shortCode: string) {
    return await this.urlsService.delete(shortCode);
  }

  async getAnalytics(shortCode: string) {
    return await this.urlsService.getAnalytics(shortCode);
  }
}
