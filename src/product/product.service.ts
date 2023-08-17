import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product2 } from './product.entity';
import { find } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product2>,
  ) {}

  async findAllProduct(): Promise<Product2[]> {
    return await this.productRepository.find();
  }

  async findIdProduct(id: number) {
    const findIdProduct = await this.productRepository.findOne({
      where: { id: id },
    });

    if (findIdProduct === null) {
      throw new NotFoundException('Product Not exists!');
    }

    return findIdProduct;
  }

  async createProduct(body: object) {
    await this.findNameProduct(body['nome']);
    const product = this.productRepository.create(body);
    return await this.productRepository.save(product);
  }

  async updateProduct(body: object, id: number) {
    const findProduct = await this.findIdProduct(id);
    await this.findNameProduct(body['nome'], id);
    const updateProduct = Object.assign(findProduct, body);

    await this.productRepository.update({ id }, updateProduct);

    return this.findIdProduct(id);
  }

  async findNameProduct(name: string, id = 0) {
    const findNameProduct = await this.productRepository.find({
      where: { nome: name },
    });

    if (findNameProduct.length > 0 && findNameProduct[0].id != id) {
      throw new NotFoundException('Product exists!');
    }
  }
}
