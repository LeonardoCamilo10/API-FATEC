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
import { ProductService } from './product.service';
import { createProductDto } from './dtos/create_product.dto';
import { updateProductDto } from './dtos/update_product.dto';
import { addProductImageDto } from './dtos/add_image.dto';
import { searchProductDto } from './dtos/search_product.dto';
@Controller('api/v1')
// @UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('product')
  async findAll() {
    return await this.productService.findAllProduct();
  }

  @Get('product/search')
  async findWithSearch(@Body() body: searchProductDto) {
    return await this.productService.findWithSearch(body);
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
  async update(@Body() body: updateProductDto, @Param('id') id: string) {
    const product = await this.productService.updateProduct(body, Number(id));
    return product;
  }

  @HttpCode(201)
  @Post('product/image/:idProduct')
  async createImage(
    @Body() body: addProductImageDto,
    @Param('idProduct') id: number,
  ) {
    const product = await this.productService.addImageProduct(body, id);
    return product;
  }

  @HttpCode(204)
  @Delete('product/image/:idImage')
  async deleteImage(@Param('idImage') id: number) {
    await this.productService.deleteImageProduct(id);
  }
}
