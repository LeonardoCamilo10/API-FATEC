import { DataSource } from 'typeorm';
import { Category2 } from './category.entity';

export const categoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category2),
    inject: ['DATA_SOURCE'],
  },
];
