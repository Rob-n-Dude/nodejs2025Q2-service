import { DataSource } from 'typeorm';
import { ENV } from '../utils/env';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT) || 5432,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
});

export default AppDataSource;
