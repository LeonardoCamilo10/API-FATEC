import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from '../product.entity';

export class createProductImageDto {
  @IsNotEmpty()
  @IsNumber()
  product_: Product;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  image_path: string;
}
