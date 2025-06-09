import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from '../utils/env';
import * as pg from 'pg';

pg.types.setTypeParser(pg.types.builtins.INT8, (value) => parseInt(value, 10));

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ENV.DB_HOST,
      port: Number(ENV.DB_PORT),
      username: ENV.DB_USER,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
