import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CategoryService } from 'src/category/category.service';
import { Product_Img } from './product_image.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('PRODUCT_IMAGE_REPOSITORY')
    private productImageRepository: Repository<Product_Img>,
    private categoryService: CategoryService,
  ) {}

  async findAllProduct(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['images'] });
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
    const findCategory = await this.productRepository.find({
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
    await this.findDescProduct(body['desc']);
    await this.categoryService.findIdCategory(Number(body['id_categoria']));

    const product = this.productRepository.create(body);

    await this.productRepository.save(product);

    if (body['images'] != '') {
      await this.createProductImage(body['images'], product);
    }

    return await this.findIdProduct(product['id']);
  }

  async createProductImage(images: string[], product: object) {
    for await (const iterator of images) {
      const produtctImageObj = {
        product: product['id'],
        image_path: iterator['image'],
      };

      const productImage = this.productImageRepository.create(produtctImageObj);
      this.productImageRepository.save(productImage);
    }

    return true;
  }

  async updateProduct(body: object, id: number) {
    const findProduct = await this.findIdProduct(id);
    await this.findDescProduct(body['desc'], id);
    await this.categoryService.findIdCategory(Number(body['id_categoria']));

    const updateProduct = Object.assign(findProduct, body);
    updateProduct['images'] = undefined;
    await this.productRepository.update({ id }, updateProduct);

    await this.updateProductImage(body['images'], updateProduct);

    return updateProduct;
  }

  async updateProductImage(images: string[], product: object) {
    const productId = product['id'];

    const productWithImages = await this.productImageRepository.find({
      where: { product: { id: productId } },
    });

    await this.productImageRepository.remove(productWithImages);

    for await (const iterator of images) {
      const produtctImageObj = {
        product: productId,
        image_path: iterator['image'],
      };
      const productImage = this.productImageRepository.create(produtctImageObj);
      this.productImageRepository.save(productImage);
    }
  }

  async findDescProduct(desc: string, id = 0) {
    const findNameProduct = await this.productRepository.find({
      where: { desc },
    });

    if (findNameProduct.length > 0 && findNameProduct[0].id != id) {
      throw new NotFoundException('Product exists!');
    }
  }
}
