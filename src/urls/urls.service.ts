import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './entities/url.entity';
import { customAlphabet, urlAlphabet } from 'nanoid-cjs';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(UrlEntity) private urlsRepository: Repository<UrlEntity>,
  ) {}

  async create(originalUrl: string) {
    try {
      const shortCode = await this.generateShortCode();
      const newUrl = this.urlsRepository.create({
        originalUrl,
        shortCode,
      });

      await this.urlsRepository.save(newUrl);

      return {
        success: true,
        data: {
          url: newUrl.originalUrl,
          shortCode: newUrl.shortCode,
          createdAt: newUrl.createdAt,
          updatedAt: newUrl.updatedAt,
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      };
    }
  }

  private async generateShortCode(): Promise<string> {
    const nanoid = customAlphabet(urlAlphabet, 8);

    let shortCode = nanoid();

    do {
      shortCode = nanoid();
    } while (await this.urlsRepository.findOneBy({ shortCode }));

    return shortCode;
  }
}
