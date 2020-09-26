import { Injectable } from '@nestjs/common';
import { PoolClient, Pool } from 'pg';
import { LanguageService } from 'src/modules/language/services/language.service';

@Injectable()
export class DatabaseProviderService {
  pool: PoolClient;

  constructor(private languageService: LanguageService) {
    this.setUpDatabase();
  }

  async setUpDatabase() {
    await this.connectToDatabase();

    await this.addGroupsTable();

    this.languageService.avaliableLanguages.forEach(async lang => {
      await this.addWordsTable(lang);
      await this.addWordGroupsTable(lang);
    });

    this.languageService.availableTranslations.forEach(
      async ([lang1, lang2]) => {
        await this.addTranslateTable(lang1, lang2);
      },
    );
  }

  async connectToDatabase(): Promise<boolean> {
    return new Promise(resolve => {
      const timer = setInterval(async () => {
        try {
          await this.createPool();
          clearInterval(timer);
          return resolve(true);
        } catch {
          console.log('Database refused connection. Retrying...');
        }
      }, 5000);
    });
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

  async addGroupsTable() {
    return this.pool.query(`
      CREATE TABLE IF NOT EXISTS groups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(25) NOT NULL UNIQUE
      )
  `);
  }

  async addWordsTable(lang: string) {
    return this.pool.query(`
        CREATE TABLE IF NOT EXISTS words_${lang} (
          id SERIAL PRIMARY KEY,
          word VARCHAR(25) NOT NULL UNIQUE
        )
      `);
  }

  addWordGroupsTable(lang: string) {
    return this.pool.query(`
        CREATE TABLE IF NOT EXISTS word_groups_${lang} (
          word_id INT NOT NULL,
          group_id INT NOT NULL,
          FOREIGN KEY (word_id) REFERENCES words_${lang}(id) ON DELETE CASCADE,
          FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
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
