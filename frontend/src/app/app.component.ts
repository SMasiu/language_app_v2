import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Location } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend'

  pageTitle = 'groups / add'

  navigation = [
    { name: 'Add word', link: '/words/add' },
    { name: 'Add translation', link: '/translations/add' },
    { name: 'Add group', link: '/groups/add' },
    { name: 'Add test', link: '/tests/add' }
  ]

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url === '/' ? 'groups / add' : val.url
        this.pageTitle = url
          .split('/')
          .filter((v) => v)
          .toString()
          .replace(/\,/, ' / ')
      }
    })
  }

  handleBackClick() {
    this.location.back()
  }
}
