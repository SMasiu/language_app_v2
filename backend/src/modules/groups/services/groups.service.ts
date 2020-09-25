import { Injectable } from '@nestjs/common';
import { GroupInput } from '../graphql/group.args';
import { DatabaseService } from 'src/modules/database/services/database.service';
import { GroupModel } from '../types/group.types';

@Injectable()
export class GroupsService {
  constructor(private database: DatabaseService) {}

  async createGroup({ name }: GroupInput): Promise<GroupModel> {
    return (
      await this.database.query<GroupModel>(
        `
        INSERT INTO groups (name) VALUES ($1) RETURNING *
    `,
        [name],
      )
    )[0];
  }

  async getGroupsByWordId(lang: string, id: number): Promise<GroupModel[]> {
    return await this.database.query<GroupModel>(
      `
        SELECT group_id as id, name FROM word_groups_${lang} wg
        JOIN groups g ON g.id = wg.group_id
        WHERE wg.word_id = $1
    `,
      [id],
    );
  }

  async addGroupsToWord(lang: string, wordId: number, groupsIds: number[]) {
    const query = `INSERT INTO word_groups_${lang} (word_id, group_id) VALUES ${groupsIds
      .map((_, i) => `($1, $${i + 2})`)
      .toString()}`;
    const args = [wordId, ...groupsIds];
    return this.database.query(query, args);
  }
}
