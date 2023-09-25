import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { productProviders } from './product.provider';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from 'src/category/category.module';
import { productImageProviders } from './product_image.provider';

@Module({
  imports: [DatabaseModule, CategoryModule],
  providers: [...productProviders, ...productImageProviders, ProductService],
  exports: [...productProviders, ...productImageProviders, ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
