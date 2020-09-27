import { Component, OnInit } from '@angular/core'
import { Test } from 'src/app/types/test.types'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss']
})
export class TestsListComponent implements OnInit {
  tests: Test[] = []

  displayedColumns: string[] = ['id', 'langFrom', 'langTo', 'count', 'action']

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTests().then((t) => (this.tests = [...t]))
  }
}
