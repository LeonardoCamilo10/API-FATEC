import { IsNotEmpty, IsString } from 'class-validator';

export class searchProductDto {
  @IsNotEmpty()
  @IsString()
  search: string;
}
