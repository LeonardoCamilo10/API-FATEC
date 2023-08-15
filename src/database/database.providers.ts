import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'fateclabdesweb.mysql.dbaas.com.br',
        port: 3306,
        username: 'fateclabdesweb',
        password: 'LabDesWeb1234@',
        database: 'fateclabdesweb',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
