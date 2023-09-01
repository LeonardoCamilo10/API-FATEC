import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}

  async findAllProduct(): Promise<Product[]> {
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

  async findCategory(id: number) {
    const findCategory = await this.productRepository.findOne({
      where: {
        id_categoria: {
          id: id,
        },
      },
    });

    if (findCategory === null) {
      throw new NotFoundException('Product Not exists!');
    }

    return findCategory;
  }

  async deleteProduct(id: number) {
    const findIdProduct = await this.productRepository.findOne({
      where: { id: id },
    });

    if (findIdProduct === null) {
      throw new NotFoundException('Product Not exists!');
    }

    await this.productRepository.remove(findIdProduct);
  }

  async createProduct(body: object) {
    await this.findNameProduct(body['nome']);
    await this.categoryService.findIdCategory(Number(body['id_categoria']));
    const product = this.productRepository.create(body);
    return await this.productRepository.save(product);
  }

  async updateProduct(body: object, id: number) {
    const findProduct = await this.findIdProduct(id);
    await this.findNameProduct(body['nome'], id);
    await this.categoryService.findIdCategory(Number(body['id_categoria']));

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
