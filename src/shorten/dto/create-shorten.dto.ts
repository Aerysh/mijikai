import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateShortenDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
