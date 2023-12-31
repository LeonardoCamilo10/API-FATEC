import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CategoryService } from 'src/category/category.service';
import { Product_Img } from './product_image.entity';
import { FtpService } from 'nestjs-ftp';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { createProductImageDto } from './dtos/create_product_Image.dto';

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
    return await this.productRepository.find({
      relations: ['images'],
    });
  }

  async findWithSearch(body: object) {
    const findWithSearch = await this.productRepository.find({
      where: { name: Like(`%${body['search']}%`) },
    });

    if (findWithSearch.length === 0) {
      throw new NotFoundException(
        `Sorry, we couldn't find products with for "${body['search']}"`,
      );
    }

    return findWithSearch;
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
    await this.findNameProduct(body['name']);
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
    const destination = `/images/produtos/`;

    for await (const iterator of images) {
      const match = iterator['image'].match(/^data:image\/([a-zA-Z]+);base64,/);
      const imageType = match[1];

      const filename = uuidv4() + '.' + imageType;

      const base64Data = iterator['image'].replace(
        /^data:image\/\w+;base64,/,
        '',
      );

      const buffer = Buffer.from(base64Data, 'base64');

      try {
        fs.writeFileSync(filename, buffer, 'base64');
        await this._ftpService.upload(filename, destination + filename);
        fs.unlinkSync(filename);
      } catch (error) {
        console.log('Erro ao processar imagem:', error);
      }

      const produtctImageObj: createProductImageDto = {
        product_: product['id'],
        name: filename,
        type: imageType,
        image_path: 'https://144.22.137.69/ftp' + destination + filename,
      };

      const productImage = this.productImageRepository.create(produtctImageObj);
      this.productImageRepository.save(productImage);
    }

    return true;
  }

  async updateProduct(body: object, id: number) {
    const findProduct = await this.findIdProduct(id);
    await this.findNameProduct(body['name'], id);
    await this.categoryService.findIdCategory(Number(body['category_id']));

    body['category_'] = body['category_id'];

    body['category_id'] = undefined;
    findProduct['images'] = undefined;

    const updateProduct = Object.assign(findProduct, body);

    await this.productRepository.update({ id }, updateProduct);

    return updateProduct;
  }

  // async updateProductImage(images: string[], product: object) {
  //   const productId = product['id'];
  //   const destination = `/images/produtos/`;
  //   const productWithImages = await this.productImageRepository.find({
  //     where: { product_: { id: productId } },
  //   });

  //   for (const iterator of productWithImages) {
  //     await this._ftpService.delete(destination + iterator['name']);
  //   }

  //   await this.productImageRepository.remove(productWithImages);
  //   await this.createProductImage(images, product);
  // }

  async addImageProduct(body: object, id: number) {
    const product = await this.findIdProduct(id);

    const destination = `/images/produtos/`;

    const match = body['image'].match(/^data:image\/([a-zA-Z]+);base64,/);
    const imageType = match[1];

    const filename = uuidv4() + '.' + imageType;

    const base64Data = body['image'].replace(/^data:image\/\w+;base64,/, '');

    const buffer = Buffer.from(base64Data, 'base64');

    try {
      fs.writeFileSync(filename, buffer, 'base64');
      await this._ftpService.upload(filename, destination + filename);
      fs.unlinkSync(filename);
    } catch (error) {
      console.log('Erro ao processar imagem:', error);
    }

    const produtctImageObj: createProductImageDto = {
      product_: product,
      name: filename,
      type: imageType,
      image_path: 'https://144.22.137.69/ftp' + destination + filename,
    };

    const productImage = this.productImageRepository.create(produtctImageObj);
    this.productImageRepository.save(productImage);

    return {
      name: productImage['name'],
      type: productImage['type'],
      image_path: productImage['image_path'],
    };
  }

  async deleteImageProduct(id: number) {
    const productImage = await this.productImageRepository.findOne({
      where: { id },
    });

    const destination = `/images/produtos/`;

    if (productImage) {
      await this._ftpService.delete(destination + productImage['name']);
      await this.productImageRepository.remove(productImage);
    } else {
      throw new NotFoundException('Image not exist');
    }
  }

  async findNameProduct(name: string, id = 0) {
    const findNameProduct = await this.productRepository.find({
      where: { name },
    });

    if (findNameProduct.length > 0 && findNameProduct[0].id != id) {
      throw new BadRequestException('Product exists!');
    }
  }
}
