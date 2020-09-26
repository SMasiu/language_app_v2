import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AddWordComponent } from './components/add-word/add-word.component'
import { AddTranslationComponent } from './components/add-translation/add-translation.component'
import { AddGroupComponent } from './components/add-group/add-group.component'

@NgModule({
  declarations: [AppComponent, AddWordComponent, AddTranslationComponent, AddGroupComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
