import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { productProviders } from './product.provider';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from 'src/category/category.module';
import { productImageProviders } from './product_image.provider';
import { FtpModule } from 'nestjs-ftp';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    FtpModule.forRootFtpAsync({
      useFactory: async () => {
        return {
          host: '144.22.137.69',
          password: 'ftpdeV*1',
          port: 21,
          user: 'ftpuser',
          secure: false,
        };
      },
    }),
  ],
  providers: [
    ...productProviders,
    ...productImageProviders,
    ProductService,
    ConfigService,
  ],
  exports: [...productProviders, ...productImageProviders, ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
