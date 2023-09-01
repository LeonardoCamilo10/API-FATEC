import { DataSource } from 'typeorm';
import { category } from './category.entity';

export const categoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(category),
    inject: ['DATA_SOURCE'],
  },
];
