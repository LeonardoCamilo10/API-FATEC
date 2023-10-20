import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { productProviders } from './product.provider';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from 'src/category/category.module';
import { productImageProviders } from './product_image.provider';
import { MulterModule } from '@nestjs/platform-express';
import { FtpModule } from 'nestjs-ftp';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    CategoryModule,
    FtpModule.forRootFtpAsync({
      useFactory: async () => {
        return {
          host: '144.22.137.69',
          password: 'ftpuser',
          port: 21,
          user: 'ftpdeV*1',
          secure: true,
        };
      },
    }),
  ],
  providers: [...productProviders, ...productImageProviders, ProductService],
  exports: [...productProviders, ...productImageProviders, ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
