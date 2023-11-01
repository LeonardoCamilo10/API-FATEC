import { IsNotEmpty, IsString } from 'class-validator';

export class addProductImageDto {
  @IsNotEmpty()
  @IsString()
  image: string;
}
