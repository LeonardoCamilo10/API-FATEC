import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from 'src/product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtModule, ProductModule, ConfigModule.forRoot()],
  controllers: [TestController],
})
export class TestModule {}
