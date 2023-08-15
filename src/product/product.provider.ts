import { DataSource } from 'typeorm';
import { Product2 } from './product.entity';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product2),
    inject: ['DATA_SOURCE'],
  },
];
