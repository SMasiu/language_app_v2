import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AddGroupComponent } from './components/add-group/add-group.component'
import { AddWordComponent } from './components/add-word/add-word.component'
import { AddTranslationComponent } from './components/add-translation/add-translation.component'
import { AddTestComponent } from './components/add-test/add-test.component'
import { TestsListComponent } from './components/tests-list/tests-list.component'
import { SolveTestComponent } from './components/solve-test/solve-test.component'
import { WordsListComponent } from './components/words-list/words-list.component'
import { WordItemComponent } from './components/word-item/word-item.component'

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
    path: 'words',
    component: WordsListComponent
  },
  {
    path: 'words/:lang/:id',
    component: WordItemComponent
  },
  {
    path: 'words/add',
    component: AddWordComponent
  },
  {
    path: 'translations/add',
    component: AddTranslationComponent
  },
  {
    path: 'tests',
    component: TestsListComponent
  },
  {
    path: 'tests/add',
    component: AddTestComponent
  },
  {
    path: 'test/solve/:id',
    component: SolveTestComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
