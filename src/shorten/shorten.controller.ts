import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ShortenService } from './shorten.service';
import { CreateShortenDto } from './dto/create-shorten.dto';

@Controller('shorten')
export class ShortenController {
  constructor(private readonly shortenService: ShortenService) {}

  @Post()
  create(@Body() createShortenDto: CreateShortenDto) {
    return this.shortenService.create(createShortenDto);
  }

  @Get(':shortCode')
  findOneBy(@Param('shortCode') shortCode: string) {
    return this.shortenService.findOneBy(shortCode);
  }
}
