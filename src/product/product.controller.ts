import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product2 } from './product.entity';
import { createProductDto } from './dtos/product.dto';

@Controller('api/v1')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('product')
  async listar(): Promise<Product2[]> {
    return this.productService.findAllProduct();
  }

  @HttpCode(201)
  @Post('product')
  async create(@Body() body: createProductDto) {
    const product = await this.productService.createProduct(body);
    return product;
  }

  @HttpCode(201)
  @Put('product/:id')
  async update(@Body() body: createProductDto, @Param('id') id: string) {
    const product = await this.productService.updateProduct(body, Number(id));
    return product;
  }
}
