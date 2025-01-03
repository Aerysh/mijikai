import { Test, TestingModule } from '@nestjs/testing';
import { UrlsService } from './urls.service';
import { Repository } from 'typeorm';
import { UrlEntity } from './entities/url.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UrlsService', () => {
  let service: UrlsService;
  let urlsRepository: Repository<UrlEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        {
          provide: getRepositoryToken(UrlEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UrlsService>(UrlsService);
    urlsRepository = module.get<Repository<UrlEntity>>(
      getRepositoryToken(UrlEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new URL entity and return the correct response', async () => {
      const url = 'https://example.com';
      const shortCode = 'abc123';
      const newUrlEntity = {
        id: 1,
        url,
        shortCode,
        hits: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock the repository's findOneBy method to simulate that the short code is unique
      jest.spyOn(urlsRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(urlsRepository, 'create').mockReturnValue(newUrlEntity);
      jest.spyOn(urlsRepository, 'save').mockResolvedValue(newUrlEntity);

      const result = await service.create(url);

      expect(urlsRepository.findOneBy).toHaveBeenCalled();
      expect(urlsRepository.create).toHaveBeenCalledWith({
        url,
        shortCode: expect.any(String),
      });
      expect(urlsRepository.save).toHaveBeenCalledWith(newUrlEntity);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        data: {
          id: newUrlEntity.id,
          url: newUrlEntity.url,
          shortCode: newUrlEntity.shortCode,
          createdAt: newUrlEntity.createdAt,
          updatedAt: newUrlEntity.updatedAt,
        },
      });
    });

    it('should throw an error if URL creation fails', async () => {
      const url = 'https://example.com';

      jest.spyOn(urlsRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(urlsRepository, 'create').mockImplementation(() => {
        throw new Error('Failed to create URL');
      });

      await expect(service.create(url)).rejects.toThrow(
        new HttpException(
          'Failed to create URL',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
