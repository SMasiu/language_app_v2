export interface TranslationModel {
  id: number;
  word_1_id: number;
  word_2_id: number;
}

export interface TranslationWordResponse {
  word: number;
  lang: string;
}

export interface TranslationResponse {
  id: number;
  word1: TranslationWordResponse;
  word2: TranslationWordResponse;
}
