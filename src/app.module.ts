import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [ProductModule, ConfigModule.forRoot(), CategoryModule, AuthModule, TestModule],
  controllers: [AppController, ProductController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
