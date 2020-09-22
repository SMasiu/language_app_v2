import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class DatabaseService {
  pool: PoolClient;

  constructor() {
    this.setUpDatabase();
  }

  async setUpDatabase() {
    await this.createPool();
    await this.addWordsTable('en');
    await this.addWordsTable('pl');
    await this.addTranslateTable('en', 'pl');
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

  async addWordsTable(lang: string) {
    return this.pool.query(`
      CREATE TABLE IF NOT EXISTS words_${lang} (
        id SERIAL PRIMARY KEY,
        word VARCHAR(25) NOT NULL
      )
    `);
  }

  async addTranslateTable(lang1: string, lang2: string) {
    return this.pool.query(`
      CREATE TABLE IF NOT EXISTS translations_${lang1}_${lang2} (
        id SERIAL PRIMARY KEY,
        word_1_id INT NOT NULL,
        word_2_id INT NOT NULL,
        FOREIGN KEY (word_1_id) REFERENCES words_${lang1}(id) ON DELETE CASCADE,
        FOREIGN KEY (word_2_id) REFERENCES words_${lang2}(id) ON DELETE CASCADE
      )
    `);
  }
}
