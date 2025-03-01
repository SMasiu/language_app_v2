import { Injectable } from '@nestjs/common'
import { GroupInput } from '../graphql/group.args'
import { DatabaseService } from 'src/modules/database/services/database.service'
import { GroupModel } from '../types/group.types'
import { Group } from '../graphql/group.type'

@Injectable()
export class GroupsService {
  constructor(private database: DatabaseService) {}

  async createGroup({ name }: GroupInput): Promise<GroupModel> {
    return (
      await this.database.query<GroupModel>(
        `
        INSERT INTO groups (name) VALUES ($1) RETURNING *
    `,
        [name]
      )
    )[0]
  }

  async getGroupsByWordId(lang: string, id: number): Promise<GroupModel[]> {
    return await this.database.query<GroupModel>(
      `
        SELECT group_id as id, name FROM word_groups_${lang} wg
        JOIN groups g ON g.id = wg.group_id
        WHERE wg.word_id = $1
    `,
      [id]
    )
  }

  async getGroupById(id: number): Promise<GroupModel | null> {
    return (
      (
        await this.database.query<GroupModel>(
          `
      SELECT * FROM groups WHERE id = $1
      `,
          [id]
        )
      )[0] || null
    )
  }

  async getAllGroups(): Promise<GroupModel[]> {
    return this.database.query<GroupModel>(`
      SELECT * FROM groups
    `)
  }

  async addGroupsToWord(lang: string, wordId: number, groupsIds: number[]) {
    if (groupsIds && groupsIds.length) {
      const query = `INSERT INTO word_groups_${lang} (word_id, group_id) VALUES ${groupsIds
        .map((_, i) => `($1, $${i + 2})`)
        .toString()}`
      const args = [wordId, ...groupsIds]
      return this.database.query(query, args)
    }
    return []
  }

  async removeAllGroupsFromWord(lang: string, wordId: number) {
    return await this.database.query<Group>(
      `
      DELETE 
      FROM word_groups_${lang}
      WHERE word_id = $1
      RETURNING *
    `,
      [wordId]
    )
  }
}
