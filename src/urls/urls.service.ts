import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        statusCode: HttpStatus.OK,
        data: {
          id: newUrl.id,
          url: newUrl.originalUrl,
          shortCode: newUrl.shortCode,
          createdAt: newUrl.createdAt,
          updatedAt: newUrl.updatedAt,
        },
      };
    } catch (error) {
      console.error(error.message); // probably should delete this
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneBy(shortCode: string) {
    const urlEntity = await this.urlsRepository.findOneBy({ shortCode });

    if (!urlEntity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    urlEntity.hits += 1;
    await this.urlsRepository.save(urlEntity);

    return {
      statusCode: HttpStatus.OK,
      data: {
        id: urlEntity.id,
        url: urlEntity.originalUrl,
        shortCode: urlEntity.shortCode,
        createdAt: urlEntity.createdAt,
        updatedAt: urlEntity.updatedAt,
      },
    };
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
