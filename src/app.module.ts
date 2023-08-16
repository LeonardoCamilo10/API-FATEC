import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProductModule, ConfigModule.forRoot()],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}
