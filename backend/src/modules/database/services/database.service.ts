import { Injectable } from '@nestjs/common';
import { DatabaseProviderService } from './database-provider.service';

@Injectable()
export class DatabaseService {
  constructor(private databaseProvider: DatabaseProviderService) {}

  async query<T>(sql: string, args: any[]): Promise<T[]> {
    return (await this.databaseProvider.pool.query(sql, args)).rows;
  }
}
