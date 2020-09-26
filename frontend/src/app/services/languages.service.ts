import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private _availableLanguages = ['en', 'pl']
  get availableLanguages() {
    return [...this._availableLanguages]
  }

  private _availableTranslations = [['en', 'pl']]
  get availableTranslations() {
    return [...this._availableTranslations]
  }

  constructor() {}
}
