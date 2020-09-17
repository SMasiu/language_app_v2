import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class DatabaseService {
  pool: PoolClient;

  constructor() {
    this.createPool();
  }

  async createPool() {
    console.log('Conecting to database...');
    const {
      APP_DB_USERNAME,
      APP_DB_PASSWORD,
      APP_DB_HOST,
      APP_DB_PORT,
      APP_DB_NAME,
    } = process.env;
    this.pool = await new Pool({
      user: APP_DB_USERNAME,
      password: APP_DB_PASSWORD,
      host: APP_DB_HOST,
      port: parseInt(APP_DB_PORT),
      database: APP_DB_NAME,
    }).connect();
    console.log('Successfully conected to database...');
  }
}
