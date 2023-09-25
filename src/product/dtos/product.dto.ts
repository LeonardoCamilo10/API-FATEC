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
  @MaxLength(100)
  nome: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  altura: string;

  @IsNotEmpty()
  @IsNumber()
  largura: string;

  @IsNotEmpty()
  @IsNumber()
  comprimento: string;

  @IsNotEmpty()
  @IsNumber()
  peso: string;

  @IsOptional()
  @IsArray()
  images: string[];
}
