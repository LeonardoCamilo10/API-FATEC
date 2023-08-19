import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryProviders } from './category.provider';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryController } from './category.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...categoryProviders, CategoryService],
  exports: [...categoryProviders, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
