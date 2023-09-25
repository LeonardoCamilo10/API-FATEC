import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class createCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  name: string;
}
