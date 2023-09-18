import { DataSource } from 'typeorm';
import { Product_Image } from './product_image.entity';

export const productImageProviders = [
  {
    provide: 'PRODUCT_IMAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Product_Image),
    inject: ['DATA_SOURCE'],
  },
];
