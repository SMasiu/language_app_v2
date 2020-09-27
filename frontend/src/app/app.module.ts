import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AddWordComponent } from './components/add-word/add-word.component'
import { AddTranslationComponent } from './components/add-translation/add-translation.component'
import { AddGroupComponent } from './components/add-group/add-group.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { HttpClientModule } from '@angular/common/http'
import { MatSelectModule } from '@angular/material/select'
import { GraphQLModule } from './graphql.module'
import { MatChipsModule } from '@angular/material/chips'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { AddTestComponent } from './components/add-test/add-test.component'
import { TestsListComponent } from './components/tests-list/tests-list.component'
import { MatTableModule } from '@angular/material/table'

@NgModule({
  declarations: [
    AppComponent,
    AddWordComponent,
    AddTranslationComponent,
    AddGroupComponent,
    AddTestComponent,
    TestsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
