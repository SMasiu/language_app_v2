import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  getTranslationPair(from: string, to: string) {
    const translation = this.availableTranslations.find(
      a => (a[0] === from && a[1] === to) || (a[0] === to && a[1] === from),
    );

    if (!translation) {
      throw new InternalServerErrorException();
    }

    return translation;
  }
}
