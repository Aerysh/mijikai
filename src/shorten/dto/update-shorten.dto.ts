import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateShortenDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
