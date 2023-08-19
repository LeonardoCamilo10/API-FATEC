import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category2 } from './category.entity';
import { createCategoryDto } from './dtos/category.dto';

@Controller('api/v1')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('category')
  async findAll(): Promise<Category2[]> {
    return await this.categoryService.findAllCategory();
  }

  @Get('category/:id')
  async findID(@Param('id') id: number) {
    return await this.categoryService.findIdCategory(id);
  }

  @HttpCode(201)
  @Post('category')
  async create(@Body() body: createCategoryDto) {
    const category = await this.categoryService.createCategory(body);
    return category;
  }

  @HttpCode(204)
  @Delete('category/:id')
  async delete(@Param('id') id: number) {
    await this.categoryService.deleteCategory(id);
  }

  @HttpCode(201)
  @Put('category/:id')
  async update(@Body() body: createCategoryDto, @Param('id') id: string) {
    const category = await this.categoryService.updateCategory(
      body,
      Number(id),
    );
    return category;
  }
}
