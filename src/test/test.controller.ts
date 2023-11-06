import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('api/v1/')
export class TestController {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    private jwtService: JwtService,
  ) {}

  @Get('test/server')
  async server() {
    return { message: 'Servidor no ar' };
  }

  @Get('test/db')
  async database() {
    try {
      const product = await this.productRepository.find();

      if (product && product.length > 0) {
        return { message: 'Banco de dados rodando' };
      } else {
        return { message: 'Banco de dados rodando sem produtos' };
      }
    } catch (error) {
      return { message: 'Erro ao se conectar ao banco de dados' };
    }
  }

  @Get('test/auth/:token')
  async auth(@Param('token') token: string) {
    const secretToken = { secret: process.env.JWT_SECRET_KEY };

    try {
      const validateToken = await this.jwtService.verifyAsync(
        token,
        secretToken,
      );

      if (validateToken) return { message: 'Token válido' };
    } catch (error) {
      if (error['name'] == 'TokenExpiredError') {
        return { validateToken: false, message: 'Token expirado' };
      } else {
        return { validateToken: false, message: 'Token inválido' };
      }
    }
  }
}
