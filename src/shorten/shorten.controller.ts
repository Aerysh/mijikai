import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { ShortenService } from './shorten.service';
import { CreateShortenDto } from './dto/create-shorten.dto';
import { UpdateShortenDto } from './dto/update-shorten.dto';

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

  @Put(':shortCode')
  update(
    @Param('shortCode') shortCode: string,
    @Body() updateShortenDto: UpdateShortenDto,
  ) {
    return this.shortenService.update(shortCode, updateShortenDto);
  }

  @Delete(':shortCode')
  delete(@Param('shortCode') shortCode: string) {
    return this.shortenService.delete(shortCode);
  }

  @Get(':shortCode/analytics') // Route for /items/:id/analytics
  getAnalytics(@Param('shortCode') shortCode: string) {
    return this.shortenService.getAnalytics(shortCode);
  }
}
