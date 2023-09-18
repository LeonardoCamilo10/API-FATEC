import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './ProductService';
import { Product } from './product.entity';
import { createProductDto } from './dtos/product.dto';

@Controller('api/v1')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('product')
  async findAll(): Promise<Product[]> {
    return await this.productService.findAllProduct();
  }

  @Get('product/:id')
  async findID(@Param('id') id: number) {
    return await this.productService.findIdProduct(id);
  }

  @Get('product/category/:id')
  async findCategory(@Param('id') id: number) {
    return await this.productService.findCategory(id);
  }

  @HttpCode(204)
  @Delete('product/:id')
  async delete(@Param('id') id: number) {
    await this.productService.deleteProduct(id);
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
