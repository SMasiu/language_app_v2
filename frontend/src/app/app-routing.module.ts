import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AddGroupComponent } from './components/add-group/add-group.component'
import { AddWordComponent } from './components/add-word/add-word.component'
import { AddTranslationComponent } from './components/add-translation/add-translation.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'groups/add'
  },
  {
    path: 'groups/add',
    component: AddGroupComponent
  },
  {
    path: 'words/add',
    component: AddWordComponent
  },
  {
    path: 'translations/add',
    component: AddTranslationComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
