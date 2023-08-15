import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product2 } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product2>,
  ) {}

  async findAll(): Promise<Product2[]> {
    return this.productRepository.find();
  }
}
