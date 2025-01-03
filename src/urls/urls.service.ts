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

  async create(url: string) {
    const shortCode = await this.generateShortCode();
    const newUrl = this.urlsRepository.create({
      url,
      shortCode,
    });

    await this.urlsRepository.save(newUrl);

    return this.buildResponse(newUrl);
  }

  async findOneBy(shortCode: string) {
    const urlEntity = await this.urlsRepository.findOneBy({ shortCode });

    if (!urlEntity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    urlEntity.hits += 1;
    await this.urlsRepository.save(urlEntity);

    return this.buildResponse(urlEntity);
  }

  async update(shortCode: string, url: string) {
    const urlEntity = await this.urlsRepository.findOneBy({ shortCode });

    if (!urlEntity) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    urlEntity.url = url;

    await this.urlsRepository.save(urlEntity);

    return this.buildResponse(urlEntity);
  }

  async delete(shortCode: string) {
    await this.urlsRepository.delete({ shortCode });

    return {
      statusCode: HttpStatus.OK,
    };
  }

  async getAnalytics(shortCode: string) {
    const urlEntity = await this.urlsRepository.findOneBy({ shortCode });

    if (!urlEntity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.buildResponse(urlEntity, true);
  }

  private async generateShortCode(): Promise<string> {
    const nanoid = customAlphabet(urlAlphabet, 8);

    let shortCode = nanoid();

    do {
      shortCode = nanoid();
    } while (await this.urlsRepository.findOneBy({ shortCode }));

    return shortCode;
  }

  private buildResponse(urlEntity: UrlEntity, includeHits: boolean = false) {
    const response = {
      statusCode: HttpStatus.OK,
      data: {
        id: urlEntity.id,
        url: urlEntity.url,
        shortCode: urlEntity.shortCode,
        createdAt: urlEntity.createdAt,
        updatedAt: urlEntity.updatedAt,
      },
    };

    if (includeHits) {
      response.data['hits'] = urlEntity.hits;
    }

    return response;
  }
}
