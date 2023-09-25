import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class createProductDto {
  @IsNotEmpty()
  @IsNumber()
  id_categoria: number;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsString()
  unity: string;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  width: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsArray()
  images: string[];
}
