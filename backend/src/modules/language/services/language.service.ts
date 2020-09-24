import { Injectable } from '@nestjs/common';
import {
  availableLanguages,
  availableTranslations,
} from '../available-languages';

@Injectable()
export class LanguageService {
  private _avaliableLanguages: string[] = availableLanguages;
  private _availableTranslations: string[][] = availableTranslations;

  get avaliableLanguages() {
    return [...this._avaliableLanguages];
  }

  get availableTranslations() {
    return [...this._availableTranslations];
  }

  isLangAvaliable(lang: string): boolean {
    return availableLanguages.findIndex(l => l === lang) !== -1;
  }
}
