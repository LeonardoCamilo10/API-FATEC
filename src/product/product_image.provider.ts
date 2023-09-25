import { DataSource } from 'typeorm';
import { Product_Img } from './product_image.entity';

export const productImageProviders = [
  {
    provide: 'PRODUCT_IMAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Product_Img),
    inject: ['DATA_SOURCE'],
  },
];
