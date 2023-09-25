import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto } from './dtos/product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1')
// @UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('product')
  async findAll() {
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
