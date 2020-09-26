import { Injectable } from '@angular/core'
import { Group } from '../types/group.types'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groups: Group[]

  constructor(private apiService: ApiService) {}

  async getGroups() {
    this.groups = await this.apiService.getAllGrops()
    return [...this.groups]
  }
}
