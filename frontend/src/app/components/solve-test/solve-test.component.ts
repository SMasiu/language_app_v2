import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Test } from 'src/app/types/test.types'
import { take } from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.scss']
})
export class SolveTestComponent implements OnInit {
  test: Test

  progressCurrent = 14
  progressMax = 34

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe(async (params) => {
      const id = parseInt(params.get('id'))
      this.test = await this.apiService.getTestById(id)
      console.log(this.test)
    })
  }
}
