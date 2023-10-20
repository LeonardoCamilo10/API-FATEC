import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CategoryService } from 'src/category/category.service';
import { Product_Img } from './product_image.entity';
import { FtpService } from 'nestjs-ftp';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('PRODUCT_IMAGE_REPOSITORY')
    private productImageRepository: Repository<Product_Img>,
    private categoryService: CategoryService,
    private readonly _ftpService: FtpService,
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
        category_: {
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
    await this.findDescProduct(body['name']);
    await this.categoryService.findIdCategory(Number(body['category_id']));

    if (body['images'] != '' && body['images'].length > 5) {
      throw new BadRequestException('exceeded limit of 5 images');
    }

    body['category_'] = body['category_id'];
    const product = this.productRepository.create(body);

    await this.productRepository.save(product);

    if (body['images'] != '') {
      await this.createProductImage(body['images'], product);
    }

    return await this.findIdProduct(product['id']);
  }

  async createProductImage(images: string[], product: object) {
    for await (const iterator of images) {
      const destination = `ftp/images/produto/${iterator['name']}`;

      await this._ftpService.upload(iterator['image'], destination);

      const produtctImageObj = {
        product_: product['id'],
        name: iterator['name'],
        type: iterator['type'],
        image_path:
          'http://144.22.137.69/ftp/images/produtos/' + iterator['name'],
      };

      const productImage = this.productImageRepository.create(produtctImageObj);
      this.productImageRepository.save(productImage);
    }

    return true;
  }

  async updateProduct(body: object, id: number) {
    const findProduct = await this.findIdProduct(id);
    await this.findDescProduct(body['name'], id);
    await this.categoryService.findIdCategory(Number(body['category_id']));

    if (body['images'] != '' && body['images'].length > 5) {
      throw new BadRequestException('exceeded limit of 5 images');
    }
    body['category_'] = body['category_id'];
    body['category_id'] = undefined;

    const updateProduct = Object.assign(findProduct, body);

    updateProduct['images'] = undefined;
    await this.productRepository.update({ id }, updateProduct);

    await this.updateProductImage(body['images'], updateProduct);

    return updateProduct;
  }

  async updateProductImage(images: string[], product: object) {
    const productId = product['id'];

    const productWithImages = await this.productImageRepository.find({
      where: { product_: { id: productId } },
    });

    await this.productImageRepository.remove(productWithImages);

    for await (const iterator of images) {
      const produtctImageObj = {
        product_: product['id'],
        name: iterator['name'],
        type: iterator['type'],
        image_path:
          'http://144.22.137.69/ftp/images/produtos/' + iterator['name'],
      };

      const productImage = this.productImageRepository.create(produtctImageObj);
      this.productImageRepository.save(productImage);
    }
  }

  async findDescProduct(name: string, id = 0) {
    const findNameProduct = await this.productRepository.find({
      where: { name },
    });

    if (findNameProduct.length > 0 && findNameProduct[0].id != id) {
      throw new BadRequestException('Product exists!');
    }
  }
}
