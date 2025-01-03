import { Controller, Post, Body } from '@nestjs/common';
import { ShortenService } from './shorten.service';
import { CreateShortenDto } from './dto/create-shorten.dto';

@Controller('shorten')
export class ShortenController {
  constructor(private readonly shortenService: ShortenService) {}

  @Post()
  create(@Body() createShortenDto: CreateShortenDto) {
    return this.shortenService.create(createShortenDto);
  }
}
