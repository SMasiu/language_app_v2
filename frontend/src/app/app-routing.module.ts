import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AddGroupComponent } from './components/add-group/add-group.component'

const routes: Routes = [
  {
    path: '/',
    pathMatch: 'full',
    redirectTo: 'groups/add'
  },
  {
    path: 'groups/add',
    component: AddGroupComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
